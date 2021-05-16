defmodule Senti.Repo.Migrations.AddColorsToResponses do
  use Ecto.Migration

  def change do
    alter table(:responses) do
      add :color, :string
    end
  end
end
