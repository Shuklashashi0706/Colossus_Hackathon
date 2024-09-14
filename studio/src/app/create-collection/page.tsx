'use client'
import { useState, useEffect, ChangeEvent, useRef } from 'react'
import {
    Button,
    Input,
    Checkbox,
    Label,
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
// import { UploadButton } from '@/utils/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAccount, useChainId, useWalletClient } from 'wagmi'
import { NFTStorage } from 'nft.storage'
import { Hex, createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'
import axios from 'axios'

import Simplestore from "@/lib/Simplestore.json"
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.NEXT_PUBLIC_STORAGE_API!
const client = new NFTStorage({ token: API_KEY })

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Brand name must be at least 2 characters',
    }),
    description: z
        .string()
        .min(2, { message: 'Brand description must be at least 2 characters' })
        .max(1000, {
            message: 'Brand description should be less than 1000 words',
        }),
    logo_image: z.string(),
    cover_image: z.string(),
    chaintype_id : z.string(),
    category: z
        .array(z.string()),
        // .refine((value) => value.some((item) => item), {
        //     message: 'You have to select at least one category.',
        // }),
})


const items = [
	{
		id: 'fashion',
		label: 'Fashion',
	},
	{
		id: 'home & decor',
		label: 'Home & Decor',
	},
	{
		id: 'sustainable goods',
		label: 'Sustainable goods',
	},
	{
		id: 'collectibles',
		label: 'Collectibles',
	},
	{
		id: 'functional items',
		label: 'Functional items',
	},
	{
		id: 'tech enabled',
		label: 'Tech enabled',
	},
	{
		id: 'art & photography',
		label: 'Art & Photography',
	},
	{
		id: 'luxury goods',
		label: 'Luxury goods',
	},
	{
		id: 'music lovers',
		label: 'Music lovers',
	},
]

export default function CreateCollection() {
    const { address: walletAddress } = useAccount()
    const [contractAddress, setContractAddress] = useState<
        `0x${string}` | undefined
    >()

    const [file, setFile] = useState<File | null>(null);
    const [cid, setCid] = useState("");
    const [cidCover, setCidCover] = useState("");
    const [uploading, setUploading] = useState(false);

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

    const account = useAccount()
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState<string>('')
	const [coverImageUrl, setCoverImageUrl] = useState<string>('')
    const [preview, setPreview] = useState<boolean>(false)
	const [previewCover, setCoverPreview] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [imageError, setImageError] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            logo_image: '',
            cover_image: '',
            chaintype_id:'',
            category:[],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!account.addresses) {
            toast.warning('Connect your wallet')
        } else {
            if (!cid) {
                setImageError(true)
            }

            try {
                values.logo_image = "ipfs://" + cid
                values.cover_image = "ipfs://" + cidCover 
                localStorage.setItem('collection_name', values.name)
                console.log(values)

                if (cid !== '') {
                    setLoading(true)
                    const collectionId = uuidv4()
                    const chaintype = localStorage.getItem("BaseSepoliaChain");
                    const BrandId= localStorage.getItem("BrandId");
                    const response = await fetch(`${apiUrl}/collections`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: collectionId,
                            brand_id: BrandId,
                            name: values.name,
                            category: { data: values.category },
                            description: values.description,
                            logo_image: values.logo_image,
                            cover_image: values.cover_image,
                            chaintype_id: chaintype
                        }),
                    })

					const collection = await response.json(); 
                    localStorage.setItem("CollectionId", collection.id);

                    if (response.status === 200) {
                        router.push(
                            `/collection-congratulation`
                        )
                    }
                } else if (!imageError && imageUrl === '') {
                    toast.warning('Wait for your image to finish upload')
                }
            } catch (error) {
                console.log(error)
                toast.warning('Failed to create Collections')
                setLoading(false)
            }
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
                        Create your Collection
                    </h1>
                    <p>Fill out the details for creating your Colection</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='py-4 px-32 flex flex-col gap-12'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-xl font-semibold mb-4'>
                                            Collection Name*
                                        </FormLabel>
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
                                name='description'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-xl font-semibold mb-4'>
                                            Collection Description*
                                        </FormLabel>
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

                            <div className='flex gap-12'>
                                <div>
                                    <h3 className='text-2xl'>Upload Image*</h3>
                                    <div className='border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6'>
                                        <UploadIcon />
                                        <p>Drag file here to upload. Choose file </p>
                                        <p>Recommeded size 512 x 512 px</p>
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
                                        <p className='text-red-700'>You have to upload a logo</p>
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
                            <div className='flex gap-12'>
                                <div>
                                    <h3 className='text-2xl'>Upload Cover Image*</h3>
                                    <div className='border border-dashed border-black h-60 w-[32rem] flex flex-col items-center justify-center p-6'>
                                        <UploadIcon />
                                        <p>Drag file here to upload. Choose file </p>
                                        <p>Recommeded size 1920 x 972 px</p>
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
                                    {imageError && (
                                        <p className='text-red-700'>You have to upload a Image</p>
                                    )}
                                </div>
                                <div>
                                    <h3 className='text-2xl'>Preview</h3>
                                    {cidCover ? (
                                        <img
                                            // src={cid}
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
                            <Label className='text-xl'>
									Categories
									<span className='text-[#757575] text-base'>
										Choose all that apply <Checkbox checked={true} />
									</span>
								</Label>
                            <FormField
									control={form.control}
									name='category'
									render={() => (
										<FormItem className='flex justify-between flex-wrap'>
											{items.map((item) => (
												<FormField
													key={item.id}
													control={form.control}
													name='category'
													render={({ field }) => {
														return (
															<FormItem
																key={item.id}
																className='flex items-baseline space-x-3 space-y-6 basis-[30%]'
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(item.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																					...field.value,
																					item.id,
																				])
																				: field.onChange(
																					field.value?.filter(
																						(value: any) => value !== item.id
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

                            <Button
                                type='submit'
                                className='w-fit bg-[#30D8FF] text-black hover:text-white rounded-full'
                            >
                                {loading ? 'loading...' : 'Launch Collection'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>
        </>
    )
}
