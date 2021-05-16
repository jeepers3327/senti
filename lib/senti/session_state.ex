defmodule Senti.SessionState do
  use GenServer, restart: :transient

  alias Senti.SessionSupervisor

  def start_link(opts \\ []) do
    name = Keyword.get(opts, :session_id)
    GenServer.start_link(__MODULE__, %{}, name: via_tuple(name))
  end

  def get_current_index(name, presentation) do
    GenServer.call(via_tuple(name), {:current_index, presentation})
  end

  def get_next_index(name) do
    GenServer.call(via_tuple(name), :next_index)
  end

  def reset_index(name) do
    GenServer.call(via_tuple(name), :reset)
  end

  def init(_opts) do
    state = %{current_index: 0, has_next: true, question_length: 0}
    {:ok, state}
  end

  def handle_call({:current_index, presentation}, _from, state) do
    index = Map.get(state, :current_index)

    session_state =
      %{state | question_length: length(presentation.questions) - 1} |> check_has_next()

    {:reply, %{index: index, has_next: session_state.has_next}, session_state}
  end

  def handle_call(:next_index, _from, state) do
    session_state = get_next_state(state) |> check_has_next()
    {:reply, session_state, session_state}
  end

  def handle_call(:reset, _from, state) do
    reset_state = %{state | current_index: 0}
    {:noreply, reset_state, reset_state}
  end

  def look_up(session_id) do
    case start_supervised(session_id) do
      {:ok, pid} -> {:ok, pid}
      {:error, {:already_started, pid}} -> {:ok, pid}
    end
  end

  defp get_next_state(state) do
    Map.update(state, :current_index, 0, &(&1 + 1))
  end

  defp check_has_next(state) do
    case state.question_length == state.current_index do
      true -> %{state | has_next: false}
      false -> state
    end
  end

  defp via_tuple(name) do
    {:via, Registry, {Senti.SessionRegistry, name}}
  end

  defp start_supervised(session_id) do
    SessionSupervisor.start(session_id)
  end
end
