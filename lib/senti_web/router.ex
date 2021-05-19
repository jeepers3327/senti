defmodule SentiWeb.Router do
  use SentiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug SentiWeb.Plugs.VerifyHeader
  end

  pipeline :protected do
    plug SentiWeb.Plugs.EnsureAuthenticated, handler: SentiWeb.ErrorHandler
  end

  scope "/api", SentiWeb do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    resources "/presentations/session", PresentationSessionController, only: [:create]
    get "/presentations/session/:session_id", PresentationController, :show

    post "/presentations/join", PresentationController, :join
  end

  scope "/api", SentiWeb do
    pipe_through [:api, :protected]
    resources "/users", UserController, singleton: true, only: [:update]
    resources "/presentations", PresentationController, only: [:index, :create]

    get "/user/me", SessionController, :me
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: SentiWeb.Telemetry
    end
  end
end
