module.exports = {
  development: {
    // Complete.
    client: "sqlite3",
    connection: {
      filename: "./data/project.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },

  testing: {
    // Complete (otherwise `npm test` won't work in your local machine).
    client: "sqlite3",
    connection: {
      filename: "./data/projects.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },

    seeds: {
      directory: "./data/seeds",
    },
  },
};
