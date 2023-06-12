import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
        <Navbar/>
      <div class="relative h-screen overflow-hidden bg-indigo-900">
        <img
          src="https://images.unsplash.com/photo-1590496794008-383c8070b257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhcmVob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          class="absolute object-cover w-full h-full"
        />
        <div class="absolute inset-0 bg-black opacity-25"></div>
        <header class="absolute top-0 left-0 right-0 z-20">
          <nav class="container px-6 py-4 mx-auto md:px-12">
            <div class="items-center justify-between md:flex">
              <div class="flex items-center justify-between">
                <div class="md:hidden">
                  <button class="text-white focus:outline-none">
                    <svg
                      class="w-12 h-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6H20M4 12H20M4 18H20"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div class="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
          <div class="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
            <span class="font-bold text-yellow-400 uppercase">Barang Kami</span>
            <h1 class="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl">
              Lihat Stok barang makin praktis
              <br />
              di Barang Kami
            </h1>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
