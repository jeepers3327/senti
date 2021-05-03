defmodule Senti.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :access_code, :string, null: false
      add :is_done, :boolean, default: false, null: false
      add :presentation_id, references(:presentations, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:sessions, [:presentation_id])
  end
end
