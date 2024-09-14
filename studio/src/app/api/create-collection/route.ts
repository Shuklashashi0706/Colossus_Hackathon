import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json()

		await prisma.brand.update({
			where: {
				brandName: body[1],
			},
			data: {
				collections: {
					create: {
						collectionName: body[0],
					},
				},
			},
		})

		return new NextResponse(JSON.stringify({ message: 'Collection Created' }), {
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
