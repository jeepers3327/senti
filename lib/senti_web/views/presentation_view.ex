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
    %{id: presentation.id,
      name: presentation.name,
      allow_multiple_answers: presentation.allow_multiple_answers}
  end
end
