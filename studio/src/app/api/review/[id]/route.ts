import { prisma } from '@/utils/connect'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	// const body = await req.json()

	const { id } = params

	try {
		const phygitals = prisma.phygital.findMany()

		return new NextResponse(JSON.stringify(phygitals), { status: 200 })
	} catch (error) {
		console.log(error)

		return new NextResponse(
			JSON.stringify({ message: 'something went wrong getting phygital' }),
			{ status: 500 }
		)
	}
}
