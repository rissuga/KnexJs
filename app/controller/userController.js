const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig.development); 

module.exports = {

    async list(req,res) {
        try{
            const user = await knex('users')
            .select('users.id','users.name', 'role.name as role_name')
            .from('users')
            .leftJoin('role', 'users.role_id', 'role.id')
            res.status(201).json(user);

        }catch{
            res.status(404).json({ error: 'Data tidak ditemukan' });

        }

    },

    async create(req,res) {
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
    },

    async getById(req,res) {
        try {
            const id = req.params.id;
            
            const user = await knex('users')
            .select('users.id','users.name', 'role.name as role_name')
            .from('users')
            .leftJoin('role', 'users.role_id', 'role.id')
            .where('users.id', id).first();

            if (!user) {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async delete(req,res) {
        try {
            const id = req.params.id;
            const user = await knex('users').where('users.id', id).first();

            if(!user){
                return res.status(404).json({
                    message: 'Pengguna tidak ditemukan'
                })
            }

            const deletedUser = await knex('users').where('id', id).del(); // Gunakan knex untuk menghapus data
            console.log('Data pengguna yang dihapus:', deletedUser);
            res.status(200).json({
                 message: 'Data pengguna berhasil dihapus' 
            });
        }catch (error) { 
            console.error(error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    },

    async update(req,res) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const role_id = req.body.role_id
            const user = await knex('users').where('users.id', id).first();

            if(!user){
                return res.status(404).json({
                    message: 'Pengguna tidak ditemukan'
                })
            }
        
            const updatedUser = await knex('users')
            .where('id', id)
            .update({
                name, role_id
            });

            console.log('Data pengguna yang diupdate:', updatedUser);
            res.status(200).json({ message: 'Data pengguna berhasil diupdate' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }





    
}