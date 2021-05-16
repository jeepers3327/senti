defmodule SentiWeb.PresentationSessionView do
  use SentiWeb, :view

  def render("session.json", %{session: session}) do
    %{
      id: session.id,
      presentation_id: session.presentation_id,
      access_code: session.access_code,
      status: session.status
    }
  end
end
