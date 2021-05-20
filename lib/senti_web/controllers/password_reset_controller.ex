defmodule SentiWeb.PasswordResetController do
  use SentiWeb, :controller

  alias Senti.Accounts
  alias Senti.Accounts.User

  action_fallback SentiWeb.FallbackController

  def create(conn, %{"email" => email}) do
    token = Accounts.generate_reset_password_token()
    url = Routes.password_reset_url(SentiWeb.Endpoint, :index, token: token)

    with {:ok, user} <- Accounts.get_user_by_email(email),
         {:ok, _password_reset} <-
           Accounts.create_password_token(%{user_id: user.id, reset_token: token}),
         {:ok, _email} <- Accounts.send_email(user, url) do
      conn
      |> put_status(:created)
      |> json(%{message: "Password reset email has been sent!"})
    else
      _ ->
        {:error, :not_found}

      {:error, _email} ->
        conn |> put_status(:bad_request) |> json(%{message: "An unexpected error occured!"})
    end
  end

  def update(conn, reset_params) do
    with {:ok, %User{} = user} <- Accounts.get_user_from_token(reset_params),
         {:ok, _updated_user} <- Accounts.update_user(user, reset_params) do
      conn
      |> put_status(200)
      |> json(%{message: "Your password has been updated!"})
    end
  end
end
