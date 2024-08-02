module.exports = {
  apps: [
    {
      name: "staging-olmat-daftar",
      script: "yarn",
      args: "start",
      cwd: "/var/www/olmat-daftar-staging",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
