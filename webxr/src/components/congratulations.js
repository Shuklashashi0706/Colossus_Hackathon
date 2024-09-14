import React from 'react'
import Link from 'next/link'

const Congratulations = () => {
	return (
		<div>
			<div
				style={{
					//   backgroundColor: "#FFFFFFB2",
					background: 'blue',
					display: 'flex',
					overflowY: 'auto',
					overflowX: 'hidden',
					position: 'fixed',
					inset: 0,
					zIndex: 50,
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					maxHeight: 'fit-content',
				}}
				id='popupmodal'
			>
				<div
					style={{
						position: 'relative',
						padding: '16px',
						width: '100%',
						maxWidth: '32rem',
						maxHeight: '100%',
					}}
				>
					<div
						style={{
							position: 'relative',
							borderRadius: '0.5rem',
							boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)',
							color: 'black',
							background: 'white',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
								padding: '16px',
								borderRadius: '20px',
								borderColor: '#4B5563',
							}}
						>
							{/* Add any additional content or buttons here */}
						</div>

						<div style={{ padding: '16px', spaceY: '16px' }}>
							<p
								style={{
									backgroundImage: 'linear-gradient(90deg, #30D8FF, #5B0292)',
									WebkitBackgroundClip: 'text',
									backgroundClip: 'text',
									color: 'transparent',
									paddingBottom: '10px',
									fontSize: '2.5rem',
									textAlign: 'center',
									fontWeight: 'bold',
								}}
							>
								Congratulations!
							</p>
							<p
								style={{
									fontSize: '1.2rem',
									textAlign: 'center',
									paddingTop: '40px',
								}}
							>
								You have successfully created your avatar.
							</p>
							<p
								style={{
									fontSize: '1.2rem',
									textAlign: 'center',
									paddingTop: '10px',
								}}
							>
								Download your avatar (png)
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								paddingTop: '20px',
								paddingBottom: '60px',
							}}
						>
							<Link
								href=''
								type='button'
								style={{
									width: '50%',
									marginLeft: 'auto',
									marginRight: 'auto',
									color: 'black',
									// fontWeight: "600",
									focusRing: '4px',
									outline: 'none',
									borderRadius: '30rem',
									fontSize: '1.2rem',
									padding: '10px 20px',
									textAlign: 'center',
									backgroundColor: '#30D8FF',
								}}
							>
								Go back to Studio
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
