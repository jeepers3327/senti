defmodule SentiWeb.RegistrationController do
  use SentiWeb, :controller

  alias Senti.Accounts
  alias Senti.Accounts.User

  action_fallback SentiWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> render("user.json", user: user)
    end
  end
end
