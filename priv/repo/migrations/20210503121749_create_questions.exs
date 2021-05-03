defmodule Senti.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :text, :string, null: false
      add :presentation_id, references(:presentations, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:questions, [:presentation_id])
  end
end
