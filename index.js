//Dependencias
const express = require('express')
const passport = require('passport')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const app = express()
const e_ws = require('express-ws')(app)

//Archivo de configuracion
const config = require('./config')
const db = require('./db')
//Conexion con la base de datos
const conexionDB = db.getConecctionDb();

//==============================================================
const telegramBot = require('node-telegram-bot-api')

const token = config.token
const url = config.url

const bot = new telegramBot(token, {polling: true})

bot.setWebHook(`${url}/bot${token}`)

app.post(`/bot${token}`, (req, res) => {
	bot.processUpdate(req.body);
	res.sendStatus(200);
})


/*
bot.onText(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, (msg, match) => {
	
	bot.sendMessage(
		290035299, 
		`Exelente! Usted ha ingresado el correo ${match[1]} y actualmente esta siendo almacenado para futuras comunicaciones.`,
		{
			"reply_markup": {
    			"keyboard": [['✔️','✖️']]
    		}
		})
    
	})

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(290035299, 'Bienvenido al bot de SACOE para poder recivir informacion en algun momento de esta aplicacion debe proceder a introducir un correo válido.')
})
*/
//==============================================================

//modelos
const Personas = require('./modelos/persona')
const FaseGanar = require('./modelos/fase_ganar')
const Usuario = require('./modelos/usuario')
const Notificacion = require('./modelos/notificacion')


//Controladores
const Ctrlpersona = require('./controladores/persona')
const usuarioCtrl = require('./controladores/usuario')
const authCtrl =  require('./controladores/auth')
const contactoCtrl = require('./controladores/contacto')
const enviarMailCtrl = require('./controladores/enviarMail')
//const telegramBot = require('./controladores/telegramBot')

//middleware Transformar los datos a json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Vistas en jade
app.set('view engine', 'jade')

//Servir archivos staticos
app.use(express.static('public'))

app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'sdhfsdkjhfkdsjhfjkdsfkjdsfskd', resave: false, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

//==================================================================================
//SOCKET NOTIFICACIONES

app.ws('/socket', (ws,req) => {

	ws.on('message',(ms) => {

		Notificacion.findAll({

			where: {
				estado: 'a'
			}

		}).then(notificacion => {

			let data = []

			for(let i=0; i<notificacion.length; i++){
				data.push(notificacion[i].dataValues)
			}

			console.log(JSON.stringify(data))

			ws.send(JSON.stringify(data))

		}).catch(err => {
			if (err) consol.log(err)
		})

	})

})
//ver usuarios
app.get('/directorio', (req, res) => {
	Usuario.findAll().then(usuarios => {
		res.send(usuarios)
	})
}),
app.post('/enviarTelegram', (req, res) => {

	let persona_id = req.body.persona_id
	let telegram_id = req.body.telegram_id

	//Consultar lod datos de la persona de la que se necesita enviar los dotos por telegram
	conexionDB.query('SELECT * FROM vista_datos_personas WHERE personas_id = :id',{ 
		replacements: { 
			id: persona_id 
		}, 
		type: conexionDB.QueryTypes.SELECT }).then(result => {
			data = {
				nombre: result[0].nombre,
				apellido: result[0].apellido,
				sexo: result[0].sexo,
				edad: result[0].edad,
				nacionalidad: result[0].nacionalidad,
				ocupacion: result[0].ocupacion,
				ciudad: result[0].ciudad,
				telefono: result[0].telefono,
				correo: result[0].correo,
				direccion: result[0].direccion,
				fecha_nacimiento: result[0].fecha_nacimiento,
				fecha_contactado: result[0].fecha_contactado,
				lugar_contacto: result[0].lugar_contacto,
				invitado_por: result[0].invitado_por,
				fecha_visitar: result[0].fecha_visitar,
				celula_insertar: result[0].celula_insertar,
				peticion_oracion: result[0].peticion_oracion,
				nombre_heredad: result[0].nombre_heredad
			}
			
			bot.sendMessage(telegram_id, 
				`
					<i>Datos personales enviados desde la aplicacón SACOE</i>
					
				<strong>Nombre: </strong><em>${data.nombre}</em>
				<strong>Apellido: </strong><em>${data.apellido}</em>
				<strong>Sexo: </strong><em>${data.sexo}</em>
				<strong>Edad: </strong><em>${data.edad}</em>
				<strong>Nacionalidad: </strong><em>${data.nacionalidad}</em>
				<strong>Ocupación: </strong><em>${data.ocupacion}</em>
				<strong>Ciudad: </strong><em>${data.ciudad}</em>
				<strong>Telefono: </strong><em>${data.telefono}</em>
				<strong>Correo: </strong><em>${data.correo}</em>
				<strong>Dirección: </strong><em>${data.direccion}</em>
				<strong>Fecha de nacimiento: </strong><em>${data.fecha_nacimiento}</em>
				<strong>Fecha de contacto: </strong><em>${data.fecha_contactado}</em>
				<strong>Invitado por: </strong><em>${data.invitado_por}</em>
				<strong>Fecha para visitar: </strong><em>${data.fecha_visitar}</em>
				<strong>Celula para insertar: </strong><em>${data.celula_insertar}</em>
				<strong>Peticion de oración: </strong><em>${data.peticion_oracion}</em>
				<strong>Nombre de la heredad: </strong><em>${data.nombre_heredad}</em>
				`, 
				
				{ parse_mode: "HTML" 
			})
		})
	

	res.send(true)
	
})

