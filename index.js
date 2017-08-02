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



//modelos
const Personas = require('./modelos/persona')

const Sequelize = require('sequelize')

//Transformar los datos a json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Vistas
app.set('view engine', 'jade')

//Servir archivos staticos
app.use(express.static('public'))

//Controladores
const Ctrlpersona = require('./controladores/persona')

//Vista de error
app.get('/errores/vista403', (req, res) => {
    res.render('errores/vista403')
})

//Login
app.get('/', Ctrlpersona.verLogin)

const varUser = "admin"
const Varpass = "admin"

app.post('/login', Ctrlpersona.inicioSecion)

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
app.get('/todos', Ctrlpersona.verTodo)

//Vita ganados
app.get('/persona/', Ctrlpersona.ganados)

//Ver persona
app.get('/ver/:id', Ctrlpersona.verRegById)



//Ver por heredad--------------------------------------------------------------

app.get('/heredad/:num', Ctrlpersona.verVistaHeredad)


//Redes
app.get('/persona/redes', Ctrlpersona.verVistaRedes
	/*
	ver todos por heredad
	Personas.findAll({
		where: {
			heredad: numHeredad
		}	
	}).then(doc => {
		//res.send({heredad: doc})
		res.send({peros: doc.getEdad()})
	}).catch(err => {
		if (err) return console.log(`Ha ocurrido el siguiente error al hacer la consulta ${err}`)
	})
	*/
)

app.get('/red/:red', Ctrlpersona.verVistaFiltrado)

//Todos filtrado
app.get('/persona/verFiltrado', Ctrlpersona.verFitradoFinal)

// Vista editar
app.get('/editar/:id', Ctrlpersona.vistaEditar)

app.post('/editarSave', Ctrlpersona.saveEditar)

//Borrar
app.get('/borrar/:id', Ctrlpersona.borrarUno)

//Vista estadisticas
app.get('/persona/estadisticas', Ctrlpersona.vistaEstadisticas)

//Vista cerrar secion
app.get('/salida', Ctrlpersona.cerrarSecion)

app.listen(config.port, () => {
    console.log(`Server corriendo en el puerto ${config.port}`)
})