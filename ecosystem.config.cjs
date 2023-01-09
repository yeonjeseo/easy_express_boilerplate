require('dotenv').config()

module.exports = {
  apps: [
    {
      name: "express-boilerplate",
      script: "./src/index.js",
      exec_mode: "cluster",
      instances: 2,
      merge_logs: true,
      autorestart: true,
      watch: false,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: "local"
      },
    }
  ]
}