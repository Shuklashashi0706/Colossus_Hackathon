import React from 'react';

const CreateBanner = () => {
  return (
    <div
      className="relative w-full"
      style={{
        backgroundImage: 'url("./Rectangle 39472.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
      }}
    >
      <img
        src="./image 18.png"
        alt="Left Mid"
        style={{
          position: "absolute",
          top: "50%",
          left: "100px",
          transform: "translateY(-50%)",
          width: "350px",
          height: "350px",
        }}
      />
      <img
        src="./image 17.png"
        alt="Right Mid"
        style={{
          position: "absolute",
          top: "50%",
          right: "100px",
          transform: "translateY(-50%)",
          width: "350px",
          height: "350px",
        }}
      />

      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "black", // Adjust color as needed
        }}
      >
        <h1 className="text-6xl">Create Your Own?</h1>
        <button
          className="rounded"
          style={{
            background: "transparent",
            border: "6px solid transparent",
            borderRadius: "8px",
            backgroundImage: `
              linear-gradient(white, white),
              linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
            `,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            WebkitBackgroundClip: "content-box, border-box", // For Safari
            color: "black", // Adjust text color to match your design
            cursor: "pointer",
            fontSize: "1.1rem",
            width: "150px",
            height: '50px', // Set fixed width for the button
            display: "block",
            margin: "20px auto", // Center the button
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default CreateBanner;
