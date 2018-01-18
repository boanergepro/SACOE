$(document).ready(function() {

	$.extend(true, $.fn.DataTable.defaults, {
		"processing": true,
		/*
    	"language": { 
    		url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
    	}
    	*/
    	//"bLengthChange": false
	});


	$('#tabla').DataTable( {
		/*
		"processing": true,
    	"language": { 
    		url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
    	}
    	*/
	});
});
/*
	let ver = document.getElementById('tabla_length');
	let buscador = document.getElementById('tabla_filter');
	console.log(ver)
	console.log(buscador)
	*/
