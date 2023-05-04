import { Inter } from "next/font/google";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/layout";
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState(" ");
  const [filterProducts, setFilterProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
    setProduct(res.data);
    setFilterProducts(res.data);
  };

  const notify = () => {
    toast.warn("Edit successfully !", {
      theme: "colored",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const notify1 = () => {
    toast.error("Delete successfully !", {
      theme: "colored",
      autoClose: 1000,
      position: "bottom-right"
    });
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
    },
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.images}
          width={70}
          height={70}
          style={{ borderRadius: "10px", margin: "10px" }}
        />
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <button className="btn btn-primary" onClick={notify}>
          Edit
        </button>
      )
    },
    {
      selector: (row) => (
        <button className="btn btn-danger" onClick={notify1}>
          Delete
        </button>
      )
    }
    
  ];

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const result = product.filter((products) => {
      return products.title.toLowerCase().match(search.toLowerCase());
    });
    setFilterProducts(result);
  }, [search]);

  return (
    <Layout className="bg-white">
      <main className="container">
        <h1> Products Collection - Table</h1>
        <DataTable
          title="All Products Listing"
          columns={columns}
          data={filterProducts}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search Here"
              className="form-control w-25"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
        <ToastContainer />
      </main>
    </Layout>
  );
}
