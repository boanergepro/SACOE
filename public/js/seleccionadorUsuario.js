let idPersona = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditar = null


$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idPersona == null){

		idPersona = valorAtributoId
		urlEditar ="/usuario/editar/" + idPersona
		
	

			$('#contenedor-boton-acciones').append(`

		
			<div id="remove" class="fixed-action-btn">
			    <a class="btn-floating btn-large red" id="editar">
			      <i class="material-icons">border_color</i>
			    </a>
			 </div>
  		`)

		

		//Agregar urls a los botones
		$.each($("#editar"),function(){
	    	$(this).attr("href", urlEditar)
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