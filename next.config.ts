import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: true,
      },
      {
        source: "/novyny/novyna-1",
        destination: "/novyny/zaprashuyemo-do-spivpratsi",
        permanent: true,
      },
      {
        source: "/novyny/novyna-2",
        destination: "/novyny/zberegaemo-dovkillya-memorandum-chysto-de",
        permanent: true,
      },
      {
        source: "/novyny/novyna-3",
        destination: "/novyny/zahalni-zbory-zasnovnykiv-napryamy-diyalnosti-tera",
        permanent: true,
      },
      {
        source: "/en/novyny/novyna-1",
        destination: "/en/novyny/we-invite-you-to-cooperate",
        permanent: true,
      },
      {
        source: "/en/novyny/novyna-2",
        destination: "/en/novyny/protecting-environment-chysto-de-memorandum-signed",
        permanent: true,
      },
      {
        source: "/en/novyny/novyna-3",
        destination:
          "/en/novyny/founders-general-meeting-association-priorities-approved",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
