defmodule Senti.Accounts.PasswordReset do
  use Ecto.Schema
  import Ecto.Changeset

  alias Senti.Accounts.User

  schema "password_resets" do
    field :reset_token, :string
    field :has_updated, :boolean, default: false
    belongs_to :user, User, type: :binary_id
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(password_reset, attrs) do
    password_reset
    |> cast(attrs, [:user_id, :reset_token, :has_updated])
  end

  def update_token_changeset(password_reset, attrs) do
    password_reset
    |> cast(attrs, [:user_id, :reset_token, :has_updated])
    |> put_updated()
  end

  defp put_updated(changeset) do
    change(changeset, %{has_updated: true})
  end
end
