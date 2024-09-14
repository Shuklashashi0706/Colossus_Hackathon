import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json()
		console.log(body)

		await prisma.collection.update({
			where: {
				collectionName: body.phygitalName,
			},
			data: {
				phygitals: {
					create: {
						phygitalName: body.phygitalName,
						categories: body.categories,
						description: body.description,
						price: body.price,
						quantity: body.quantity,
						royalty: body.royalty,
						image: body.image,
						productInfo: body.productInfo,
						colours: body.colours,
						size: body.size,
						weight: body.weight,
						material: body.material,
						usage: body.usage ?? '',
						uniqueQuality: body.uniqueQuality ?? '',
						manufacturer: body.manufacturer,
						madeIn: body.madeIn,
					},
				},
			},
		})

		return new NextResponse(JSON.stringify({ message: 'Phygital Created' }), {
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
