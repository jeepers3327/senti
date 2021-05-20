defmodule Senti.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Senti.Repo
  alias Ecto.Multi

  alias Senti.Accounts.{User, PasswordReset, Email}
  alias Senti.Mailer

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user(id) do
    case Repo.get(User, id) do
      nil -> :error
      user -> user
    end
  end

  def get_user_by_email(email) do
    case Repo.get_by(User, email: email) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    Multi.new()
    |> Multi.update(:user, User.update_user_changeset(user, attrs))
    |> Multi.delete_all(:tokens, Ecto.assoc(user, :password_resets))
    |> Repo.transaction()
    |> case do
      {:ok, %{user: user}} -> {:ok, user}
      {:error, :user, changeset, _} -> {:error, changeset}
    end
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  def authenticate_user(email, password) do
    User
    |> Repo.get_by(email: email)
    |> verify_password(password)
  end

  def create_password_token(attrs \\ %{}) do
    %PasswordReset{}
    |> PasswordReset.changeset(attrs)
    |> Repo.insert()
  end

  def get_password_token(token) do
    case Repo.get_by(PasswordReset, reset_token: token) do
      nil ->
        {:error, :not_found}

      reset_token ->
        case reset_token.has_updated do
          true -> {:error, :already_updated}
          false -> reset_token
        end
    end
  end

  def get_user_from_token(params) do
    token = params["token"]

    PasswordReset
    |> join(:inner, [p], u in User, on: p.user_id == u.id)
    |> where([p], p.reset_token == ^token)
    |> select([p, u], u)
    |> Repo.one()
    |> case do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  def send_email(user, url) do
    user
    |> Email.password_reset_email(url)
    |> Mailer.deliver_later()
  end

  def generate_reset_password_token do
    :crypto.strong_rand_bytes(64) |> Base.url_encode64()
  end

  defp verify_password(nil, _) do
    Argon2.no_user_verify()
    {:error, "Wrong email or password!"}
  end

  defp verify_password(user, password) do
    case Argon2.verify_pass(password, user.password_hash) do
      true -> {:ok, user}
      false -> {:error, "Wrong email or password!"}
    end
  end
end
