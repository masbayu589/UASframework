import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLazyQuery, gql } from "@apollo/client";

const GET_TOTAL_BARANG = gql`
  query GetTotalBarang {
    tbl_barang_aggregate {
      aggregate {
        count
      }
    }
  }
`;

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

function Total() {
  const [jumlahBarang, setJumlahBarang] = useState(0);

  const [fetchJumlahBarang, { data: totalData }] = useLazyQuery(GET_TOTAL_BARANG, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const count = data.tbl_barang_aggregate.aggregate.count;
      setJumlahBarang(count);
    },
  });

  useEffect(() => {
    fetchJumlahBarang();
  }, [fetchJumlahBarang]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://databasebarang.hasura.app/v1/graphql",
          {
            query: GET_BARANG,
          }
        );
        console.log(response.data.data.tbl_barang);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container h-96">
      <Navbar />

      <div className="h-full mt-28 flex items-center justify-center space-x-2">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C6.48 3 2 7.48 2 12C2 16.42 6.48 20.9 11 20.9C15.52 20.9 20 16.42 20 12C20 7.48 15.52 3 12 3ZM11 17H13V15H11V17ZM11 13H13V7H11V13Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            Total Ketersediaan Barang
          </h3>
          <p className="text-sm text-gray-500">
            {jumlahBarang} barang tersedia
          </p>
        </div>
      </div>
    </div>
  );
}

export default Total;
