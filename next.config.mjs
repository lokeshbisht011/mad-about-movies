/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'drive.usercontent.google.com'
            }
        ]
    }
};

export default nextConfig;
