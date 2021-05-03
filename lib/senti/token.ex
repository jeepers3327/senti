defmodule Senti.Token do
  @salt "xefbpY0krnSCff1OnFElKdhAsQ7a2whmU5TBf7oQ9lljE2vBjGZcJEaUlhR6sOW1"
  @max_age 2_592_000

  def generate_token(user) do
    Phoenix.Token.sign(SentiWeb.Endpoint, @salt, user.id)
  end

  def verify_token(token) do
    Phoenix.Token.verify(SentiWeb.Endpoint, @salt, token, max_age: @max_age)
  end
end
