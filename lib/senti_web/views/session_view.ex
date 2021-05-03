defmodule SentiWeb.SessionView do
  use SentiWeb, :view

  def render("auth.json", %{user: user}) do
    %{id: user.id, name: user.name, email: user.email}
  end
end
