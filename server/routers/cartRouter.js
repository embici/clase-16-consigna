const { Router } = require('express');
const ProductsDAO = require('../container/products_dao');
const CartDAO = require('../container/cart_dao');

const cartDAO = new CartDAO();
const productsDAO = new ProductsDAO();

cartDAO.init();

const router = Router();

router.get('/', (req, res)=>{
    res.send(cartDAO.data)
})

router.post('/', async (req, res)=>{
    try {
        let cartID = await cartDAO.insert({products:[]});
        await cartDAO.init();

        return res.send({ message: 'Cart successfully created', id: cartID});
    
    } catch (error) {
        throw error
    }

})

router.delete('/:id', async (req, res)=>{
    try{
        const { id } = req.params;    
        await cartDAO.remove(Number(id));
        await cartDAO.init();
        res.send({ message: `Cart id: ${id} has been cleared and deleted`})

    }catch(error){
        throw error
    }
})


router.post('/:id/productos', async (req, res)=>{
    try {
        const { id } = req.params;  
        const { product_id, stock } = req.body;
        if(typeof product_id === 'undefined'|| typeof stock === 'undefined'){
            return res.send({ message: 'product_id and stock are required'});
        }
        let currentCart = await cartDAO.findByID(id);
        let currentProduct = await productsDAO.findByID(product_id);
        const updatedProduct = {"products": [...currentCart.products, ...[{...currentProduct, "stock": stock}]]};
        await cartDAO.insert(JSON.stringify(updatedProduct));
        await cartDAO.init();
    
        return res.send({ message: `Product ${ product_id } successfully added to the Cart ${ id }`})
    
    } catch (error) {
        throw error
    }
})

router.get('/:id/productos', async (req, res)=>{
    try {
        const { id } = req.params;  
        let currentCart = await cartDAO.findByID(id);    
        return res.send({ products: currentCart.products || []})
    
    } catch (error) {
        throw error
    }
})

router.delete('/:id/productos/:id_prod', async (req, res)=>{
    try {
        const { id, id_prod } = req.params;  
        let currentCart = await cartDAO.findByID(id);
        const newProducts = currentCart.products.filter(product => {
            return Number(product.id) !== Number(id_prod);
        });          
        console.log("newProducts", newProducts);
        await cartDAO.update(Number(id), {"products": newProducts});
        await cartDAO.init();
    
        return res.send({ message: `Product ${ id_prod } successfully removed from the Cart ${ id }`})
    
    } catch (error) {
        throw error
    }
})

module.exports = router;