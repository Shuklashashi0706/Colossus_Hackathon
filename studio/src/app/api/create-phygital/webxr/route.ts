import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	const body = await req.json()
	console.log(body)

	try {
		await prisma.phygital.update({
			where: {
				phygitalName: body.phygitalName,
			},
			data: {
				webXR: {
					create: {
						image360: body.image360,
						customizations: body.customizations,
						freeNftImage: body.freeNftImage ?? null, // Set to null if no free NFT image is available
						goldReward: body.goldReward,
						silverReward: body.silverReward,
						bronzeReward: body.bronzeReward,
					},
				},
			},
		})

		return new NextResponse(JSON.stringify({ message: 'WebXR Created' }), {
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
