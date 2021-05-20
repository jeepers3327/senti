defmodule Senti.Accounts.Email do
  import Bamboo.Email
  import Bamboo.SendGridHelper

  alias Senti.Accounts.User

  def password_reset_email(%User{email: email} = _user, reset_url) do
    new_email()
    |> from("heifurukawa1997@gmail.com")
    |> to(email)
    |> with_template("d-39a626043f8f463d9acca12b33ccad6c")
    |> add_dynamic_field("reset_url", reset_url)
  end
end
