defmodule Senti.Repo.Migrations.AddStatusToSessions do
  use Ecto.Migration

  def change do
    alter table(:sessions) do
      remove :is_done
      add :status, :string, default: "ready"
    end
  end
end
