defmodule SentiWeb.PresentationController do
  use SentiWeb, :controller

  alias Senti.Presentations
  alias Senti.Presentations.Presentation
  alias Senti.SessionState

  action_fallback SentiWeb.FallbackController

  def index(conn, _params) do
    presentations = Presentations.list_presentations(conn.assigns.current_user.id)
    render(conn, "index.json", presentations: presentations)
  end

  def create(conn, %{"presentation" => presentation_params}) do
    with {:ok, %{presentation: presentation}} <-
           Presentations.create_presentation(presentation_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.presentation_path(conn, :show, presentation))
      |> render("show.json", presentation: presentation)
    end
  end

  def show(conn, %{"session_id" => session_id}) do
    presentation = Presentations.get_presentation_session(session_id)

    %{index: index, has_next: has_next} = SessionState.get_current_index(session_id, presentation)

    conn
    |> json(%{current_index: index, has_next: has_next, presentation: presentation})
  end

  def update(conn, %{"id" => id, "presentation" => presentation_params}) do
    presentation = Presentations.get_presentation(id)

    with {:ok, %Presentation{} = presentation} <-
           Presentations.update_presentation(presentation, presentation_params) do
      render(conn, "show.json", presentation: presentation)
    end
  end

  def delete(conn, %{"id" => id}) do
    presentation = Presentations.get_presentation(id)

    with {:ok, %Presentation{}} <- Presentations.delete_presentation(presentation) do
      send_resp(conn, :no_content, "")
    end
  end

  def join(conn, %{"code" => code}) do
    with {:ok, session} <- Presentations.get_session_by_code(code) do
      render(conn, "session.json", session: session)
    end
  end
end
