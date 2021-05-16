defmodule Senti.Presentations.Presentation do
  use Ecto.Schema
  import Ecto.Changeset

  alias Senti.Accounts.User
  alias Senti.Presentations.{Question, Session}

  schema "presentations" do
    field :name, :string

    has_many :questions, Question
    has_many :sessions, Session
    belongs_to :user, User, type: :binary_id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(presentation, attrs) do
    presentation
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name, :user_id])
  end
end
