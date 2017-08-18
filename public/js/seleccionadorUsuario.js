let idUsuario = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditarUsuario = null
let urlEliminarUsuario = null


$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idUsuario == null){

		idUsuario = valorAtributoId
		urlEditarUsuario =  "/usuario/editar/" + idUsuario
		urlEliminarUsuario = "/usuario/eliminar/" + idUsuario
		
	

			$('#contenedor-boton-acciones-usuario').append(`

		
				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
				    <a class="btn-floating btn-large red pulse">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="editarUsuario"class="btn-floating yellow" >
				      		<i class="material-icons">border_color</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="eliminarUsuario" class="btn-floating pink">
				      		<i class="material-icons">delete_forever</i>
				      	</a>
				      </li>
				 </div>
  		`)

		

		//Agregar urls a los botones
		$.each($("#editarUsuario"),function(){
	    	$(this).attr("href", urlEditarUsuario)
		})
		$.each($("#eliminarUsuario"),function(){
	    	$(this).attr("href", urlEliminarUsuario)
		})

		//Desabilitar todos los chek
		$.each($("input[type='checkbox']"),function(){
	    	$(this).attr("disabled","disabled")
		})
		//Habilitar solo el que tengo seleccionado
		$.each($(`#checkId-${idUsuario}`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})

	}

	else if(idUsuario != null){
		idUsuario = null
		//Quitar el boton de acciones
		$('#remove').remove()

		//Habilitar todos los chek
		$.each($(`input[type='checkbox']`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})
	}
})