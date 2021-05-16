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
      |> put_session(:token, token)
      |> render("auth.json", user: user)
    else
      {:error, message} ->
        conn
        |> delete_session(:token)
        |> put_status(401)
        |> json(%{message: message})
    end
  end

  def delete(conn, _params) do
    conn
    |> clear_session()
    |> configure_session(drop: true)
    |> send_resp(:no_content, "")
  end

  def me(conn, _params) do
    conn
    |> put_status(:ok)
    |> render("auth.json", user: conn.assigns.current_user)
  end
end
