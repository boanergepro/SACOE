let idPersona = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlLlamada = null
let urlVisita = null

let valorDataExitsLlamada = null
let valorDataExitsVisita = null
$("input[type='checkbox']").click(function(event){
	
	let valorAtributoId = $(this).attr('data-persona_id')
	/*
		-valores del atributo data-exits-llamada:
		0l = No ha sido llamado
		1l = Ya fue llamado
		
		-valores del atributo data-exits-visita:
		0v = NO ha sido visitao
		1v = Ya fue visitado
	*/ 
	valorDataExitsLlamada = $('#llamada-' + valorAtributoId).attr('data-exits-llamada')
	valorDataExitsVisita = $('#visita-' + valorAtributoId).attr('data-exits-visita')

	console.log(`llamada: ${valorDataExitsLlamada} visita: ${valorDataExitsVisita}`)

	if(idPersona == null){
		
		idPersona = valorAtributoId
		urlLlamada ="/persona/contacto/llamada/" + idPersona
		urlVisita = "/persona/contacto/visita/" + idPersona

		if (valorDataExitsLlamada == 'true' && valorDataExitsVisita == 'false') {

			$('#contenedor-boton-acciones').append(`

				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">

				    <a class="btn-floating btn-large red pulse">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="llamada" class="btn-floating purple disabled">
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
		}

		else if (valorDataExitsLlamada == 'false' && valorDataExitsVisita == 'true') {

			$('#contenedor-boton-acciones').append(`

				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">

				    <a class="btn-floating btn-large red pulse">
				      <i class="material-icons">menu</i>
				    </a>
				    <ul>
				      <li class="waves-effect waves-light">
				      	<a id="llamada" class="btn-floating purple">
				      		<i class="material-icons">perm_phone_msg</i>
				      	</a>
				      </li>

				      <li class="waves-effect waves-light">
				      	<a id="visita" class="btn-floating teal disabled">
				      		<i class="material-icons">store</i>
				      	</a>
				      </li>

				    </ul>
				 </div>
			`)
		}
		else {

			$('#contenedor-boton-acciones').append(`

				<div id="remove" class="fixed-action-btn horizontal click-to-toggle">

				    <a class="btn-floating btn-large red pulse">
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
		}

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