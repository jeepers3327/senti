defmodule Senti.Repo.Migrations.RemoveAllowMultipleAnswersPresentation do
  use Ecto.Migration

  def change do
    alter table(:presentations) do
      remove :allow_multiple_answers
    end
  end
end
