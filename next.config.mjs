/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  devIndicators: false,
  images: {
    // Static hosting cannot run the Next.js Image Optimization API.
    unoptimized: true,
  },
};

export default nextConfig;
