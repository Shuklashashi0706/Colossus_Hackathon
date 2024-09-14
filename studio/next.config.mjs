/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['utfs.io'],
	},
	experimental: {
	  missingSuspenseWithCSRBailout: false,
	},
	async headers() {
		return [
		  {
			source: '/',
			headers: [
			  {
				key: 'Content-Security-Policy',
				value: "frame-ancestors 'self' https://*.vercel.app https://*.ngrok-free.app https://secure-mobile.walletconnect.com",
			  },
			],
		  },
		];
	  },
  }
  
  export default nextConfig
  