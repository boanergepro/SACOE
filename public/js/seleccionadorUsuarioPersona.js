let idPersona = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlLlamada = null
let urlVisita = null

$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	console.log(valorAtributoId)

	if(idPersona == null){

		idPersona = valorAtributoId
		urlLlamada ="/persona/contacto/llamada/" + idPersona
		urlVisita = "/persona/contacto/visita/" + idPersona


		$('#contenedor-boton-acciones').append(`


			<div id="remove" class="fixed-action-btn horizontal click-to-toggle">

			    <a class="btn-floating btn-large red">
			      <i class="material-icons">menu</i>
			    </a>
			    <ul>
			      <li class="waves-effect waves-light">
			      	<a id="llamada" class="btn-floating purple">
			      		<i class="material-icons">perm_phone_msg</i>
			      	</a>
			      </li>

			      <li class="waves-effect waves-light">
			      	<a id="visita" class="btn-floating teal">
			      		<i class="material-icons">store</i>
			      	</a>
			      </li>

			    </ul>
			 </div>
		`)
		//Agregar urls a los botones
		$.each($("#llamada"),function(){
			$(this).attr("href", urlLlamada)
		})

		$.each($("#visita"),function(){
			$(this).attr("href", urlVisita)
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

})