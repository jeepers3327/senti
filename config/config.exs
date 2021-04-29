# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :senti,
  ecto_repos: [Senti.Repo]

# Configures the endpoint
config :senti, SentiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Cu2N336hdguMYaAD9eftThsqv5f6OqtCYLtjZ7y9z4hJazO+jEOkdIf7l+1HNd5u",
  render_errors: [view: SentiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Senti.PubSub,
  live_view: [signing_salt: "aqsfrl6U"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
