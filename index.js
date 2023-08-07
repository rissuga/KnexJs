const express = require("express");
const Book = require("./book");
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development); 
const controller = require ("./app/controller");

const cors = require("cors");

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

const port = process.env.PORT || 8000;

// Book(coba get json book)
app.get("/book", (req, res) => {
    const books = Book.list()
    res.status(200).json(books)
});

// USER //
app.post('/user/login', controller.authController.login);
app.post('/user/register', controller.authController.register)
app.post('/user', controller.userController.create);
app.get('/user', controller.userController.list);
app.get('/user/:id', controller.userController.getById);
app.put('/user/:id', controller.userController.update);
app.delete('/user/:id', controller.userController.delete);

// ROLE //
// Get list of role
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


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});
  
module.exports = app;
