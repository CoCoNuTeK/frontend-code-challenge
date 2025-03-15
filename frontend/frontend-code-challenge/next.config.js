/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.pokemondb.net'], // Allow images from pokemondb.net
  },
};

module.exports = nextConfig; 