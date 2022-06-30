import React, { useReducer, useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useGlobalContext } from '../context'

const Home = () => {
  const url = '/api/productos/';
  const urlCart = "/api/carrito/";
  const {forceUpdate, setForceUpdate, products, createCart, cartID} = useGlobalContext();

  const deleteLastProduct = async () => {
    try {
      console.log('Home Products before deleting', products);
      const id = products[products.length-1].id;
      const response = await fetch(`${url}${id}`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          isadmin: "true",
        }
      });
      const data = await response.json();
      console.log(data);
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    console.log('HOME Use Effect');
    console.log('Home Products', products);
  }, [])

  const deleteProductClick = (event) => {
    event.preventDefault();
    deleteLastProduct()
  };


  const createCartClick = (event) => {
    event.preventDefault();
    createCart()
  };


  return (
    <div className="container mx-auto">
      <div className="flex flex-row ">
        <Link type="button" to='/product/2/edit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Product 2</Link>
        <Link type="button" to='/product/new' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Product</Link>
        <Link type="button" to='/product/new' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={deleteProductClick}>Delete last product</Link>
      </div>
      <div className="container mx-auto">
       {!cartID && <Link type="button" to='/product/2/edit' className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={createCartClick}>Create Cart</Link>}
      </div>
      <ProductList/>
    </div>
  )
}

export default Home
