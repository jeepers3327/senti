defmodule Senti.PresentationsTest do
  use Senti.DataCase

  alias Senti.Presentations

  describe "presentations" do
    alias Senti.Presentations.Presentation

    @valid_attrs %{allow_multiple_answers: true, name: "some name"}
    @update_attrs %{allow_multiple_answers: false, name: "some updated name"}
    @invalid_attrs %{allow_multiple_answers: nil, name: nil}

    def presentation_fixture(attrs \\ %{}) do
      {:ok, presentation} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Presentations.create_presentation()

      presentation
    end

    test "list_presentations/0 returns all presentations" do
      presentation = presentation_fixture()
      assert Presentations.list_presentations() == [presentation]
    end

    test "get_presentation!/1 returns the presentation with given id" do
      presentation = presentation_fixture()
      assert Presentations.get_presentation!(presentation.id) == presentation
    end

    test "create_presentation/1 with valid data creates a presentation" do
      assert {:ok, %Presentation{} = presentation} = Presentations.create_presentation(@valid_attrs)
      assert presentation.allow_multiple_answers == true
      assert presentation.name == "some name"
    end

    test "create_presentation/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Presentations.create_presentation(@invalid_attrs)
    end

    test "update_presentation/2 with valid data updates the presentation" do
      presentation = presentation_fixture()
      assert {:ok, %Presentation{} = presentation} = Presentations.update_presentation(presentation, @update_attrs)
      assert presentation.allow_multiple_answers == false
      assert presentation.name == "some updated name"
    end

    test "update_presentation/2 with invalid data returns error changeset" do
      presentation = presentation_fixture()
      assert {:error, %Ecto.Changeset{}} = Presentations.update_presentation(presentation, @invalid_attrs)
      assert presentation == Presentations.get_presentation!(presentation.id)
    end

    test "delete_presentation/1 deletes the presentation" do
      presentation = presentation_fixture()
      assert {:ok, %Presentation{}} = Presentations.delete_presentation(presentation)
      assert_raise Ecto.NoResultsError, fn -> Presentations.get_presentation!(presentation.id) end
    end

    test "change_presentation/1 returns a presentation changeset" do
      presentation = presentation_fixture()
      assert %Ecto.Changeset{} = Presentations.change_presentation(presentation)
    end
  end
end
