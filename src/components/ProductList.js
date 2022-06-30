import React from 'react'
import Product from './Product'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const ProductList = () => {
  const {products, loading} = useGlobalContext();
  if(loading){
    return <Loading/>
  }
  if(products.length < 1){
    return(<h2>No products to show</h2>)
  }
  return (
    <div>
      <h2>Products</h2>
      <div className='products-list flex flex-wrap flex-row'>
        {
          products.map((item) => {
            return <Product key={item.id} {...item}/>
          })
        }
      </div>

    </div>
    
  )
}

export default ProductList
