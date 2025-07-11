/** @type {import('next').NextConfig} */

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
    /**
     * Enable test proxy only in test mode because it breaks next/font
     * https://github.com/vercel/next.js/issues/66238
     */
    ...(process.env.NODE_ENV === 'test' && { testProxy: true}),
  },
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
