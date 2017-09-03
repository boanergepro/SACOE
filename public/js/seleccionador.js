let idPersona = null
//Quitar ckeck
$("input[type='checkbox']").prop("checked", false)

//Urls de las acciones
let urlEditar = null
let urlVer = null
let urlLlamada = null
let urlVisita = null
let urlEliminar = null

//Url para cuando ya la persona ue llamada
let fueLlamado = null
let fueVisitado = null

//Valores por defecto
let valorDataExitsLlamada = null
let valorDataExitsVisita = null

$("input[type='checkbox']").click(function(event){
	//console.log($(this).attr('data-persona_id'))
	let valorAtributoId = $(this).attr('data-persona_id')

	valorDataExitsLlamada = $('#llamada-' + valorAtributoId).attr('data-exits-llamada')
	valorDataExitsVisita = $('#visita-' + valorAtributoId).attr('data-exits-visita')
	
	console.log(`llamada: ${valorDataExitsLlamada} visita: ${valorDataExitsVisita}`)

	if(idPersona == null){

		idPersona = valorAtributoId
		urlVer = "#modals" + idPersona
		urlEditar ="/persona/editar/" + idPersona
		urlLlamada ="/persona/contacto/llamada/" + idPersona
		urlVisita = "/persona/contacto/visita/" + idPersona
		urlEliminar = "#modal" + idPersona

		fueLlamado = "/persona/contacto/llamada/ver/" + idPersona
		fueVisitado = "/persona/contacto/visita/ver/" + idPersona

		//Detectar el ancho de la pantalla

		//El primer caso colocara un boton que despliega una barra con acciones, ideal para dispositivos moviles
		//El segundo caso tan solo pondra un boton con acciones deplegables
		if ($(window).width() <= 750){
			if (valorDataExitsLlamada == 'true' && valorDataExitsVisita == 'false') {

				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn toolbar">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">dialpad</i>
					    </a>
					    <ul>
					      <li class="waves-effect waves-light">
					      	<a id="editar">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="ver">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="fue_llamado">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="visita">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="" >
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a >
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="eliminar" >
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)

			}
			else if (valorDataExitsLlamada == 'false' && valorDataExitsVisita == 'true') {

				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn toolbar">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">dialpad</i>
					    </a>
					    <ul>
					      <li class="waves-effect waves-light">
					      	<a id="editar">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="ver">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a  id="llamada">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="fue_visitado">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="" >
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a >
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="eliminar" >
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)

			}
			else if (valorDataExitsLlamada == 'false' && valorDataExitsVisita == 'false') {

				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn toolbar">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">dialpad</i>
					    </a>
					    <ul>
					      <li class="waves-effect waves-light">
					      	<a id="editar">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="ver">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="llamada">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="visita">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="" >
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a >
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="eliminar" >
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)

			}
			else{
				//Fue llamado y visitado

				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn toolbar">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">dialpad</i>
					    </a>
					    <ul>
					      <li class="waves-effect waves-light">
					      	<a id="editar">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="ver">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="fue_llamado">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="fue_visitado">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="" >
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a >
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li class="waves-effect waves-light">
					      	<a id="eliminar" >
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)

			}

			
		}else{
			if (valorDataExitsLlamada == 'true' && valorDataExitsVisita == 'false') {
				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">menu</i>
					    </a>
					    <ul>
					      <li>
					      	<a id="editar" class="btn-floating yellow">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="ver" class="btn-floating green">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="fue_llamado" class="btn-floating purple ">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="visita" class="btn-floating amber">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating red">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating blue">
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li>
					      	<a class="btn-floating azul-telegram">
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li>
					      	<a id="eliminar" class="btn-floating pink">
					      		<i class="material-icons">delete_forever</i>
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
					      <li>
					      	<a id="editar" class="btn-floating yellow">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="ver" class="btn-floating green">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="llamada" class="btn-floating purple ">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="fue_visitado" class="btn-floating amber">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating red">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating blue">
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li>
					      	<a class="btn-floating azul-telegram">
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li>
					      	<a id="eliminar" class="btn-floating pink">
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)
			}
			else if (valorDataExitsLlamada == 'false' && valorDataExitsVisita == 'false') {
				$('#contenedor-boton-acciones').append(`

					<div id="remove" class="fixed-action-btn horizontal click-to-toggle">
					    <a class="btn-floating btn-large red pulse">
					      <i class="material-icons">menu</i>
					    </a>
					    <ul>
					      <li>
					      	<a id="editar" class="btn-floating yellow">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="ver" class="btn-floating green">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="llamada" class="btn-floating purple ">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="visita" class="btn-floating amber">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating red">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating blue">
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li>
					      	<a class="btn-floating azul-telegram">
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li>
					      	<a id="eliminar" class="btn-floating pink">
					      		<i class="material-icons">delete_forever</i>
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
					      <li>
					      	<a id="editar" class="btn-floating yellow">
					      		<i class="material-icons">border_color</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="ver" class="btn-floating green">
					      		<i class="material-icons">visibility</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="fue_llamado" class="btn-floating purple ">
					      		<i class="material-icons">perm_phone_msg</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="fue_visitado" class="btn-floating amber">
					      		<i class="material-icons">store</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating red">
					      		<i class="material-icons">picture_as_pdf</i>
					      	</a>
					      </li>

					      <li>
					      	<a id="" class="btn-floating blue">
					      		<i class="material-icons">email</i>
					      	</a>
					      </li>

					      <li>
					      	<a class="btn-floating azul-telegram">
					      		<i class="material-icons">
									<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		    							<path fill="#FFFFFF" d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" />
									</svg>
					      		</i>
					      		
					      	</a>
					      </li>

					      <li>
					      	<a id="eliminar" class="btn-floating pink">
					      		<i class="material-icons">delete_forever</i>
					      	</a>
					      </li>
					    </ul>
					 </div>
		  		`)
			}
			
		}

		

		//Agregar urls a los botones
		$.each($("#editar"),function(){
	    	$(this).attr("href", urlEditar)
		})
		
		$.each($("#ver"),function(){
	    	$(this).attr("href", urlVer)
		})
		$.each($("#eliminar"),function(){
	    	$(this).attr("href", urlEliminar)
		})
		$.each($("#llamada"),function(){
			$(this).attr("href", urlLlamada)
		})

		$.each($("#visita"),function(){
			$(this).attr("href", urlVisita)
		})
		//Url para cuando la persona si fue llamada
		$.each($("#fue_llamado"),function(){
			$(this).attr("href", fueLlamado)
		})
		$.each($("#fue_visitado"),function(){
			$(this).attr("href", fueVisitado)
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