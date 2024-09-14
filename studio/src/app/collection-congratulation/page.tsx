'use client'
import { Button, Navbar } from '@/components'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function Congratulations() {
	return (
		<Suspense>
			<Navbar />
			<ToastContainer />
			<main className='h-screen py-12 px-16 flex flex-col gap-8 text-black'>
				<h1 className='text-3xl font-bold'>Congratulations</h1>
				<p>Your Collection has been launched successfully.</p>
				<div className='py-6 '>
					<p className='text-2xl'>Your brand doesn’t have any phygitals. </p>
				</div>
				<Link href='/create-phygital'>
					<Button className='w-fit bg-[#30D8FF] hover:text-white rounded-full text-black text-2xl'>
						Create phygital
					</Button>
				</Link>
			</main>
		</Suspense>
	)
}
