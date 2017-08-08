const nombre = document.getElementById('nombre')
const pass = document.getElementById('password')

let campoNombre = null;
let campoPass = null;

$("#nombre").keyup((event) => {
	console.log('hola')

	//Si es distinyo a admin entonces colocar el error
	if(nombre.value == 'admin'){
		campoNombre = 'admin'
		nombre.className = 'valid';

	}
	if(nombre.value != 'admin'){
		campoNombre = null
		nombre.className = 'invalid';

	}
	//Si esta vacio quitar el error
	if(nombre.value == ''){
		campoNombre = null
		nombre.className = 'validate';
		
	}
})

$("#password").keyup((event) => {
	console.log('hola')

	//Si es distinyo a admin entonces colocar el error
	if(pass.value == 'admin'){
		campoPass = 'admin'
		pass.className = 'valid';

	}
	if(pass.value != 'admin'){
		campoPass = null
		pass.className = 'invalid';

	}
	//Si esta vacio quitar el error
	if(pass.value == ''){
		campoPass = null
		pass.className = 'validate';
		
	}
})
//Crea el modal, mas no lo muestra
$('.modal').modal();

$(document).ready(function(){

    $('.form').submit((envent) => {
		if (campoNombre == null && campoPass == null) {
			event.preventDefault()
			$('#modal1').modal('open');
			
		}
	})
 })