import React from "react";
import { useGlobalContext } from '../context'

const CartListItem = ({name, price, color, category, stock, id}) => {
  const {cartID, forceUpdate, setForceUpdate} = useGlobalContext();  
  const cartUrl = '/api/carrito/';

  const removeItemFromCart = async () =>{
    const response = await fetch(`${cartUrl}${cartID}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        isadmin: "true",
      }
    });
    const data = await response.json();
    setForceUpdate(!forceUpdate);
    console.log("Removed from cart", data)
  }

  const removeItemClick = (event) => {
    event.preventDefault();
    removeItemFromCart();
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {name}
      </th>
      <td className="px-6 py-4">{color}</td>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">${price}</td>
      <td className="px-6 py-4">{stock}</td>
      <td className="px-6 py-4 text-right">
        <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={removeItemClick}>Remove</button>
      </td>
    </tr>
  );
};

export default CartListItem;
