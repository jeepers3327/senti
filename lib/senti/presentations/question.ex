defmodule Senti.Presentations.Question do
  use Ecto.Schema
  import Ecto.Changeset

  alias Senti.Presentations.{Presentation, Response}

  schema "questions" do
    field :text, :string

    has_many :responses, Response
    belongs_to :presentation, Presentation

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, [:text, :presentation_id])
    |> validate_required([:text, :presentation_id])
  end
end
