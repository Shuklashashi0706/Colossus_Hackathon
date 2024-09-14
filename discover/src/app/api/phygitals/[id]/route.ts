import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '../../../../lib/connect'

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params

	try {
		const phygitalDetail = await prisma.phygital.findUnique({
			where: {
				id: id,
			},
		})

		return new NextResponse(JSON.stringify(phygitalDetail), { status: 200 })
	} catch (error) {
		console.log(error)

		return new NextResponse(
			JSON.stringify({ message: 'something went wrong' }),
			{ status: 500 }
		)
	}
}
