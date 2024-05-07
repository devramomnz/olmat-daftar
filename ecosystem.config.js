module.exports = {
  apps: [
    {
      name: "prod-olmat-daftar",
      script: "yarn",
      args: "start",
      cwd: "/var/www/olmat-daftar",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
