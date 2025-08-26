var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('contactanos'); // o lo que quieras renderizar
});

var nodemailer = require('nodemailer');

/* GET home page. */


router.post('/' , async(req,res,next)=>{

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var dejamensaje = req.body.dejamensaje;

  console.log (req.body);

 var obj = {
    to: 'suprime9988@gmail.com',
    subject: 'contacto desde la web',
    html: nombre +  "  " + apellido + " se contacto a traves y quiere mas info a este correo: " + email + 
    "<br>Ademas, hizo el siguiente comentario: " + dejamensaje + 
    ".<br> su telefono es " + telefono
  } 
  var obj = {
  to: 'suprime9988@gmail.com',
  subject: 'contacto desde la web',
  html: nombre + " " + apellido + " se contactó a través de la web y quiere más info a este correo: " + email + 
        "<br>Además, hizo el siguiente comentario: " + dejamensaje + 
        ".<br> Su teléfono es: " + telefono
}

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });
  var info = await transport.sendMail(obj);

  res.render('contactanos',{
    message: 'mensaje enviado correctamente'
  });
});

module.exports = router; // ✅ MUY IMPORTANTE
