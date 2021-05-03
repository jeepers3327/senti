defmodule SentiWeb.UserController do
  use SentiWeb, :controller

  action_fallback SentiWeb.FallbackController

  def index(conn, _params) do
    conn
    |> delete_resp_cookie("token")
    |> delete_resp_cookie("dt")
    |> json(%{data: "test"})
  end

  def show(conn, _params) do
    conn
    |> json(%{data: "test"})
  end

  def create(conn, _params) do
    conn
    |> put_session(:current_user_id, 1)
    |> configure_session(renew: true)
    |> json(%{data: "ok"})
  end
end
