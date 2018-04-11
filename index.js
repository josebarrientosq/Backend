/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/

var buscarciudad=true
var buscartipo=true

function formato(obj,key){
  var tarjeta="<div class='row resultados'>"
  tarjeta+="<div class='col s12 m12'>"
  //tarjeta+="<h2 class'header'>Horizontal Card</h2>"
  tarjeta+="<div class='card horizontal'>"
  tarjeta+="<div class='row'>"
  tarjeta+="<div class='card-image col s6 m6'>"
  tarjeta+="<img src='home.jpg'>"
  tarjeta+="</div>"
  tarjeta+="<div class='card-stacked col s6 m6'>"
  tarjeta+="<div class='card-content'>"
  tarjeta+="<p>Direccion : "+obj[key].Direccion 
  tarjeta+="<p>Ciudad : "+obj[key].Ciudad
  tarjeta+="<p>Telefono : "+obj[key].Telefono
  tarjeta+="<p>Codigo postal : "+obj[key].Codigo_Postal
  tarjeta+="<p>Tipo : "+obj[key].Tipo
  tarjeta+="<p>Precio : "+obj[key].Precio
  tarjeta+="</div>"
  tarjeta+="<div class='card-action'>"
  tarjeta+="<a href='#'>ver mas</a>"
  tarjeta+="</div></div></div></div></div></div>"

  return tarjeta

}

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       //video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        //video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      //video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

//var parametros = {
  //              valorCaja1 : 1,
    //            valorCaja2 : 2,
      //  };



$( "#mostrarTodos" ).click(function() {
   
  $.ajax({

    url: './index.php',
   // dataType: 'text',
   // cache: false,
    //contentType: false,
    //processData: false,
    data: {vals : "5"},
    type: 'post',
    
    success: function(data){
      var obj = JSON.parse(data)
    
    $(".resultados").remove() 
       
    for (var key in obj){
     // console.log(obj[key].Id)
      //console.log(obj[key].Ciudad)
      
      $(".colContenido").append(formato(obj,key))
  
   // $(".colContenido").append(data[0])
    //console.log(obj[0].Ciudad)
      }
     

      
    },
    error: function(){
      alert("error al enviar los datos");
    }
   

  });




  
});


$(".filtroCiudad").click(function() {
 if(buscarciudad){

  $.ajax({

    url: './buscarciudad.php',
    data: {vals : "5"},
    type: 'post',
    
    success: function(data){
      var obj = JSON.parse(data)

            
    for (var key in obj)

      $("#selectCiudad").append("<option value='"+obj[key]+"'>"+obj[key]+"</option>")
 
   
     buscarciudad=false

      
    },
    error: function(){
      alert("error al enviar los datos");
    }
   

  });

  }
});


$(".filtroTipo").click(function() {
 if(buscartipo){

  $.ajax({

    url: './buscartipo.php',
    data: {vals : "5"},
    type: 'post',
    
    success: function(data){
      var obj = JSON.parse(data)

            
    for (var key in obj)


      $("#selectTipo").append("<option value='"+obj[key]+"'>"+obj[key]+"</option>")

    
     buscartipo=false

      
    },
    error: function(){
      alert("error al enviar los datos");
    }
   

  });

  }
});


$("#submitButton").click(function() {

  var rango = $("#rangoPrecio").val().split(";")

 

  $.ajax({

    url: './buscador.php',
    data: {

    "Ciudad" :  $("#selectCiudad").val(),
    "Tipo" :  $("#selectTipo").val(),
    "Precioini": rango[0],
    "Preciofin": rango[1]

     },
    type: 'post',
    
    success: function(data){
      var obj = JSON.parse(data)
     console.log(obj.length)


    $(".resultados").remove()
    if(obj.length==0)
      $(".colContenido").append("<div class='row resultados'>No se encontraron resultados</div>")
    else  
     $(".colContenido").append("<div class='row resultados'>Se encontraron "+obj.length +" resultados</div>")         
   for (var key in obj){

      $(".colContenido").append(formato(obj,key))
   }
  
    },
    error: function(){
      alert("error al enviar los datos");
    }
   

  });

  
});
