import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  // @ts-ignore
  server: {
    allowedDevOrigins: ['batting-pendant-showroom.ngrok-free.dev'],
  }
};

export default withNextIntl(nextConfig);
