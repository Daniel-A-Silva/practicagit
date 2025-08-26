var pool = require('./bd');
var md5 = require('md5');

async function getUserAndPassword(user, password) {
    try {
        var query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1';
        var rows = await pool.query(query, [user,password]);
        console.log("Consulta a DB con:", user, md5(password), "Resultado:", rows);
        return rows[0]; // Retorna el primer usuario encontrado
    } catch (error) {
        console.log('Error en usuariosModel:', error);
        throw error;
    }
}
module.exports = {
    getUserAndPassword  }
