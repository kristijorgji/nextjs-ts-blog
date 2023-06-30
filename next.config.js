/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // <next.export> config required for next export
  exportPathMap: async function (defaultPathMap) {
    const pathMap = {};

    for (const [path, config] of Object.entries(defaultPathMap)) {
      if (path === "/") {
        pathMap[path] = config;
      } else {
        pathMap[`${path}/index`] = config;
      }
    }

    return pathMap;
  },
  images: {
    unoptimized: true,
  },
  // </next.export>
  webpack: function (config) {
    // for the blog functionality read md as string
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}

module.exports = nextConfig
