defmodule Senti.Presentations do
  @moduledoc """
  The Presentations context.
  """

  import Ecto.Query, warn: false
  alias Senti.Repo
  alias Ecto.Multi

  alias Senti.Presentations.{Presentation, Question, Session, Response}

  def list_presentations(user_id) do
    Presentation
    |> where(user_id: ^user_id)
    |> Repo.all()
  end

  def get_presentation(id), do: Repo.get(Presentation, id)

  def create_presentation(attrs \\ %{}) do
    Multi.new()
    |> Multi.insert(:presentation, Presentation.changeset(%Presentation{}, attrs))
    |> Multi.insert_all(:questions, Question, fn %{presentation: presentation} ->
      append_questions_to_presentation(presentation.id, attrs)
    end)
    |> Repo.transaction()
  end

  def update_presentation(%Presentation{} = presentation, attrs) do
    presentation
    |> Presentation.changeset(attrs)
    |> Repo.update()
  end

  def delete_presentation(%Presentation{} = presentation) do
    Repo.delete(presentation)
  end

  def change_presentation(%Presentation{} = presentation, attrs \\ %{}) do
    Presentation.changeset(presentation, attrs)
  end

  def create_session(attrs \\ %{}) do
    case get_presentation(attrs["presentation_id"]) do
      nil ->
        {:error, :not_found}

      presentation ->
        case get_session(presentation.id) do
          nil ->
            %Session{}
            |> Session.changeset(attrs)
            |> Repo.insert()

          session ->
            session
        end
    end
  end

  def get_session(id) do
    Session
    |> where([s], s.presentation_id == ^id)
    |> where([s], s.status != "ended")
    |> Repo.one()
  end

  def get_presentation_session(session_id) do
    responses =
      Response
      |> where([r], r.session_id == ^session_id)

    Presentation
    |> join(:inner, [p], s in Session, on: p.id == s.presentation_id)
    |> where([p, s], s.id == ^session_id)
    |> preload([p, s], questions: [responses: ^responses])
    |> select([p, s], %{presentation: p})
    |> Repo.one()
    |> format_presentation_result()
  end

  def create_response(attrs \\ %{}) do
    %Response{}
    |> Response.changeset(attrs)
    |> Repo.insert()
  end

  def get_session_by_code(code) do
    session = Repo.get_by(Session, access_code: code)

    case session do
      nil -> {:error, :not_found}
      session -> {:ok, session}
    end
  end

  def update_session_status(session_id, status) do
    session = Repo.get(Session, session_id)

    case session.status == status do
      true ->
        {:ok, session}

      false ->
        session
        |> Session.changeset(%{status: status})
        |> Repo.update()
    end
  end

  defp append_questions_to_presentation(presentation_id, attrs) do
    questions = Map.get(attrs, "questions", [])

    extra_params = %{
      "presentation_id" => presentation_id,
      "inserted_at" => DateTime.utc_now() |> DateTime.truncate(:second),
      "updated_at" => DateTime.utc_now() |> DateTime.truncate(:second)
    }

    Enum.map(questions, fn question ->
      question
      |> Map.merge(extra_params)
      |> Map.new(fn {k, v} ->
        {String.to_atom(k), v}
      end)
    end)
  end

  defp format_presentation_result(result) when is_nil(result), do: result

  defp format_presentation_result(result) do
    questions =
      Enum.map(result.presentation.questions, fn question ->
        %{id: question.id, text: question.text, responses: format_responses(question.responses)}
      end)

    %{
      presentation_id: result.presentation.id,
      presentation_name: result.presentation.name,
      questions: questions,
      created_at: result.presentation.inserted_at,
      updated_at: result.presentation.updated_at
    }
  end

  defp format_responses(responses) do
    Enum.map(responses, fn response ->
      %{id: response.id, answer: response.answer, color: response.color}
    end)
  end
end
