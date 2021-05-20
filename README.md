[![GitHub](https://img.shields.io/github/license/jeepers3327/senti)](https://github.com/jeepers3327/senti/blob/main/LICENSE)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/jhefrey-sajot-a22706165/)

<br />
<p>
  <a href="https://github.com/jeepers3327/senti">
    <img src="./app/public/senti-light.svg" alt="Logo" width="350" >
  </a>

  <h3>Share your thoughts freely!</h3>
  <br/>
</p>

<img src="./demo/demo.gif" >

### Features
* User authentication and registration
* Update user profile
* Sends password reset email to updated the password
* Track number of users waiting in the presentation
* Realtime updates of presentation

### Built With

- [Elixir](https://elixir-lang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Phoenix Framework](https://github.com/phoenixframework/phoenix)
- [NextJS](https://nextjs.org/)

### Deployed To

- [Heroku](https://heroku.com/) - Backend
- [Vercel](https://vercel.com/) - Frontend

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Nodejs 14
- Elixir 1.11.2
- Erlang 23.2

### Installation

1. Clone the repo

```
 git clone https://github.com/jeepers3327/senti.git
```

2. Install Phoenix dependencies

```
 mix do deps.get, deps.compile
```

3. Install NPM packages

```
 yarn install --modules-folder app/
```

4. Create `.env.local` file inside `app` directory and set the following environment variables
```
NEXT_PUBLIC_API_BASE_URL = your_frontend_host_url
NEXT_PUBLIC_LOCAL_API_BASE_URL = your_backend_host_url
```

5. In the root directory export the following environment variables
```sh
export DATABASE_URL=your_db_url
export SECRET_KEY_BASE=your_secret_key_base
export SENDGRID_API_KEY=your_sendgrid_api_key
export POOL_SIZE=your_db_pool_size
```
6. Start phoenix server

```
 iex -S mix phx.server
```

7. Start Nextjs server

```
 cd app/
 yarn dev
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Twitter: [@jfrysjt97](https://twitter.com/jfrysjt97)

LinkedIn: [Jhefrey Sajot](https://www.linkedin.com/in/jhefrey-sajot-a22706165/)
