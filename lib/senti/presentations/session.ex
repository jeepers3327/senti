defmodule Senti.Presentations.Session do
  use Ecto.Schema
  import Ecto.Changeset

  alias Senti.Presentations.{Presentation, Response}

  schema "sessions" do
    field :access_code, :string
    field :is_done, :boolean, default: false

    has_many :responses, Response
    belongs_to :presentation, Presentation

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:access_code, :is_done, :presentation_id])
    |> validate_required([:access_code, :is_done, :presentation_id])
    |> put_access_code()
  end

  defp put_access_code(%Ecto.Changeset{valid?: true} = changeset) do
    put_change(changeset, :access_code, generate_access_code())
  end

  defp generate_access_code() do
    min = String.to_integer("100000", 36)
    max = String.to_integer("ZZZZZZ", 36)

    max
    |> Kernel.-(min)
    |> :rand.uniform()
    |> Kernel.+(min)
    |> Integer.to_string(36)
  end
end
