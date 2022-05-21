module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'goal-setting'),
      user: env('DATABASE_USERNAME', 'sammy'),
      password: env('DATABASE_PASSWORD', 'secret'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
