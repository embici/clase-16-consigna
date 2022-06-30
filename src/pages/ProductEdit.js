import React from 'react'
import ProductEditForm from '../components/ProductEditForm'
import { useParams } from 'react-router-dom';

const ProductEdit = () => {
  const {id} = useParams();
  return (
    <div className='container mx-auto'>
      <ProductEditForm editId={id}/>
    </div>
  )
}

export default ProductEdit
