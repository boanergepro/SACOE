//modelos

const Personas = require('./modelos/persona')

const Permisos = require('./modelos/permisos')

const Usuarios = require('./modelos/usuarios')


Personas.sync({force: false}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});

Permisos.sync({force: false}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});

Usuarios.sync({force: false}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});
