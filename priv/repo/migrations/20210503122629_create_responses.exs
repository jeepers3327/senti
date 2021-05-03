defmodule Senti.Repo.Migrations.CreateResponses do
  use Ecto.Migration

  def change do
    create table(:responses) do
      add :answer, :string, null: false
      add :session_id, references(:sessions, on_delete: :delete_all), null: false
      add :question_id, references(:questions, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:responses, [:session_id])
    create index(:responses, [:question_id])
  end
end
