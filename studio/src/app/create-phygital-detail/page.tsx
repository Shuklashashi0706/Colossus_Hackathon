'use client'
import { useState, useEffect } from 'react'
import {
	Button,
	Input,
	Label,
	Navbar,
	Textarea,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	PlusIcon,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FormRepeater from 'react-form-repeater'
import { v4 as uuidv4 } from 'uuid'
import { useAccount, useChainId, useWalletClient } from 'wagmi'
import { NFTStorage } from 'nft.storage'
import { Hex, createPublicClient, http } from 'viem'
import { base } from 'viem/chains'
import axios from 'axios'
import phygital from "@/lib/phygital.json"

const formSchema = z.object({
	color: z.string().min(2, {
		message: 'Color must be at least 2 characters',
	}),
	size: z
		.string()
		.min(1, { message: 'Size must be at least 1 character' }),
	weight: z.string().min(1, { message: 'Weight must be provided' }),
	material: z.string().min(1, { message: 'Material must be provided' }),
	usage: z.string(),
	quality: z.string(),
	manufacturer: z
		.string()
		.min(2, { message: 'Manufacturer must be at least 2 characters' }),
	origin_country: z
		.string()
		.min(2, { message: 'Country of origin must be at least 2 characters' }),
	contract_address:z.string()
})

interface FormDataEntry {
	title: string
	description: string
}

export default function CreatePhygitalDetail() {
	const { address: walletAddress } = useAccount()
	const [error, setError] = useState<string | null>(null)
	const [isDeployed, setIsDeployed] = useState(false)
	const chainId = useChainId()
	const { data: walletClient } = useWalletClient({ chainId })
	const publicClient = createPublicClient({
		chain: base,
		transport: http(),
	})


	// const deployContract = async (
	// 	name: string,
	// 	symbol: string,
	// 	contractDetails: (string | number)[],
	// 	baseUri: string
	// ) => {
	// 	if (!walletClient) {
	// 		throw new Error('Wallet client not available')
	// 	}
	// 	const AccessMasterAddress = localStorage.getItem("AccessMasterAddress");
	// 	const TradehubAddress = localStorage.getItem("TradehubAddress");
	// 	console.log("access" ,AccessMasterAddress)
	// 	console.log("trade" ,TradehubAddress)
	// 	try {
	// 		const hash = await walletClient.deployContract({
	// 			abi: phygital.abi,
	// 			bytecode: phygital.bytecode as Hex,
	// 			account: walletAddress,
	// 			args: [name, symbol, `${TradehubAddress}`, `${AccessMasterAddress}`, '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747', contractDetails, baseUri]
	// 		})

	// 		if (!hash) {
	// 			throw new Error('Failed to execute deploy contract transaction')
	// 		}

	// 		const txn = await publicClient.waitForTransactionReceipt({ hash })
	// 		setIsDeployed(true)

	// 		return txn.contractAddress
	// 	} catch (error) {
	// 		console.error('Deployment error:', error)
	// 		setError('Error deploying contract: ' + error)
	// 	}
	// };

	// const PhygitalDeploy = async (): Promise<boolean> => {
	// 	try {
	// 		const contractDetailsString = ["10000000000000000", 100, 300, 6];
	// 		const contractDetails = contractDetailsString.map((item, index) => {
	// 			if (index === 0) {
	// 				return item; // Keep the first element as a string
	// 			} else {
	// 				const num = Number(item);
	// 				return isNaN(num) ? item : num;
	// 			}
	// 		});

	// 		console.log(contractDetails);

	// 		const address = await deployContract(`${parsedData.name}`, "AC", contractDetails, "www.baseuri.com");
    //         localStorage.setItem("PhygitalAddress", address as `0x${string}`)
	// 		console.log('Contract deployed at:', address);
	// 		return address !== null;
	// 	} catch (error) {
	// 		console.error('Error deploying contract:', error);
	// 		setError('Error deploying contract: ' + error);
	// 		return false;
	// 	}
	// };


	const apiUrl = process.env.NEXT_PUBLIC_URI;

	const account = useAccount()

	const router = useRouter()
	const [formData, setFormData] = useState<FormDataEntry[]>([])
	const [loading, setLoading] = useState(false)

	const getData = () => {
		if (typeof window !== 'undefined' && localStorage) {
			return localStorage.getItem('phygitalData')
		}
		return null
	}

	const storedData = getData()
	const parsedData = storedData ? JSON.parse(storedData) : {}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			color: '',
			size: '',
			weight: '',
			material: '',
			usage: '',
			quality: '',
			manufacturer: '',
			origin_country: '',
			contract_address:'',
		},
	})

	const handleFormChange = (newFormData: FormDataEntry[]) => {
		setFormData(newFormData)
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			localStorage.setItem('phygitalDetailsData', JSON.stringify(values))
			setLoading(true)


			// toast.warning('Now we are deploying phygital to launch your nft collection', {
			// 	position: 'top-left',
			// })
			// const deploySuccess = await PhygitalDeploy();
			// if (deploySuccess) {
			//  const phygitalId = localStorage.getItem("PhygitalId");
			// 	const CollectionId = localStorage.getItem("CollectionId")
			// 	const PhygitalAddress = localStorage.getItem("PhygitalAddress")
			// 	const phygitalResponse = await fetch(`${apiUrl}/phygitals/${phygitalId}`, {
			// 		method: 'PUT',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify({
			// 			collection_id: CollectionId,
			// 			color: values.color,
			// 			size: values.size,
			// 			weight: parseFloat(values.weight),
			// 			material: values.material,
			// 			usage: values.usage,
			// 			quality: values.quality,
			// 			manufacturer: values.manufacturer,
			// 			origin_country: values.origin_country,
			// 			name: parsedData.name,
			// 			brand_name: parsedData.brand_name,
			// 			category: { data: parsedData.category },
			// 			description: parsedData.description,
			// 			price: parseFloat(parsedData.price),
			// 			quantity: parseInt(parsedData.quantity),
			// 			royality: parseInt(parsedData.royality),
			// 			product_info: parsedData.product_info,
			// 			image: parsedData.image,
			// 			contract_address:PhygitalAddress,
			// 		}),
			// 	})

				if (formData.length > 0) {
					const variantData = formData.map((item: FormDataEntry) => ({
						variant: item.title.toUpperCase() || '',
						description: item.description || '',
					}))
					// localStorage.setItem("variantData", JSON.stringify(variantData));
					const variantDataString = JSON.stringify(variantData);
					localStorage.setItem('variantData', variantDataString);
					// const variantId = uuidv4()
					// await fetch(`${apiUrl}/variants`, {
					// 	method: 'POST',
					// 	headers: {
					// 		'Content-Type': 'application/json',
					// 	},
					// 	body: JSON.stringify({
					// 		id: variantId,
					// 		phygital_id: phygitalId,
					// 		variantData,
					// 	}),
					// })
				}

					// toast.success('Deploy Successful', {
					// 	position: 'top-left',
					// })
					router.push('/create-avatar')
			// 	}
			// } else {
			// 	toast.warning('Failed to create phygital data', {
			// 		position: 'top-left',
			// 	})
			// }
		} catch (error) {
			console.error(error)
			toast.error('An error occurred while creating phygital data', {
				position: 'top-left',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Navbar />
			<ToastContainer />
			<main className='min-h-screen'>
				<div className='px-16 py-8 border-b text-black border-black'>
					<h1 className='font-bold uppercase text-3xl mb-4'>
						Additional details
					</h1>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='py-4 px-32 flex flex-col gap-12'>
							<FormField
								name='color'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xl mb-6'>Colours*</FormLabel>
										<FormDescription>
											Ensure to use a comma after each colour
										</FormDescription>
										<FormControl>
											<Input
												className='border-0 bg-[#0000001A] rounded'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex gap-8'>
								<FormField
									name='size'
									control={form.control}
									render={({ field }) => (
										<FormItem className='basis-[70%]'>
											<FormLabel className='text-xl mb-6'>Size* </FormLabel>
											<FormControl>
												<Input
													className='border-0 bg-[#0000001A] rounded'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name='weight'
									control={form.control}
									render={({ field }) => (
										<FormItem className='basis-[30%]'>
											<FormLabel className='text-xl mb-6'>Weight*</FormLabel>
											<div className='flex gap-2'>
												<FormControl>
													<Input
														className='border-0 bg-[#0000001A] rounded'
														{...field}
													/>
												</FormControl>

												<span>Kg</span>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								name='usage'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xl mb-6'>Usage</FormLabel>
										<FormControl>
											<Input
												className='border-0 bg-[#0000001A] rounded w-2/5'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								<Label className='text-xl mb-6 flex items-center'>
									Variants <PlusIcon />
								</Label>
								<FormRepeater
									initialValues={[{ title: '', description: '' }]}
									onChange={handleFormChange}
								>
									<Input type='text' name='title' placeholder='title' />
									<Input
										type='text'
										name='description'
										placeholder='description'
									/>
								</FormRepeater>
							</div>
							<FormField
								name='material'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xl mb-6'>Material</FormLabel>
										<FormControl>
											<Input
												className='border-0 bg-[#0000001A] rounded w-2/5'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name='quality'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<Label className='text-xl font-semibold mb-4'>
											Unique Qualities
										</Label>
										<FormControl>
											<Textarea
												className='border-0 bg-[#0000001A]'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex gap-4'>
								<FormField
									name='manufacturer'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xl mb-6'>
												Manufacturer *
											</FormLabel>
											<FormControl>
												<Input
													className='border-0 bg-[#0000001A] rounded'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									name='origin_country'
									control={form.control}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xl mb-6'>Made In *</FormLabel>
											<FormControl>
												<Input
													className='border-0 bg-[#0000001A] rounded'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<h3 className='text-2xl'>
									Create WebXR experience with unique AI avatars*
								</h3>
								<p className='mt-4'>
									Choose yes if you want to create AI-powered brand ambassadors
									that interact with your customers.
								</p>
							</div>

							<div>
								<Button
									type='submit'
									className='bg-[#30D8FF] rounded-full hover:text-white text-black'
								>
									{loading ? 'loading' : 'Next'}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</main>
		</>
	)
}
