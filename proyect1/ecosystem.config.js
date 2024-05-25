
module.exports = {
    apps: [
      {
        name: 'my-script',
        script: './src/app/worker.js',
      cron_restart: '*/5 * * * *',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  