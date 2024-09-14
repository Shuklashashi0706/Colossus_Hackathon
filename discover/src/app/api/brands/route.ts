import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/connect'

export const GET = async () => {
	try {
		const brands = await prisma.brand.findMany()

		return new NextResponse(JSON.stringify(brands), { status: 200 })
	} catch (error) {
		console.log(error)

		return new NextResponse(
			JSON.stringify({ message: 'something went wrong' }),
			{ status: 500 }
		)
	}
}
