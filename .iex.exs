alias Senti.Presentations.{Session, Question, Response, Presentation}
alias Senti.Presentations
alias Senti.Accounts
alias Senti.Accounts.User
alias Senti.Repo

import Ecto.Query

user = %{"name" => "Jeepers", "email" => "heifurukawa1997@gmail.com", "password" => "1234"}

presentation = %{
  "user_id" => "08a091f0-a73b-4e0c-b208-e7e119d5df8a",
  "name" => "My presentation",
  "allow_multiple_answers" => true,
  "questions" => [
    %{"text" => "question 1"},
    %{"text" => "question 2"},
    %{"text" => "question 3"},
    %{"text" => "question 4"},
    %{"text" => "question 5"},
    %{"text" => "question 6%"},
    %{"text" => "question 7"},
    %{"text" => "question 8"},
    %{"text" => "question 9"},
    %{"text" => "question 10"}
  ]
}
