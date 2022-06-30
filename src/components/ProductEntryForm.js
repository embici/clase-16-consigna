import React, { useReducer, useState, useEffect } from "react";
import Loading from './Loading';
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom';

const url = "/api/productos/";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.id]: event.target.value,
  };
};

const defaultValues = {
    ["productName"]: "Product Name",
    ["colors"]: "black",
    ["category"]: "pc",
    ["price"]: 0,
}

const ProductEntryForm = () => {
  const [dataForm, setDataForm] = useReducer(formReducer, defaultValues);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const {forceUpdate, setForceUpdate} = useGlobalContext();
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    postProduct(
      dataForm.productName,
      dataForm.colors,
      dataForm.category,
      dataForm.price
    );
    event.preventDefault();
    navigate('/');
  };

  useEffect(()=>{
    console.log('Entry FORM Use Effect')
    dataForm["productName"] = defaultValues.productName;
    dataForm["colors"] = defaultValues.color;
    dataForm["category"] = defaultValues.category;
    dataForm["price"] = defaultValues.price;
  }, [])
      
  const postProduct = async (name, color, category, price) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          isadmin: "true",
        },
        body: JSON.stringify({
          "name": name,
          "price": price,
          "color": color,
          "category": category,
        }),
      });
      const data = await response.json();
      setProduct(data)
      setLoading(false);
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="productEntry">
      <div className="py-1">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="mb-6">
        <h2>Product Entry</h2>
      </div>
      <div className="mb-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="productName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={setDataForm}
              value={dataForm["productName"]}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="colors"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Select a Color
            </label>
            <select
              id="colors"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={setDataForm}
              defaultValue={dataForm["colors"]}
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="white">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="pink">Pink</option>
              <option value="gray">Gray</option>
              <option value="brown">Brown</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Select a Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={setDataForm}
              defaultValue={dataForm["category"]}
            >
              <option value="laptop">Laptop</option>
              <option value="pc">PC</option>
              <option value="accesories">Accesories</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={setDataForm}
              value={dataForm["price"]}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEntryForm;
