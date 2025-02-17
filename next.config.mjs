import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  compiler: {
    styledComponents: true,
  }
};

export default withNextIntl(nextConfig);
