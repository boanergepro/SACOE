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
					<table>
						<tr>
							<td>Nombre</td>
							<td>${result[0].nombre}</td>
						</tr>
						<tr>
							<td>Apellido</td>
							<td>${result[0].apellido}</td>
						</tr>
						<tr>
							<td>Sexo</td>
							<td>${result[0].sexo}</td>
						</tr>
						<tr>
							<td>Edad</td>
							<td>${result[0].edad}</td>
						</tr>
						<tr>
							<td>Nacionalidad</td>
							<td>${result[0].nacionalidad}</td>
						</tr>
						<tr>
							<td>Ocupación</td>
							<td>${result[0].ocupacion}</td>
						</tr>
						<tr>
							<td>Ciudad</td>
							<td>${result[0].ciudad}</td>
						</tr>
						<tr>
							<td>Telefono</td>
							<td>${result[0].telefono}</td>
						</tr>
						<tr>
							<td>Correo</td>
							<td>${result[0].correo}</td>
						</tr>
						<tr>
							<td>Dirección</td>
							<td>${result[0].direccion}</td>
						</tr>
						<tr>
							<td>Fecha de nacimiento</td>
							<td>${result[0].fecha_nacimiento}</td>
						</tr>
						<tr>
							<td>Fecha ganado</td>
							<td>${result[0].fecha_contactado}</td>
						</tr>
						<tr>
							<td>Lugar de contacto</td>
							<td>${result[0].lugar_contacto}</td>
						</tr>
						<tr>
							<td>Invitado por</td>
							<td>${result[0].invitado_por}</td>
						</tr>
						<tr>
							<td>Fecha para visitar</td>
							<td>${result[0].fecha_visitar}</td>
						</tr>
						<tr>
							<td>Celula a insertar</td>
							<td>${result[0].celula_insertar}</td>
						</tr>
						<tr>
							<td>Petición de oración</td>
							<td>${result[0].peticion_oracion}</td>
						</tr>
						<tr>
							<td>Heredad</td>
							<td>${result[0].nombre_heredad}</td>
						</tr>

					</table>
					
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