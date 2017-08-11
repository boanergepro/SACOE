//Pruebas
/*
$(document).ready(function(){
    $('.slider').slider();
});
*/
//NavBar
$('.sideNav').sideNav({

      menuWidth: 250, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
});

//Selects del formulario
$(document).ready(function() {

    $('select').material_select();

});

//modals
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('.dropdown-button').dropdown({
      constrainWidth: false, // para permitir o no que cambie el tamaño
      hover: true, //Prar ejecutarlo con hover
      belowOrigin: true, //Para ver debajo del boton
    })

});
      
//Calendario
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 300, // Creates a dropdown of 15 years to control year
    
    toString(data, format) {
    	return "19/09/1994";
    }

});

$(document).ready(function(){
    $('ul.tabs').tabs();
  });

//tooltip para mostrar numeros
 $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  })

 //Slider de la vista inicio
 $(document).ready(function(){
      $('.slider').slider({
        height: 550
      });
});