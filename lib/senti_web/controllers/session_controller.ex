defmodule SentiWeb.SessionController do
  use SentiWeb, :controller

  alias Senti.Accounts
  alias Senti.Accounts.User
  alias Senti.Token

  action_fallback SentiWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Accounts.authenticate_user(email, password),
         token <- Token.generate_token(user) do
      conn
      |> put_resp_cookie("token", token, max_age: 2_592_000)
      |> render("auth.json", user: user)
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_resp_cookie("token")
    |> send_resp(:no_content, "")
  end
end
