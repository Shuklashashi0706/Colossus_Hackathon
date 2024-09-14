import { paymasterClient } from '../../../utils/paymasterConfig'
import { willSponsor } from '../../../utils/utils'

export async function POST(r: Request) {
	try {
		// Parse the request body as JSON
		const req = await r.json()

		const method = req.method
		const [userOp, entrypoint, chainId] = req.params
		console.log(req.params)

		if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
			return new Response(
				JSON.stringify({ error: 'Not a sponsorable operation' }),
				{ status: 400 }
			)
		}

		if (method === 'pm_getPaymasterStubData') {
			const result = await paymasterClient.getPaymasterStubData({
				userOperation: userOp,
			})
			return new Response(JSON.stringify({ result }), { status: 200 })
		} else if (method === 'pm_getPaymasterData') {
			const result = await paymasterClient.getPaymasterData({
				userOperation: userOp,
			})
			return new Response(JSON.stringify({ result }), { status: 200 })
		}
		return new Response(JSON.stringify({ error: 'Method not found' }), {
			status: 404,
		})
	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
		})
	}
}
