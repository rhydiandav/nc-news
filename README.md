# NC News

This repository contains a RESTful API, built using Node.js, for a website called Northcoders News, a social news aggregation, web content rating, and discussion website, similar to [Reddit](https://www.reddit.com).

The API interacts with a database containing topics, articles, comments and users.

The deployed version can be viewed [here](https://n-c-news.herokuapp.com/api/).

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Setting Up Locally

To run the environment locally, follow these steps:

First, clone this repo.

`git clone https://github.com/rhydiandav/nc-news.git`

cd in to the project directory.

`cd nc-news`

You will need to create a configuration file, `knexfile.js`, in this directory. This should contain the following, with your PSQL username and password inserted where specified:

```js
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfigs = {
  development: {
    connection: {
      username: 'Your PSQL username',
      password: 'Your PSQL password',
      database: 'nc_news'
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  test: {
    connection: {
      username: 'Your PSQL username',
      password: 'Your PSQL password',
      database: 'nc_news'
    }
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

_NOTE:_ If using a Mac, you will not need to specify a PSQL username and password.

When this file has been created, install the dependencies.

`npm i`

Set up the databases using the `setup-dbs` script.

`npm run setup-dbs`

Seed the databases using the `seed` script.

`npm run seed`

Finally, run the server with the `start` script.

`npm run start`

## Running Tests

To run tests, please use the `test` script:

```bash
npm test
```

### Built With

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex.js](https://knexjs.org/)
- Testing: [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/)
