$(document).ready(() => {

	const con = new WebSocket('ws://localhost:3001/socket')

	con.onopen = () => {
		
		console.log('Conectado')

		//Enviarle informacion al backen
		con.send('Estoy conectado')
	}
	con.onerror = (err) => {
		console.log(err)
	}
	//Recibir informacion de backend
	con.onmessage = (e) => {

		let data = JSON.parse(e.data)
		
		console.log(data)

		if (data.length > 0){
			console.log(`numero de notificaciones ${data.length}`)

			//Mostar el punto rojo en la campanita cundo haya alguna notificacion
			$('#active-notifi').append(`

				<p class="num-notificaciones white-text"> ${data.length} </p>
		
			`)
			//Mostar el numero de notificaciones
			$('#num-notifi').append(`

				<span class="new badge red right"> ${data.length}</span>
		
			`)
			

			//Agregar las notificaciones
			for (i = 0; i < data.length; i++){

				//Formatear la fecha
				let fecha_real = data[i].fecha.split("T")[0]
				let fecha_mostrar = fecha_real.split("-").reverse().join("/")

				$('#dropdown1').append(`
					<li>
						<a class="blue-grey-text"> ${data[i].descripcion} 
							<p class="small grey-text" style="margin-top: 0%; margin-bottom: 0%; font-size: 0.8em"> Hecho ${fecha_mostrar}</p>
						</a>
						
					</li>
				`)
			}
			$('#dropdown1').append(`
					<li class="divider"></li>
					<li>
						<a href="/marcar_leidas" class="black-text">
							<i class="material-icons indigo-text">clear_all</i> 
							Marcar como vistas.
						</a>
					</li>

			`)


		}else{

			$('#num-notifi').append(`

				<span class="new badge red right"> ${0}</span>
		
			`)
			$('#dropdown1').append(`
					<li class="divider"></li>
					<li>
						<a href="" class="black-text"> No hay notificaciones por leer, puede ir a notificaciones para ver el historico.</a>
					</li>
			`)
			
		}
		
	}
})

