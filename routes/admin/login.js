var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosmodel');
const md5 = require('md5');

// Muestra el formulario
router.get('/', async function(req, res, next) {
    res.render('admin/login', {});
});

// Procesa login
router.post('/', async (req, res, next) => {
    try {
        const usuario = req.body.usuario;
        const password = md5(req.body.password);

        const data = await usuariosModel.getUserAndPassword(usuario, password);

        if (data) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.error('Error en POST /login:', error);
        res.render('admin/login', {
            layout: 'admin/layout',
            error: true
        });
    }
});

// ✅ Cerrar sesión (logout)
router.get('/logout', async function(req, res, next) {
    req.session.destroy(() => {
        res.render('admin/login', {
            layout: 'admin/layout',
            logout: true
        });
    });
});

module.exports = router;
