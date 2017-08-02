//modelos

const Personas = require('./modelos/persona')

Personas.sync({force: true}).then((x) => {

  // Table created
  console.log(x)

})
.catch((err) => {

	console.log(err)
	
});