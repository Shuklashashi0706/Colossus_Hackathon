import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/connect'

export const GET = async () => {
	try {
		const phygitals = await prisma.phygital.findMany()

		return new NextResponse(JSON.stringify(phygitals), { status: 200 })
	} catch (error) {
		console.log(error)

		return new NextResponse(
			JSON.stringify({ message: 'something went wrong' }),
			{ status: 500 }
		)
	}
}
