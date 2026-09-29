import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Pin Turbopack's root to this directory. Without it, Next walks up and finds
// the stray package-lock.json in React-Apps/ (outside this git repo) and warns.
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: projectRoot },
};
export default nextConfig;
