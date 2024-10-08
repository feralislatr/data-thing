/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * remove instrumentation to avoid material-ui error
   * https://github.com/mui/material-ui/issues/42840#issuecomment-2302591694
   */
  // experimental: {
  //   swcPlugins: [
  //     ['swc-plugin-coverage-instrument', {}]
  //   ]
  // },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
