defmodule Senti.Repo.Migrations.ChangeUserReferenceTypeForPresentation do
  use Ecto.Migration

  def change do

    drop constraint(:presentations, "presentations_user_id_fkey")

    alter table(:presentations) do
      modify :user_id, references(:users, on_delete: :delete_all, type: :binary_id), null: false
    end
  end
end
