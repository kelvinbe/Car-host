/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    unoptimized:true
  },
  publicRuntimeConfig: {
    'GOOGLE_MAPS_API_KEY': 'AIzaSyCs3fxia_UXztnwT9WJ-gnOGB30MGXF5_U'
  },
  output: 'standalone'
}
