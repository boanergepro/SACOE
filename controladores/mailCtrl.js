var nodemailer = require('nodemailer');

// email sender function
function enviarEmail(req, res){
	
	// Definimos el transporter
	var transporte = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'boanergepro@gmail.com',
	        pass: 'parangaturimicuaro'
	    }
	})

	// Definimos el email
	var mailOpciones = {
	    from: 'Remitente',
	    to: 'antonycarrizo96@gmail.com',
	    subject: 'Sacoe mensaje',
	    text: 'Este es un mensaje enviado desde sacoe ;)'
	}

	// Enviamos el email
	transporte.sendMail(mailOpciones, function(error, info){
	    if (error){
	        console.log(error);
	        res.send(500, err.message);
	    } else {
	        console.log("Email enviado");
	        res.status(200).jsonp(req.body);
	    }
	})
}

module.exports = enviarEmail