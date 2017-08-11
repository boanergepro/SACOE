let idPersona = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditar = null
let urlEliminar = null


$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idPersona == null){

		idPersona = valorAtributoId
		urlEditar =  "/usuario/editar/" + idPersona
		urlEliminar = "/usuario/eliminar/" + idPersona
		
	

			$('#contenedor-boton-acciones').append(`

		
				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
				    <a class="btn-floating btn-large red">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="editar"class="btn-floating yellow" >
				      		<i class="material-icons">border_color</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="eliminar" class="btn-floating pink">
				      		<i class="material-icons">delete_forever</i>
				      	</a>
				      </li>
				 </div>
  		`)

		

		//Agregar urls a los botones
		$.each($("#editar"),function(){
	    	$(this).attr("href", urlEditar)
		})
		$.each($("#eliminar"),function(){
	    	$(this).attr("href", urlEliminar)
		})

		//Desabilitar todos los chek
		$.each($("input[type='checkbox']"),function(){
	    	$(this).attr("disabled","disabled")
		})
		//Habilitar solo el que tengo seleccionado
		$.each($(`#checkId-${idPersona}`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})

	}

	else if(idPersona != null){
		idPersona = null
		//Quitar el boton de acciones
		$('#remove').remove()

		//Habilitar todos los chek
		$.each($(`input[type='checkbox']`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})
	}


	


	//console.log(ids)

	

})