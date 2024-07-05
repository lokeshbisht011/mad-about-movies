/** @type {import('next').NextConfig} */

import withMDX from '@next/mdx';

// Define the MDX configuration
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'drive.usercontent.google.com'
            }
        ]
    }
};

export default withMDXConfig(nextConfig);
