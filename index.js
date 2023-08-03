const express = require("express");
const Book = require("./book");
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development); 

const app = express();
app.use(bodyParser.json());

app.use(express.json());

const port = process.env.PORT || 8000;

// Book(coba get json book)
app.get("/book", (req, res) => {
    const books = Book.list()
    res.status(200).json(books)
});

// Create User
app.post('/user', async (req, res) => {
  try {
    const { name, role_id } = req.body;

    const newUser = await knex('users')
      .insert({ name, role_id });
      console.log('User baru berhasil ditambahkan:', newUser);
      res.status(201).json({ message: 'User baru berhasil ditambahkan', id: newUser[0] });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all data user
app.get('/user', async(req,res) => {
  try{
    // Contoh penggunaan model untuk mengambil data
    const user = await knex('users')
      .select('users.id','users.name', 'role.name as role_name')
      .from('users')
      .leftJoin('role', 'users.role_id', 'role.id')
      res.status(201).json(user);

  }catch{
    res.status(404).json({ error: 'Data tidak ditemukan' });
  }
})

// Get by Id
// Endpoint untuk mengambil data pengguna berdasarkan ID
app.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Gunakan knex untuk mengambil data pengguna berdasarkan ID
    const user = await knex('users').where('id', id).first();

    if (!user) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
app.put('user/:id', async(req,res)=>{
  try {
    const id = req.params.id;
    const name = req.body.name;
    const role = req.body.role;

    const updatedUser = await knex('users').where('id', id).update({ name, role });
    console.log('Data pengguna yang diupdate:', updatedUser);
    res.status(200).json({ message: 'Data pengguna berhasil diupdate' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Delete user
app.delete('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await knex('users').where('id', id).del(); // Gunakan knex untuk menghapus data
    console.log('Data pengguna yang dihapus:', deletedUser);
    res.status(200).json({ message: 'Data pengguna berhasil dihapus' });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ROLE
app.get('/role', async(req,res) => {
  try{
    // Contoh penggunaan model untuk mengambil data
    const role = await knex('role').select('*');
    console.log('Daftar role:', role);
    res.status(201).json(role);
  }catch{
    res.status(404).json({ error: 'Data tidak ditemukan' });
  }
})

// Get list role


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});
  
module.exports = app;
