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
				avatar: {
					create: {
						avatarId: body.avatarId,
						url: body.url,
						userId: body.userId,
					},
				},
			},
		})

		return new NextResponse(JSON.stringify({ message: 'Avatar Created' }), {
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