//Marcar las notificaciones a leidads cambiando su estado de 'a' a 'i'
app.get('/marcar_leidas', (req, res) =>{
	Notificacion.update({
		estado: 'i'
	},{
		where: {
			estado: 'a'
		}
	}).then(() => {
		res.redirect('/inicio')
	}).catch(err => {
		console.log(err)
	})
})
//==================================================================================


//PASSPORT ESTARTEGIA
passport.use(authCtrl.estrategia)

//SERIALIZADOR
passport.serializeUser(authCtrl.serializador)

//DESERIALIZADOR
passport.deserializeUser(authCtrl.desserializador)

app.get('/persona/generarPDF', (req, res) => {
	
	const PDFDocument = require('pdfkit')
	const doc = new PDFDocument()

	let nomebreArchivo = "reporte"

	nomebreArchivo = encodeURIComponent(nomebreArchivo) + '.pdf'
	
	//Dercargar el pdf
	//res.setHeader('Content-disposition', 'attachment; nomebreArchivo="' + nomebreArchivo + '"')
	//Mostrar el pdf en el navegador
	res.setHeader('Content-type', 'application/pdf')
	const content = "Contenido del reporte generado por sacoe"
	doc.y = 300
	doc.text(content, 50, 50)

	doc.pipe(res)
	doc.end()


})

//Vista de error
app.get('/errores/vista403', (req, res) => {
    res.render('errores/vista403')
})

//Login
app.get('/', Ctrlpersona.verLogin)

//Inicio de secion
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), 
  	(req, res) => {
    	res.redirect('/inicio')
  	}
)
  
//Enviar email
app.post('/persona/enviarMail/:id', enviarMailCtrl.sendMail)

//Enviar telegram
//app.get('/persona/telegram', telegramBot.sendTelegram)

//Registro usuarios
app.post('/registro', usuarioCtrl.registro)
//Ver usuarios
app.get('/usuarios', usuarioCtrl.usuarios)
//Vista editar usuario
app.get('/usuario/editar/:id', usuarioCtrl.editarUsuario)
//Guardar la edicion del usuario
app.post('/usuario/editar/:id', usuarioCtrl.saveEdicion)
//Accion eliminar un usuario
app.get('/usuario/eliminar/:id', usuarioCtrl.eliminarUsuario)

//Vista Inicio
app.get('/inicio', Ctrlpersona.verInicio)


//Buscar
app.post('/buscar', (req, res) => {

	let parametroBusqueda = req.body.search
	console.log(parametroBusqueda)
	
	conexionDB.query('SELECT * FROM vista_datos_personas WHERE nombre = :parametro',
		{ replacements: { parametro: parametroBusqueda }, type: conexionDB.QueryTypes.SELECT }).then(result => {

			res.render('persona/resultadosBusquedas',{persona: result, user: req.user})

		}).catch(err => {
			console.log(err)
		})

})


//Vista Nuevo
app.get('/persona/nuevo', Ctrlpersona.verFormReg)

//Agregar nueva persona
app.post('/nuevo', Ctrlpersona.agregarReg)

//Vista personas(Todos los ganados)
app.get('/persona/todos', Ctrlpersona.verTodo)

//Vita ganados
app.get('/persona/', Ctrlpersona.ganados)

//Ver persona
app.get('/persona/ver/:id', Ctrlpersona.verRegById)

//Ver las redes de la heredad de un coordinador
app.get('/persona/redes/:id', Ctrlpersona.coordinador_redes)
//Ver todas las personas filtradas por heredad y por red - coordinador
app.get('/persona/heredad/:id/red/:red', Ctrlpersona.coordinador_personas)


//Adminstrador=======================================================================


//Redes
app.get('/persona/heredad/:codigoHeredad/red', Ctrlpersona.verVistaRedes)

//Todos filtrado
app.get('/admin/persona/heredad/:codigoHeredad/red/:red', Ctrlpersona.verFitradoFinal)

//==================================================================================
//Mostar los ganados segun el id del usurio
app.get('/persona/:id', Ctrlpersona.usuario_ganados)

// Vista editar persona
app.get('/persona/editar/:id', Ctrlpersona.vistaEditar)

app.post('/persona/editar/editarSave', Ctrlpersona.saveEditar)

//Borrar una persona
app.get('/persona/borrar/:id', Ctrlpersona.borrarUno)

//Ir a la llamda para agregar el resultado de la llamada
app.get('/persona/contacto/llamada/:id', contactoCtrl.addResultLlamada)

//Guardar el resultado de la llamada
app.post('/persona/contacto/llamada/:id', contactoCtrl.saveResultLlamada)
//Ver el resultado de la llamada
app.get('/persona/contacto/llamada/ver/:id',contactoCtrl.verLlamada)

//Ir a la vista para agregar el resultado de la visita
app.get('/persona/contacto/visita/:id', contactoCtrl.addResultVisita)

//Ver el resultado de la visita
app.get('/persona/contacto/visita/ver/:id',contactoCtrl.verVisita)

//Guardar el resultado de la visita
app.post('/persona/contacto/visita/:id', contactoCtrl.saveResultVisita)

//Vista estadisticas
app.get('/estadisticas', Ctrlpersona.vistaEstadisticas)


app.get('/logout', (req, res) => {

	req.logout();
	res.redirect('/')

})

app.listen(config.port, () => {
    console.log(`Server corriendo en el puerto ${config.port}`)
})