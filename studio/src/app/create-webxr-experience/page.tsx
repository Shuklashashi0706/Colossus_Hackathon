'use client'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import {
	Button,
	Checkbox,
	Input,
	Navbar,
	PreviewIcon,
	Textarea,
	UploadIcon,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
// import { UploadButton } from '@/utils/uploadthing'
import { Avatar } from '@readyplayerme/visage'
import { NFTStorage } from 'nft.storage'
import { v4 as uuidv4 } from 'uuid';
const API_KEY = process.env.NEXT_PUBLIC_STORAGE_API!
const client = new NFTStorage({ token: API_KEY })

const formSchema = z.object({
	image360: z.string(),
	customizations: z
		.array(z.string()),
	// .refine((value) => value.some((item) => item))
	// .optional(),
	free_nft_image: z.string(),
	gold_reward: z.string().min(1, { message: 'Gold reward must be provided' }),
	silver_reward: z
		.string()
		.min(1, { message: 'Silver reward must be provided' }),
	bronze_reward: z
		.string()
		.min(1, { message: 'Bronze reward must be provided' }),
	avatar_voice: z.string(),
})

const items = [
	{
		id: 'gender',
		label: 'Gender',
	},
	{
		id: 'face',
		label: 'Face',
	},
	{
		id: 'skin color',
		label: 'Skin color',
	},
	{
		id: 'hair',
		label: 'Hair',
	},
	{
		id: 'clothing',
		label: 'Clothing',
	},
	{
		id: 'accessories',
		label: 'Accessories',
	},
	{
		id: 'animations',
		label: 'Animations',
	},
]

export default function CreateWebxrExperience() {

	const [file, setFile] = useState<File | null>(null);
	const [cid, setCid] = useState("");
	const [cidCover, setCidCover] = useState("");
	const [uploading, setUploading] = useState(false);
	const [avatarVoice, setAvatarVoice] = useState<string>('');

	const inputFile = useRef(null);
	const uploadFile = async (fileToUpload: string | Blob) => {
		try {
			setUploading(true);
			const data = new FormData();
			data.set("file", fileToUpload);
			const res = await fetch("/api/files", {
				method: "POST",
				body: data,
			});
			const resData = await res.json();
			setCid(resData.IpfsHash);
			toast.success('Upload Completed!', {
				position: 'top-left',
			})
			console.log(resData.IpfsHash);
			setUploading(false);
		} catch (e) {
			console.log(e);
			setUploading(false);
			alert("Trouble uploading file");
		}
	};
	const uploadCoverFile = async (fileToUpload: string | Blob) => {
		try {
			setUploading(true);
			const data = new FormData();
			data.set("file", fileToUpload);
			const res = await fetch("/api/files", {
				method: "POST",
				body: data,
			});
			const resData = await res.json();
			setCidCover(resData.IpfsHash);
			toast.success('Upload Completed!', {
				position: 'top-left',
			})
			console.log(resData.IpfsHash);
			setUploading(false);
		} catch (e) {
			console.log(e);
			setUploading(false);
			alert("Trouble uploading file");
		}
	};
	const apiUrl = process.env.NEXT_PUBLIC_URI;

	const router = useRouter()
	const [imageUrl, setImageUrl] = useState<string>('')
	const [freeImageUrl, setFreeImageUrl] = useState<string>('')
	const [preview, setPreview] = useState<boolean>(false)
	const [freePreview, setFreePreview] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [imageError, setImageError] = useState<boolean>(false)

	const getPhy = () => {
		if (typeof window !== 'undefined' && localStorage) {
			return localStorage.getItem('phygitalData')
		}
	}
	const getAvatar = () => {
		if (typeof window !== 'undefined' && localStorage) {
			return localStorage.getItem('avatar')
		}
	}

	const getPhygitalId = () => {
		if (typeof window !== 'undefined' && localStorage) {
			return localStorage.getItem('PhygitalId')
		}
	}

	const storedData = getAvatar() ?? '{}'
	const phygital = getPhy() ?? '{}'
	const PhygitalId = getPhygitalId() ?? '{}'

	const parsedData = JSON.parse(storedData)
	const phygitalName = JSON.parse(phygital).phygitalName

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			image360: '',
			customizations: [],
			free_nft_image: '',
			gold_reward: '',
			silver_reward: '',
			bronze_reward: '',
			avatar_voice: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(parsedData)
		console.log(phygitalName)

		if (!cid) {
			setImageError(true)
		}
		try {
			values.image360 = "ipfs://" + cid
			values.free_nft_image = "ipfs://" + cidCover
			values.avatar_voice = avatarVoice;
			localStorage.setItem('webxrData', JSON.stringify(values))

			console.log(values)

			if (cid !== '') {
				setLoading(true)
				// const brandId = uuidv4()
				// const webxr = await fetch(`${apiUrl}/webxr`, {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify({
				// 		id: brandId,
				// 		phygitalName,
				// 		phygital_id: PhygitalId,
				// 		image360: values.image360,
				// 		free_nft_image: values.free_nft_image,
				// 		gold_reward: values.gold_reward,
				// 		silver_reward: values.silver_reward,
				// 		bronze_reward: values.bronze_reward,
				// 		customizations: { data:values.customizations },
				// 	}),
				// })

				// const walletAddress = localStorage.getItem("walletAddress");
				// await fetch(`${apiUrl}/avatars`, {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify({
				// 		id: brandId,
				// 		phygital_id: PhygitalId,
				// 		user_id:walletAddress,
				// 		...parsedData,
				// 	}),
				// })

				// if (webxr.status === 200) {
				router.push('/review')
				// }
			}
		} catch (error) {
			console.log(error)
			toast.warning('Failed to create WebXR experience')
			setLoading(false)
		}
	}

	const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFile(files[0]);
			uploadFile(files[0]);
		}
	};

	const uploadCover = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFile(files[0]);
			uploadCoverFile(files[0]);
		}
	}

	const removePrefix = (uri: any) => {
		return uri.substring(7, uri.length)
	}

	return (
		<>
			<Navbar />
			<ToastContainer />
			<main className='min-h-screen'>
				<div className='px-16 py-8 border-b text-black border-black'>
					<h1 className='font-bold uppercase text-3xl mb-4'>
						Create WebXR experience
					</h1>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='py-4 px-32 flex flex-col gap-12'>
							<div className='flex justify-between items-center'>
								<h3 className='text-xl'>
									Congratulations on creating your avatar! You can now complete
									your WebXR experience.
								</h3>
								<div>
									<h3 className='text-xl'>Avatar preview</h3>
									{parsedData.url ? (
										<Avatar
											modelSrc={parsedData.url}
											cameraInitialDistance={1.5}
										/>
									) : (
										<h2 className='text-2xl flex-col flex items-center '>
											<span>Avatar</span> <span>image</span> <span>here</span>
										</h2>
									)}
								</div>
							</div>
							<div className='flex gap-12'>
								<div>
									<h3 className='text-2xl'>Upload 360 Image Background*</h3>
									<div className='border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6'>
										<UploadIcon />
										<p>Drag file here to upload. Choose file </p>
										<p>Recommended size 4096 x 2048 px. Max file size 4MB</p>
										<div>
											<label
												htmlFor='upload'
												className='flex flex-row items-center ml-12 cursor-pointer mt-4'
											>
												<input
													id='upload'
													type='file'
													className='hidden'
													ref={inputFile}
													onChange={uploadImage}
													accept='image/*'
												/>
												<img
													src='https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344393.jpg'
													alt=''
													className='w-10 h-10'
												/>
												<div className='text-white ml-1'>Replace</div>
											</label>
										</div>
									</div>
									{imageError && (
										<p className='text-red-700'>You have to upload an image</p>
									)}
								</div>
								<div>
									<h3 className='text-2xl'>Preview</h3>
									{cid ? (
										<img
											// src={cid}
											src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
											alt='preview image'
											height={250}
											width={350}
										/>
									) : (
										<div className='border border-[#D9D8D8] h-60 w-80 flex flex-col items-center justify-center p-6'>
											<PreviewIcon />
											<p>Preview after upload</p>
										</div>
									)}
								</div>
							</div>
							<div>
								<h3 className='text-2xl'>Choose Avatar Voice*</h3>
								<div className='mt-6 ml-10'>
									<label className="inline-flex items-center mr-4">
										<input
											type="radio"
											className="form-radio text-purple-600"
											name="avatarVoice"
											value="Denise"
											checked={avatarVoice === 'Denise'}
											onChange={(e) => setAvatarVoice(e.target.value)}
											style={{ transform: 'scale(1.5)' }}
										/>
										<span className="ml-2 text-lg">Denise</span>
									</label>
									<label className="inline-flex items-center ml-80">
										<input
											type="radio"
											className="form-radio text-purple-600"
											name="avatarVoice"
											value="Richard"
											checked={avatarVoice === 'Richard'}
											onChange={(e) => setAvatarVoice(e.target.value)}
											style={{ transform: 'scale(1.5)' }}
										/>
										<span className="ml-2 text-lg">Richard</span>
									</label>
								</div>
							</div>
							<div className='flex gap-12 flex-col p-4 border-[#30D8FF] border rounded'>
								<div className='flex gap-4'>
									<h3 className='text-xl'>
										Choose available customizations options for the avatars
									</h3>
									<span>Choose all that apply</span>
									<Checkbox />
								</div>
								<FormField
									control={form.control}
									name='customizations'
									render={() => (
										<FormItem className='flex justify-between mt-8 flex-wrap'>
											{items.map((item) => (
												<FormField
													key={item.id}
													control={form.control}
													name='customizations'
													render={({ field }) => {
														return (
															<FormItem
																key={item.id}
																className='flex items-baseline space-x-3 space-y-6 basis-[20%]'
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(item.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																					...field.value!,
																					item.id,
																				])
																				: field.onChange(
																					field.value?.filter(
																						(value) => value !== item.id
																					)
																				)
																		}}
																	/>
																</FormControl>
																<FormLabel className='font-normal'>
																	{item.label}
																</FormLabel>
															</FormItem>
														)
													}}
												/>
											))}
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex gap-12 flex-col'>
								<h3 className='text-xl'>
									Give Free NFTs to users who interact with your avatar
								</h3>
								<p>
									Choose this option if you want your avatars to compete on the
									leaderboard for increased visibility and weekly rewards.
								</p>
							</div>
							<div className='flex gap-12 p-4 border-[#30D8FF] border rounded'>
								<div>
									<h3 className='text-2xl'>Upload free NFT image</h3>
									<p>
										You can upload anything. We recommend uploading an image of
										your avatar in your background.
									</p>
									<div className='border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6'>
										<UploadIcon />
										<p>Drag file here to upload. Choose file </p>
										<p>Recommeded size 512 x 512 px</p>
										<div>
											<label
												htmlFor='uploadCover'
												className='flex flex-row items-center ml-12 cursor-pointer mt-4'
											>
												<input
													id='uploadCover'
													type='file'
													className='hidden'
													ref={inputFile}
													onChange={uploadCover}
													accept='image/*'
												/>
												<img
													src='https://png.pngtree.com/element_our/20190601/ourmid/pngtree-file-upload-icon-image_1344393.jpg'
													alt=''
													className='w-10 h-10'
												/>
												<div className='text-white ml-1'>Replace</div>
											</label>
										</div>
									</div>
								</div>
								<div>
									<h3 className='text-2xl'>Preview</h3>
									{cidCover ? (
										<img
											src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cidCover}`}
											alt='preview image'
											height={250}
											width={350}
										/>
									) : (
										<div className='border border-[#D9D8D8] h-60 w-80 flex flex-col items-center justify-center p-6'>
											<PreviewIcon />
											<p>Preview after upload</p>
										</div>
									)}
								</div>
							</div>
							<div>
								<h3 className='text-2xl'>
									Set weekly profit rewards given for the NFT owner and
									supporters if your avatar reaches the avatar leaderboard top
									3*.
									<span>Most users opt for 1-5%</span>
								</h3>
								<div className='flex items-center justify-between'>
									<FormField
										name='gold_reward'
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xl mb-6'>Gold</FormLabel>
												<div className='flex gap-2'>
													<FormControl>
														<Input
															className='border-0 bg-[#0000001A] rounded'
															{...field}
														/>
													</FormControl>
													<span>%</span>
												</div>
											</FormItem>
										)}
									/>
									<FormField
										name='silver_reward'
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xl mb-6'>Silver</FormLabel>
												<div className='flex gap-2'>
													<FormControl>
														<Input
															className='border-0 bg-[#0000001A] rounded'
															{...field}
														/>
													</FormControl>
													<span>%</span>
												</div>
											</FormItem>
										)}
									/>
									<FormField
										name='bronze_reward'
										control={form.control}
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xl mb-6'>Bronze</FormLabel>
												<div className='flex gap-2'>
													<FormControl>
														<Input
															className='border-0 bg-[#0000001A] rounded'
															{...field}
														/>
													</FormControl>
													<span>%</span>
												</div>
											</FormItem>
										)}
									/>
								</div>
							</div>
							<Button className='bg-[#30D8FF] rounded-full hover:text-white text-black'>
								{loading ? 'loading ' : 'Review phygital & WebXR'}
							</Button>
						</div>
					</form>
				</Form>
			</main>
		</>
	)
}
