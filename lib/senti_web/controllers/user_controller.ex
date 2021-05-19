defmodule SentiWeb.UserController do
  use SentiWeb, :controller

  alias Senti.Accounts
  alias Senti.Accounts.User
  alias Senti.Token

  action_fallback SentiWeb.FallbackController

  def update(conn, %{"user" => user_params}) do
    with user <- Accounts.get_user(conn.assigns.current_user.id),
         {:ok, %User{} = user} <- Accounts.update_user(user, user_params),
         token <- Token.generate_token(user) do
      conn
      |> clear_session()
      |> put_session(:token, token)
      |> render("show.json", user: user)
    else
      :error -> {:error, :not_found}
    end
  end
end
