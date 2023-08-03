// File ini akan berisi konfigurasi untuk koneksi ke database PostgreSQL

module.exports = {
    development: {
      client: 'pg', // Gunakan 'pg' sebagai client untuk PostgreSQL
      connection: {
        host: '127.0.0.1', // Ganti dengan host database PostgreSQL Anda
        user: 'postgres', // Ganti dengan username database PostgreSQL Anda
        password: '12345678', // Ganti dengan password database PostgreSQL Anda
        database: 'knex', // Ganti dengan nama database PostgreSQL Anda
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations', // Ganti dengan direktori di mana file migrasi akan disimpan
      },
      seeds: {
        directory: './db/seeds', // Ganti dengan direktori di mana file seed akan disimpan
      },
    },
}