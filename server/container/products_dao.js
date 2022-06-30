const options = require('../../knexfile');
const knex = require('knex')(options.development);

class ProductsDAO {
    constructor(){
        try {
            this.data = [];
            console.log('Initializing...');            
            this.init();
        }
        catch(error) {
            console.log(`Error Initializing ${error}`)
        }
    }
    async init() {
        this.data = await this.find()
    }

    async find(){
        return knex.from('products').select('*')
    }
    async findByID(id){
        return knex('products').where({id:Number(id)});
    }
    async insert(post){
        return knex('products').insert(post).then(ids => ({ id: ids[0]}));
    }
    async update(id, post){
        return knex('products').where({id:Number(id)}).update(post);
    }
    async remove(id){
        return knex('products').where({id:Number(id)}).del();
    }
}

module.exports = ProductsDAO