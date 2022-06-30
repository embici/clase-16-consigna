const { Router } = require('express');
const ProductsDAO = require('../container/products_dao');

//const prodContainer = new Container('./db/products.txt');
const productsDAO = new ProductsDAO();

productsDAO.init();

const router = Router();

router.get('/', (req, res)=>{
    res.send(productsDAO.data)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parámetro debe ser un número' });
    }

    if (idNumber > productsDAO.data.length) {
        return res.status(400).send({ error: 'El parámetro está fuera de rango' });
    }

    if (idNumber < 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }

    const person = await productsDAO.findByID(idNumber);

    if (!person) {
        return res.status(400).send({ error: `El producto con el id: ${id} no existe` });
    }

    return res.send(person)
})

router.post('/', async (req, res)=>{
    const { name, price, category, color } = req.body;
    const { isadmin } = req.headers;
    if(typeof isadmin === 'undefined' || !JSON.parse(isadmin.toLowerCase())){

        return res.send({ message: 'Post request requires Admin rights'});
    }

    if (!name || !color || !price || !category) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }

    await productsDAO.insert({ name, price, category, color });
    await productsDAO.init();

    return res.send({ message: 'Producto agregada exitosamente'})
})

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
        const { isadmin } = req.headers;
        if(typeof isadmin === 'undefined' || !JSON.parse(isadmin.toLowerCase())){
    
            return res.send({ message: 'Put request requires Admin rights'});
        }
    
        await productsDAO.update(Number(id), {[field]: value});
        await productsDAO.init();
    
        res.send({ message: `El producto con id: ${id} se modificó exitosamente`})
    } catch (error) {
        throw error
    }

})

router.delete('/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const { isadmin } = req.headers;
        if(typeof isadmin === 'undefined' || !JSON.parse(isadmin.toLowerCase())){
    
            return res.send({ message: 'Delete request requires Admin rights'});
        }
    
        await productsDAO.remove(Number(id));
        await productsDAO.init();

        res.send({ message: `El producto con id: ${id} se elimino con exito`})

    }catch(error){
        throw error
    }
})

module.exports = router;