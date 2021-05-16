defmodule SentiWeb.PresentationSessionController do
  use SentiWeb, :controller

  alias Senti.Presentations
  alias Senti.Presentations.Session

  action_fallback SentiWeb.FallbackController

  def create(conn, params) do
    with {:ok, %Session{} = session} <- Presentations.create_session(params) do
      IO.inspect(session)

      conn
      |> put_status(:created)
      |> render("session.json", session: session)
    else
      {:error, :not_found} ->
        {:error, :not_found}

      session ->
        conn
        |> put_status(200)
        |> render("session.json", session: session)
    end
  end
end
