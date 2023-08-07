const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development); 
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const encryptPassword = async (encryptedPassword) => {
  try{
    const password = await bcrypt.hash(encryptedPassword,10);
    return password;
  }catch(err){
    return err;
  }
}


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

        },

        async register (req,res) {
          try {
            const { name,email } = req.body;
            const password = await encryptPassword(req.body.password)
            const dataRegis = {
              name, 
              email, 
              password,
              role_id: 2
            }

            const user = await knex('users').where('email', email).first();

            if(user){
              return res.status(412).json({
                data: null,
                message: "Email has been taken !!",
                status: "Failed"
              })
            }else{
              const newUser = await knex('users')
                .insert(dataRegis);
                console.log('User baru berhasil ditambahkan:', newUser);
                res.status(201).json({ message: 'User baru berhasil ditambahkan', id: newUser[0] });
            }

          } catch (error) { 
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        }
  }

  
  
  