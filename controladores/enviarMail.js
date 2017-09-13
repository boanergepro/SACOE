//Base de datos
const db = require('../db')
const conexionDB = db.getConecctionDb();


function sendMail (req, res) {

	let id = req.params.id

	let asunto = req.body.asunto
	let correo = req.body.correo
	
	//consulta de los datos de la persona

	conexionDB.query('SELECT * FROM vista_datos_personas WHERE personas_id = :id',
		{ replacements: { id: id }, type: conexionDB.QueryTypes.SELECT }).then(result => {

			//mailgun-js
			var api_key = 'key-e18f9eb10b56bbcc49c2fa4b674b8dc9'
			var domain = 'sandbox3365c16f5d71480b8835f07c0d9e28ad.mailgun.org'
			var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

			var data = {
				//De quien
			  	from: 'SACOE <antonyprogramacion96@gmail.com>',
			  	//Para quien
			  	to: correo,
			  	//Asunto
			  	subject: asunto,
			  	//Contenido
			  	//text: result
			  	html: `
			  		<h1>Datos personales de ${result[0].nombre} ${result[0].apellido}</h1>
					<h5> Nombre: ${result[0].nombre}</h5>
					<h5> Apellido: ${result[0].apellido}</h5>
					<h5> Sexo: ${result[0].sexo}</h5>
					<h5> Edad: ${result[0].edad}</h5>
					<h5> Nacionalidad: ${result[0].nacionalidad}</h5>
					<h5> Ocupación: ${result[0].ocupacion}</h5>
					<h5> Ciudad: ${result[0].ciudad}</h5>
					<h5> Telefono: ${result[0].telefono}</h5>
					<h5> Correo: ${result[0].correo}</h5>
					<h5> Dirección: ${result[0].direccion}</h5>
					<h5> Fecha de nacimiento: ${result[0].fecha_nacimiento}</h5>
					<h5> Fecha ganado: ${result[0].fecha_contactado}</h5>
					<h5> Lugar de contacto: ${result[0].lugar_contacto}</h5>
					<h5> Invitado por: ${result[0].invitado_por}</h5>
					<h5> Fecha para visitar: ${result[0].fecha_visitar}</h5>
					<h5> Celula a insertar: ${result[0].celula_insertar}</h5>
					<h5> Petición de oración: ${result[0].peticion_oracion}</h5>
					<h5> Heredad: ${result[0].nombre_heredad}</h5>
					<p>Enviados desde el Sistema Administrativo de la Coordinación de Evangelismo</p>
			  	`
			}

			//Enviar mensaje
			mailgun.messages().send(data, function (error, body) {
			  console.log(body)
			  if (error) console.log(error)

			  res.redirect('/inicio')
			})

		}).catch(err => {
			console.log(err)
		})
}

module.exports = {
	sendMail
}