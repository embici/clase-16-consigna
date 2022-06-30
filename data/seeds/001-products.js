/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {id: 1,
     name:'Apple MacBook Pro 17',
     price:2999,
     category:'laptop',
     color:'gray'},
     {id: 2,
      name:'Microsoft Surface',
      price:2500,
      category:'pc',
      color:'pink'},
      {id: 3,
        name:'Apple Magic Mouse',
        price:100,
        category:'accesories',
        color:'white'}
  ]);
};
