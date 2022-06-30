import React from "react";
import Product from "./Product";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
import CartListItem from "./CartListItem";

const CartList = () => {
  const { cartItems, loading } = useGlobalContext();
  
  if (loading) {
    return <Loading />;
  }
  if (cartItems.length < 1) {
    return <h2>No products to show</h2>;
  }
  return (
    <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
                {cartItems.map((item) => {
                    return <CartListItem key={item.id} {...item} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default CartList;
