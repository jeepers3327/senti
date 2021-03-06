defmodule Senti.Presentations.Response do
  use Ecto.Schema
  import Ecto.Changeset

  alias Senti.Presentations.{Session, Question}

  schema "responses" do
    field :answer, :string
    field :color, :string
    belongs_to :session, Session
    belongs_to :question, Question

    timestamps()
  end

  @doc false
  def changeset(response, attrs) do
    response
    |> cast(attrs, [:answer, :session_id, :question_id, :color])
    |> validate_required([:answer, :session_id, :question_id, :color])
  end
end
