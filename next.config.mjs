/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";
const nextConfig = {
  output: "export",
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
