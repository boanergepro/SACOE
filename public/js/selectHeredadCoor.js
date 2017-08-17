$('#remove').remove()
$('#rol').change(event => {
	//2 es el id del rol coordinador
	if(event.target.value == 2){

		$('#select-heredad').append(`

			<div id="remove">
			    <select name="heredad">
			      	<option value="" disabled selected>Seleccione la heredad de este coordinador</option>
			      	<option value="1">Heredad 1</option>
			      	<option value="2">Heredad 2</option>
			      	<option value="3">heredad 3</option>
			      	<option value="4">heredad 4</option>
			      	<option value="5">heredad 5</option>
			      	<option value="6">heredad 6</option>
			      	<option value="7">heredad 7</option>
			      	<option value="8">heredad 8</option>
			      	<option value="9">heredad 9</option>
			      	<option value="10">heredad 10</option>
			      	<option value="11">heredad 11</option>
			      	<option value="12">heredad 12</option>
					
			    </select>
		    	<label>Heredad</label>
			</div>
  		`)
  		//Construir el select
  		$('select').material_select();

	}else{
		$('#remove').remove()
	}
})