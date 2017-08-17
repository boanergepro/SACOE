let idAdministrador= null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditarAdministrador = null
let urlEliminarAdministrador = null

$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idAdministrador== null){

		idAdministrador= valorAtributoId
		urlEditarAdministrador =  "/usuario/editar/" + idAdministrador
		urlEliminarAdministrador = "/usuario/eliminar/" + idAdministrador
		
		
			$('#contenedor-boton-acciones-administrador').append(`

		
				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
				    <a class="btn-floating btn-large red">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="editarAdministrador"class="btn-floating yellow" >
				      		<i class="material-icons">border_color</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="eliminarAdministrador" class="btn-floating pink">
				      		<i class="material-icons">delete_forever</i>
				      	</a>
				      </li>
				 </div>
  		`)

		

		//Agregar urls a los botones
		$.each($("#editarAdministrador"),function(){
	    	$(this).attr("href", urlEditarAdministrador)
		})
		$.each($("#eliminarAdministrador"),function(){
	    	$(this).attr("href", urlEliminarAdministrador)
		})

		//Desabilitar todos los chek
		$.each($("input[type='checkbox']"),function(){
	    	$(this).attr("disabled","disabled")
		})
		//Habilitar solo el que tengo seleccionado
		$.each($(`#checkId-${idAdministrador}`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})

	}

	else if(idAdministrador!= null){
		idAdministrador= null
		//Quitar el boton de acciones
		$('#remove').remove()

		//Habilitar todos los chek
		$.each($(`input[type='checkbox']`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})
	}
})