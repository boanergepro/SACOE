let idCoordinador= null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditarCoordinador = null
let urlEliminarCoordinador = null


$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idCoordinador== null){

		idCoordinador= valorAtributoId
		urlEditarCoordinador =  "/usuario/editar/" + idCoordinador
		urlEliminarCoordinador = "/usuario/eliminar/" + idCoordinador
		
	

			$('#contenedor-boton-acciones-coordinador').append(`

		
				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
				    <a class="btn-floating btn-large red pulse">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="editarCoordinador"class="btn-floating yellow" >
				      		<i class="material-icons">border_color</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="eliminarCoordinador" class="btn-floating pink">
				      		<i class="material-icons">delete_forever</i>
				      	</a>
				      </li>
				 </div>
  		`)


		//Agregar urls a los botones
		$.each($("#editarCoordinador"),function(){
	    	$(this).attr("href", urlEditarCoordinador)
		})
		$.each($("#eliminarCoordinador"),function(){
	    	$(this).attr("href", urlEliminarCoordinador)
		})

		//Desabilitar todos los chek
		$.each($("input[type='checkbox']"),function(){
	    	$(this).attr("disabled","disabled")
		})
		//Habilitar solo el que tengo seleccionado
		$.each($(`#checkId-${idCoordinador}`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})

	}

	else if(idCoordinador!= null){
		idCoordinador= null
		//Quitar el boton de acciones
		$('#remove').remove()

		//Habilitar todos los chek
		$.each($(`input[type='checkbox']`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})
	}
})