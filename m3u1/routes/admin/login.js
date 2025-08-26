const express = require('express');
const router = express.Router();
const usuariosModel = require('../../models/usuariosmodel');

// GET - muestra el formulario de login
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

// POST - procesa login
router.post('/', async (req, res, next) => {
    try {
        const { usuario, password } = req.body;
        const user = await usuariosModel.getUserByUsername(usuario);

        if (user) {
            const passwordOK = await usuariosModel.validatePassword(password, user.password);

            if (passwordOK) {
                // guardar sesión
                req.session.id_usuario = user.id;
                req.session.nombre = user.usuario;

                res.redirect('/admin/productos'); // redirige al panel de productos
            } else {
                res.render('admin/login', {
                    layout: 'admin/layout',
                    error: true,
                    message: 'Usuario o contraseña incorrectos'
                });
            }
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true,
                message: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/login', {
            layout: 'admin/layout',
            error: true,
            message: 'Error interno en el login'
        });
    }
});

// logout
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
