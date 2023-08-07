/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


const bcrypt = require("bcrypt");

const encryptPassword = async (encryptedPassword) => {
  try{
    const password = await bcrypt.hash(encryptedPassword,10);
    return password;
  }catch(err){
    return err;
  }
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const password = await encryptPassword('12345678')

  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Risa', email: 'risairma21@gmail.com', password: password, role_id:'1'},
    {id: 2, name: 'Aris', email: 'aris@gmail.com', password: password, role_id:'2'},
  ]);
};
k