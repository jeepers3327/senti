defmodule SentiWeb.PresentationControllerTest do
  use SentiWeb.ConnCase

  alias Senti.Presentations
  alias Senti.Presentations.Presentation

  @create_attrs %{
    allow_multiple_answers: true,
    name: "some name"
  }
  @update_attrs %{
    allow_multiple_answers: false,
    name: "some updated name"
  }
  @invalid_attrs %{allow_multiple_answers: nil, name: nil}

  def fixture(:presentation) do
    {:ok, presentation} = Presentations.create_presentation(@create_attrs)
    presentation
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all presentations", %{conn: conn} do
      conn = get(conn, Routes.presentation_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create presentation" do
    test "renders presentation when data is valid", %{conn: conn} do
      conn = post(conn, Routes.presentation_path(conn, :create), presentation: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.presentation_path(conn, :show, id))

      assert %{
               "id" => id,
               "allow_multiple_answers" => true,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.presentation_path(conn, :create), presentation: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update presentation" do
    setup [:create_presentation]

    test "renders presentation when data is valid", %{conn: conn, presentation: %Presentation{id: id} = presentation} do
      conn = put(conn, Routes.presentation_path(conn, :update, presentation), presentation: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.presentation_path(conn, :show, id))

      assert %{
               "id" => id,
               "allow_multiple_answers" => false,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, presentation: presentation} do
      conn = put(conn, Routes.presentation_path(conn, :update, presentation), presentation: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete presentation" do
    setup [:create_presentation]

    test "deletes chosen presentation", %{conn: conn, presentation: presentation} do
      conn = delete(conn, Routes.presentation_path(conn, :delete, presentation))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.presentation_path(conn, :show, presentation))
      end
    end
  end

  defp create_presentation(_) do
    presentation = fixture(:presentation)
    %{presentation: presentation}
  end
end
