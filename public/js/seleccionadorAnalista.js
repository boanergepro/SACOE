let idAnalista= null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditarAnalista = null
let urlEliminarAnalista = null


$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idAnalista== null){

		idAnalista= valorAtributoId
		urlEditarAnalista =  "/usuario/editar/" + idAnalista
		urlEliminarAnalista = "/usuario/eliminar/" + idAnalista
		
	

			$('#contenedor-boton-acciones-analista').append(`

		
				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
				    <a class="btn-floating btn-large red pulse">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="editarAnalista"class="btn-floating yellow" >
				      		<i class="material-icons">border_color</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="eliminarAnalista" class="btn-floating pink">
				      		<i class="material-icons">delete_forever</i>
				      	</a>
				      </li>
				 </div>
  		`)

		

		//Agregar urls a los botones
		$.each($("#editarAnalista"),function(){
	    	$(this).attr("href", urlEditarAnalista)
		})
		$.each($("#eliminarAnalista"),function(){
	    	$(this).attr("href", urlEliminarAnalista)
		})

		//Desabilitar todos los chek
		$.each($("input[type='checkbox']"),function(){
	    	$(this).attr("disabled","disabled")
		})
		//Habilitar solo el que tengo seleccionado
		$.each($(`#checkId-${idAnalista}`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})

	}

	else if(idAnalista!= null){
		idAnalista= null
		//Quitar el boton de acciones
		$('#remove').remove()

		//Habilitar todos los chek
		$.each($(`input[type='checkbox']`),function(){
	    	$(this).removeAttr("disabled","disabled")
		})
	}
})