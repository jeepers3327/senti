defmodule Senti.Repo.Migrations.CreatePasswordResetsTable do
  use Ecto.Migration

  def change do
    create table(:password_resets) do
      add :reset_token, :string, null: false
      add :has_updated, :boolean, default: false
      add :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false

      timestamps()

    end

    create index(:password_resets, [:user_id])
  end
end
