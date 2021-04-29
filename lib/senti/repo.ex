defmodule Senti.Repo do
  use Ecto.Repo,
    otp_app: :senti,
    adapter: Ecto.Adapters.Postgres
end
