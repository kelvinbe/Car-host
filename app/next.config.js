/* @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'MYSQL_HOST': '127.0.0.1',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'divvly',
    'MYSQL_USER': 'divvly',
    'MYSQL_PASSWORD': 'Divvly'
  },
  publicRuntimeConfig: {
    'GOOGLE_MAPS_API_KEY': 'AIzaSyCs3fxia_UXztnwT9WJ-gnOGB30MGXF5_U'
  }
}
