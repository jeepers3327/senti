defmodule SentiWeb.SessionChannel do
  use SentiWeb, :channel

  alias Senti.SessionState
  alias Senti.Presentations
  alias SentiWeb.Presence

  @impl true
  def join("session:" <> session_id, _payload, socket) do
    {:ok, _pid} = SessionState.look_up(session_id)
    presentation = Presentations.get_presentation_session(session_id)

    socket =
      socket
      |> assign(:session_id, session_id)
      |> assign(:presentation, presentation)
      |> assign(:user_id, Nanoid.generate())

    send(self(), :after_join)

    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    {:ok, _} =
      Presence.track(socket, socket.assigns.user_id, %{
        online_at: :os.system_time(:millisecond)
      })

    push(socket, "presence_state", Presence.list(socket))

    {:noreply, socket}
  end

  @impl true
  def handle_in("start_session", _payload, socket) do
    %{index: index, has_next: has_next} =
      SessionState.get_current_index(socket.assigns.session_id, socket.assigns.presentation)

    IO.puts("inside...")
    {:ok, session} = Presentations.update_session_status(socket.assigns.session_id, "started")
    IO.inspect(session)

    broadcast(socket, "session_started", %{
      current_index: index,
      has_next: has_next,
      presentation: socket.assigns.presentation
    })

    {:noreply, socket}
  end

  def handle_in("reset_index", _payload, socket) do
    _state = SessionState.reset_index(socket.assigns.session_id)
    {:noreply, socket}
  end

  def handle_in("next_question", _payload, socket) do
    state = SessionState.get_next_index(socket.assigns.session_id)
    broadcast(socket, "next_question", %{state: state})

    {:noreply, socket}
  end

  def handle_in("get_current_state", _payload, socket) do
    presentation = Presentations.get_presentation_session(socket.assigns.session_id)

    push(socket, "current_state", presentation)
    {:noreply, socket}
  end

  @impl true
  def handle_in("session_response", payload, socket) do
    {:ok, response} = Presentations.create_response(payload)
    broadcast(socket, "new_response", format_response(response))
    {:noreply, socket}
  end

  def handle_in("end_session", _payload, socket) do
    {:ok, _session} = Presentations.update_session_status(socket.assigns.session_id, "ended")
    broadcast(socket, "session_ended", %{})

    {:noreply, socket}
  end

  defp format_response(response) do
    %{id: response.id, answer: response.answer, color: response.color}
  end
end
