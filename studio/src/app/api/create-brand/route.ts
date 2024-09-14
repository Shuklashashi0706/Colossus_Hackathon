import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json()

		console.log(body)

		await prisma.manager.create({
			data: {
				walletAddress: body.walletAddress,
				brands: {
					create: {
						brandName: body.brandName,
						description: body.description,
						logoImage: body.logoImage,
						brandRepresentative: body.brandRepresentative,
						contactEmail: body.contactEmail,
						contactPhone: body.contactPhone,
						shippingAddress: body.shippingAddress,
						brandInfo: body.brandInfo,
					},
				},
			},
		})

		// await prisma.brand.create({
		// 	data: {
		// 		brandName: body.brandName,
		// 		description: body.description,
		// 		logoImage: body.logoImage,
		// 		brandRepresentative: body.brandRepresentative,
		// 		contactEmail: body.contactEmail,
		// 		contactPhone: body.contactPhone,
		// 		shippingAddress: body.shippingAddress,
		// 		brandInfo: body.brandInfo,
		// 		managerId: body.walletAddress,
		// 	},
		// })

		return new NextResponse(JSON.stringify({ message: 'Brand Created' }), {
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
