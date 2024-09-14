import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	const body = await req.json()

	console.log(body)
	try {
		const phygitalName = body[0].phygitalName
		const variantInfo = body[0].variantData

		await prisma.phygital.update({
			where: {
				phygitalName,
			},
			data: {
				variants: {
					createMany: {
						data: variantInfo,
					},
				},
			},
		})

		return new NextResponse(JSON.stringify({ message: 'Variant Created' }), {
			status: 201,
		})
	} catch (error) {
		console.log(error)

		return new NextResponse(
			JSON.stringify({ message: 'something went wrong' }),
			{ status: 500 }
		)
	}
}
