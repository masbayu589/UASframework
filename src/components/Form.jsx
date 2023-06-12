import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const ADD_BARANG = gql`
  mutation AddBarang($nama: String!, $jenis: String!, $jumlah: Int!) {
    insert_tbl_barang(objects: { nama: $nama, jenis: $jenis, jumlah: $jumlah }) {
      affected_rows
    }
  }
`;

const Form = () => {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [addBarang] = useMutation(ADD_BARANG);

  const handleAddBarang = (e) => {
    e.preventDefault();
    addBarang({
      variables: {
        nama,
        jenis,
        jumlah: parseInt(jumlah),
      },
    })
      .then(() => {
        setNama("");
        setJenis("");
        setJumlah("");
      })
      .catch((error) => {
        console.error("Error adding barang:", error);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Form Daftar Barang
        </div>

        <div className="mt-8">
          <form onSubmit={handleAddBarang} autoComplete="off">
            <div className="flex flex-col mb-2">
              <div className="flex relative">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  Nama
                </span>
                <input
                  type="text"
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  Jumlah
                </span>
                <input
                  type="number"
                  id="jumlah"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  required
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                  Jenis
                </span>
                <input
                  type="text"
                  id="jenis"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  required
                  className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default Form;
