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
//SOCKET

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


//Enviar email
app.get('/enviarMail', (req, res) => {

	//Alternativa mailgun-js
	var api_key = 'key-e18f9eb10b56bbcc49c2fa4b674b8dc9'
	var domain = 'sandbox3365c16f5d71480b8835f07c0d9e28ad.mailgun.org'
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})
	 
	var data = {
		//De quien
	  	from: 'Sacoe <antonycarrizo96@gmail.com>',
	  	//Para quien
	  	to: 'antonycarrizo96@gmail.com',
	  	//Asunto
	  	subject: 'Hola sacoe',
	  	//Contenido
	  	text: 'Este es un mensaje envia por sacoe'
	}
	 
	mailgun.messages().send(data, function (error, body) {
	  console.log(body)
	})
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



/*
//Buscar
app.post('/buscar', (req, res) => {

	let parametroBusqueda = req.body.search

	Personas.find({
			$or : [ 
				{ nombre : new RegExp(parametroBusqueda, "i") },
				{ apellido : new RegExp(parametroBusqueda, "i") }
			]
		})	
		.exec( (err,result) => {

			///res.send({persona: result})
			res.render('persona/resultadosBusquedas',{persona: result})

		})
})
*/

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
//Ver todas las personas filtradas por heredad y por red
app.get('/persona/heredad/:id/red/:red', Ctrlpersona.coordinador_personas)


//Ver por heredad--------------------------------------------------------------

app.get('/persona/heredad/:num', Ctrlpersona.verVistaHeredad)


//Redes
app.get('/persona/heredad/:codigoHeredad/red', Ctrlpersona.verVistaRedes)

//app.get(`/persona/heredad/:codigoHeredad}/red/:red`, Ctrlpersona.verVistaFiltrado)

//Mostar los ganados segun el id del usurio
app.get('/persona/:id', Ctrlpersona.usuario_ganados)

//Todos filtrado
app.get('/persona/heredad/:codigoHeredad/red/:red', Ctrlpersona.verFitradoFinal)

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