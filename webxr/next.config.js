/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding')
		return config
	},
	images: {
		domains: ['utfs.io', 'nftstorage.link'],
	},
}

module.exports = nextConfig
