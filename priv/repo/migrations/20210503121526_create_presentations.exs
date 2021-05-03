defmodule Senti.Repo.Migrations.CreatePresentations do
  use Ecto.Migration

  def change do
    create table(:presentations) do
      add :name, :string, null: false
      add :allow_multiple_answers, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:presentations, [:user_id])
  end
end
