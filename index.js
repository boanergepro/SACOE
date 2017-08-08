//Servidor
const express = require('express')
const app = express()

//Archivo de configuracion
const config = require('./config')

//Para parsear los datos en el body de la solicitus
const bodyParser = require('body-parser')


const db = require('./db')

//Conexion
const conexionDB = db.getConecctionDb();

const pg = require('pg')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
 
var pgPool = new pg.Pool({

    host: 'localhost',
    database:'sacoeDB',
  	user: 'postgres',
  	password: '123456',
  	max: 20,
  	idleTimeoutMillis: 30000,
  	connectionTimeoutMillis: 2000
});
 
app.use(session({

	store: new pgSession({
	pool : pgPool,    // Connection pool 
	tableName : 'session'   // Use another table-name than the default "session" one 
	}),
	secret: 'sacoe-Evangelismo' || process.env.FOO_COOKIE_SECRET,
	resave: false,
	cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  
}));



//modelos
const Personas = require('./modelos/persona')
const FaseGanar = require('./modelos/fase_ganar')
const Usuario = require('./modelos/usuario')

const Sequelize = require('sequelize')

//middleware Transformar los datos a json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Vistas
app.set('view engine', 'jade')

//Servir archivos staticos
app.use(express.static('public'))

//Controladores
const Ctrlpersona = require('./controladores/persona')
const CtrlMail = require('./controladores/mailCtrl')
const usuarioCtrl = require('./controladores/usuario')

//Enviando el email
var nodemailer = require('nodemailer');

app.get('/enviarMail', (req, res) => {

	//Alternativa mailgun-js
	var api_key = 'key-e18f9eb10b56bbcc49c2fa4b674b8dc9';
	var domain = 'sandbox3365c16f5d71480b8835f07c0d9e28ad.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
	 
	var data = {
		//De quien
	  	from: 'Sacoe <antonycarrizo96@gmail.com>',
	  	//Para quien
	  	to: 'antonycarrizo96@gmail.com',
	  	//Asunto
	  	subject: 'Hola sacoe',
	  	//Contenido
	  	text: 'Este es un mensaje envia por sacoe'
	};
	 
	mailgun.messages().send(data, function (error, body) {
	  console.log(body);
	});



	/* Alternativa node mailer
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
	    from: 'Sistema sacoe',
	    to: 'antonycarrizo96@gmail.com',
	    subject: 'Sacoe mensaje',
	    text: 'Este es un mensaje enviado desde sacoe ;)'
	}

	// Enviamos el email
	transporte.sendMail(mailOpciones, function(error, info){
	    if (error){
	        console.log(error);
	        res.send(500, error.message);
	    } else {
	        console.log("Email enviado");
	        res.status(200).jsonp(req.body);
	    }
	})
	*/
})

//Vista de error
app.get('/errores/vista403', (req, res) => {
    res.render('errores/vista403')
})

//Login
app.get('/', Ctrlpersona.verLogin)

const varUser = "admin"
const Varpass = "admin"

app.post('/login', Ctrlpersona.inicioSesion)

//Registro usuarios
app.post('/registro', (req,res) => {

	dataUser = {
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		username: req.body.username,
		password: req.body.password
	}
	
	Usuario.create(dataUser).then((persona) => {
		res.redirect('/')
	})
	

})
//Ver usuarios
app.get('/usuarios', usuarioCtrl.usuarios)

app.get('/usuario/editar/:id', usuarioCtrl.editarUsuario)
app.post('/usuario/editar/:id', usuarioCtrl.saveEdicion)

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



//Ver por heredad--------------------------------------------------------------

app.get('/persona/heredad/:num', Ctrlpersona.verVistaHeredad)


//Redes
app.get('/persona/heredad/:codigoHeredad/red', Ctrlpersona.verVistaRedes)

//app.get(`/persona/heredad/:codigoHeredad}/red/:red`, Ctrlpersona.verVistaFiltrado)

//Todos filtrado
app.get('/persona/heredad/:codigoHeredad/red/:red', Ctrlpersona.verFitradoFinal)

// Vista editar
app.get('/persona/editar/:id', Ctrlpersona.vistaEditar)

app.post('/persona/editar/editarSave', Ctrlpersona.saveEditar)

//Borrar
app.get('/persona/borrar/:id', Ctrlpersona.borrarUno)

//Vista estadisticas
app.get('/estadisticas', Ctrlpersona.vistaEstadisticas)

//Vista cerrar secion
app.get('/salida', Ctrlpersona.cerrarSecion)

app.listen(config.port, () => {
    console.log(`Server corriendo en el puerto ${config.port}`)
})