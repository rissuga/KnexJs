const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development); 
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


  module.exports = {

        async login (req,res) {
          try {
            const { email, password } = req.body;
        
            const user = await knex('users').where('email', email).first();
        
            if (!user) {
              return res.status(401).json({ error: 'Email atau kata sandi salah' });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
        
            if (!isPasswordValid) {
              return res.status(401).json({ error: 'Email atau kata sandi salah' });
            }
        
            const token = jwt.sign(
              {
                id: user.id, 
                email: user.email 
              },
              'rahasia-rahasia' 
            );
        
            // Kirimkan token sebagai respons
            res.status(200).json({ 
              status: "OK",
              data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token 
              },
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Terjadi kesalahan server' });
          }

        }
  }

  
  
  