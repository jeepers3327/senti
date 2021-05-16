defmodule SentiWeb.RegistrationView do
  use SentiWeb, :view

  def render("user.json", %{user: user}) do
    %{id: user.id, name: user.name}
  end
end
