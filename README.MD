# AgroLeague API

AgroLeague API is an express NODEJS server running on top of Docker, with a Postgres database. The .env file voluntarily present.

## Installation

Install [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) to start the container.

```bash
# Pull from github
git clone https://github.com/WBPierre/api-agroleague.git
cd api-agroleague
```


## Usage

```bash
docker compose start
```
## Running test

```bash
# considering you at the root of the project
cd api
npx sequelize-cli create:db:test
yarn jest
```


## License

[MIT](https://choosealicense.com/licenses/mit/)
