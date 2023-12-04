/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    unoptimized:true
  },
  publicRuntimeConfig: {
    'GOOGLE_MAPS_API_KEY': ''
  },
  output: 'standalone'
}
