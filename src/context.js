import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const urlCart = "/api/carrito/";
const urlProducts = "/api/productos/";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [cartID, setCartID] = useState(null)
  const [forceUpdate, setForceUpdate] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${urlProducts}`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${urlCart}${cartID}/productos`,
      {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          isadmin: "true",
        }
      });
      const data = await response.json();
      console.log('Cart items --->', data['products'])
      setCartItems(data['products']);
    } catch (error) {
      console.log(error);
    }

  }
  const createCart = async () => {
    try {
      const response = await fetch(`${urlCart}`,
      {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          isadmin: "true",
        }
      });
      const data = await response.json();
      setCartID(data.id)
      console.log('Cart created', data)
      console.log('Cart ID', data.id)
    } catch (error) {
      console.log(error);
    }
  
  }

  useEffect(()=>{
      console.log('CONTEXT Use Effect');
      fetchProducts();
      if(cartID){
        fetchCartItems();
      }
    },[forceUpdate]);

  return (
    <AppContext.Provider
      value={{ loading, products, forceUpdate, setForceUpdate, cartID, setCartID, createCart, cartItems}}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
