defmodule SentiWeb.Plugs.VerifyHeader do
  @behaviour Plug

  import Plug.Conn
  alias Senti.Token

  @doc false
  def init(opts), do: opts

  @doc false
  def call(conn, _opts) do
    token = get_session(conn, :token)

    case Token.verify_token(token) do
      {:ok, payload} ->
        conn
        |> assign(:current_user, payload)

      {:error, _} ->
        conn
    end
  end

  # defp fetch_token(%Plug.Conn{req_cookies: %{"token" => token}}), do: token
  # defp fetch_token(_conn), do: nil
end
