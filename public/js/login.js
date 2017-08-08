$(document).ready(function(){

	$('#enlaceRegistro').css('cursor','pointer')
	$('#enlaceLogin').css('cursor','pointer')

	$('#enlaceRegistro').click((event) => {
		$('#resgistro').removeClass('ocultar')

		$('#login').addClass('ocultar')

	})
	$('#enlaceLogin').click((event) => {
		$('#resgistro').addClass('ocultar')

		$('#login').removeClass('ocultar')

	})


})