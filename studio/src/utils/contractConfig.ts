import { http, createConfig } from '@wagmi/core'
import { base } from 'viem/chains'

export const config = createConfig({
	chains: [base],
	transports: {
		[base.id]: http(),
	},
})
