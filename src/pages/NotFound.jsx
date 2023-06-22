import React from "react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div>
    
      <div class="relative h-screen overflow-hidden bg-indigo-900">
        <img
          src="https://images.unsplash.com/photo-1530906622963-8a60586a49c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMGdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          class="absolute object-cover w-full h-full"
        />
        <div class="absolute inset-0 bg-black opacity-25"></div>
        <div class="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
          <div class="relative z-10 flex flex-col items-center w-full font-mono">
            <h1 class="mt-4 text-5xl font-extrabold leading-tight text-center text-white">
              You&#x27;re alone here
            </h1>
            <p class="font-extrabold text-white text-8xl my-44 animate-bounce">
              404
            </p>
          </div>  
        </div>
      </div>
    </div>
  );
};

export default NotFound;
