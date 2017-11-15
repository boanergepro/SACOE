$(document).ready(() => {

	fetch(`${location.origin}/directorio`, {

		method: 'get'

	}).then((response) => {
		return response.json();
	})
	.then((data) => {
		
		let datos = {}
		for(let i = 0; i < data.length; i++){
			if (data[i].telegram_id != null) {
				datos[`${data[i].nombre} ${data[i].apellido}`] = data[i].telegram_id
			}
			 
		}

		console.log(datos)
		$('input.autocomplete').autocomplete({

    		data: datos,
    		limit: 20,
    		onAutocomplete: function(val) {
      			
      			let telegram_id = parseInt(datos[val])
      			
      			//guardar el telegram_id en local storage
      			localStorage.setItem("telegram_id", datos[val])
      			$("button[type='submit']").click(function(event){

      				//Peticion POST
					let url = `${location.origin}/enviarTelegram`,
					params = {
						method: "post",
						headers: {
				        	'Accept': 'application/json',
				        	'Content-Type': 'application/json'
				      	},
						body: JSON.stringify({
							telegram_id : localStorage.getItem("telegram_id"),
							persona_id: localStorage.getItem("persona_id")
						})
					}

					fetch(url, params).then( (response) => {
						console.log("Los datos para enviar el telegram han sido enviados")
						swal({
  							title: 'Mensaje enviado!',
  							text: 'Presione Ok para continuar',
  							confirmButtonColor: '#3f51b5',
  							type: 'success',
  							confirmButtonText: 'Ok'
						})
					}).catch( e => {
						console.log("Los datos no han sido envidas") 
					})
				})
			},
			minLength: 1
		})
	}).catch((err) => {

		console.log(err)

	})
})