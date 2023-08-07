/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Risa', email: 'risairma21@gmail.com', password: '12345678', role_id:'1'},
    {id: 2, name: 'Aris', email: 'aris@gmail.com', password: '12345678', role_id:'2'},
  ]);
};
