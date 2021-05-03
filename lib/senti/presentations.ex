defmodule Senti.Presentations do
  @moduledoc """
  The Presentations context.
  """

  import Ecto.Query, warn: false
  alias Senti.Repo
  alias Ecto.Multi

  alias Senti.Presentations.{Presentation, Question}

  def list_presentations(user_id) do
    Presentation
    |> where(user_id: ^user_id)
    |> Repo.all()
  end

  def get_presentation!(id), do: Repo.get!(Presentation, id)

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
end
