import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const GET_BARANG = gql`
  query GetBarang {
    tbl_barang {
      id
      nama
      jenis
      jumlah
    }
  }
`;

const ADD_BARANG = gql`
  mutation AddBarang($nama: String!, $jenis: String!, $jumlah: Int!) {
    insert_tbl_barang(
      objects: { nama: $nama, jenis: $jenis, jumlah: $jumlah }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_BARANG = gql`
  mutation UpdateBarang(
    $id: Int!
    $nama: String!
    $jenis: String!
    $jumlah: Int!
  ) {
    update_tbl_barang_by_pk(
      pk_columns: { id: $id }
      _set: { nama: $nama, jenis: $jenis, jumlah: $jumlah }
    ) {
      id
      nama
      jenis
      jumlah
    }
  }
`;

const DELETE_BARANG = gql`
  mutation DeleteBarang($id: Int!) {
    delete_tbl_barang_by_pk(id: $id) {
      id
    }
  }
`;
const Stok = () => {
  const { loading, error, data } = useQuery(GET_BARANG);
  const [updateId, setUpdateId] = useState(null);
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [addBarang] = useMutation(ADD_BARANG);
  const [updateBarang] = useMutation(UPDATE_BARANG);
  const [deleteBarang] = useMutation(DELETE_BARANG);

  const handleDelete = (id) => {
    deleteBarang({ variables: { id } });
  };

  const handleAddOrUpdateBarang = (e) => {
    e.preventDefault();

    if (updateId) {
      // Update barang
      updateBarang({
        variables: {
          id: updateId,
          nama,
          jenis,
          jumlah: parseInt(jumlah),
        },
      })
        .then(() => {
          setUpdateId(null);
          setNama("");
          setJenis("");
          setJumlah("");
        })
        .catch((error) => {
          console.error("Error updating barang:", error);
        });
    } else {
      // Add barang
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
    }
  };

  const handleUpdateBarang = (id) => {
    const barangToUpdate = data.tbl_barang.find((barang) => barang.id === id);
    setUpdateId(id);
    setNama(barangToUpdate.nama);
    setJenis(barangToUpdate.jenis);
    setJumlah(barangToUpdate.jumlah.toString());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <div className="flex items-center">
        <div className="w-1/2 m-10">
          <table className="w-full mx-auto text-center p-4 bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  No
                </th>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  Nama Barang
                </th>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  Jenis Barang
                </th>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  Jumlah Barang
                </th>
                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.tbl_barang.map((barang, index) => (
                <tr key={barang.id} className="text-gray-700">
                  <td className="border-b-2 p-4 dark:border-dark-5">
                    {index + 1}
                  </td>
                  <td className="border-b-2 p-4 dark:border-dark-5">
                    {barang.nama}
                  </td>
                  <td className="border-b-2 p-4 dark:border-dark-5">
                    {barang.jenis}
                  </td>
                  <td className="border-b-2 p-4 dark:border-dark-5">
                    {barang.jumlah}
                  </td>
                  <td className="border-b-2 p-4 dark:border-dark-5">
                    <button
                      onClick={() => handleDelete(barang.id)}
                      className="text-pink-400 hover:text-cyan-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdateBarang(barang.id)}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 ms-10">
          <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow">
            <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
              Form Daftar Barang
            </div>

            <div className="mt-8">
              <form onSubmit={handleAddOrUpdateBarang} autoComplete="off">
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
                    {updateId ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stok;
