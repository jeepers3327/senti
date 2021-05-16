defmodule SentiWeb.PresentationView do
  use SentiWeb, :view
  alias SentiWeb.PresentationView

  def render("index.json", %{presentations: presentations}) do
    %{data: render_many(presentations, PresentationView, "presentation.json")}
  end

  def render("show.json", %{presentation: presentation}) do
    %{data: render_one(presentation, PresentationView, "presentation.json")}
  end

  def render("presentation.json", %{presentation: presentation}) do
    %{
      id: presentation.id,
      name: presentation.name,
      created_at: presentation.inserted_at,
      updated_at: presentation.updated_at
    }
  end

  def render("session.json", %{session: session}) do
    %{
      id: session.id,
      access_code: session.access_code,
      presentation_id: session.presentation_id,
      status: session.status
    }
  end
end
