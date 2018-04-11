<?php

 function getData(){
    $data_file = fopen("./data-1.json","r");
    $data_readed = fread($data_file, filesize("./data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
  }

   function getInfoTodos(){
    $datos=getData();

    return $datos;
    
  }

  function getInfocityTipo($city , $tipo){
    $resultado=array();
    $datos=getData();

    foreach($datos as $key => $value) {
         if ($value['Ciudad']==$city && $value['Tipo']==$tipo)
            array_push($resultado,$value);
        
    }

    return $resultado;
  }

  function buscar($ini,$fin ,$city , $tipo){
    $resultado=array();
    $datos=getData();
    $precio;

    if($city=="nulo" && $tipo<>"nulo"){

      foreach($datos as $key => $value) {
        $precio=str_replace(",","",substr($value['Precio'], 1));
           if ($precio>$ini && $precio<$fin && $value['Tipo']==$tipo)
              array_push($resultado,$value);
          
      }
    }

    if($tipo=="nulo" && $city<>"nulo"){

      foreach($datos as $key => $value) {
        $precio=str_replace(",","",substr($value['Precio'], 1));
           if ($precio>$ini && $precio<$fin && $value['Ciudad']==$city)
              array_push($resultado,$value);
          
      }
    }

    if($tipo<>"nulo" && $city<>"nulo"){

      foreach($datos as $key => $value) {
        $precio=str_replace(",","",substr($value['Precio'], 1));
           if ($precio>$ini && $precio<$fin && $value['Ciudad']==$city && $value['Tipo']==$tipo)
              array_push($resultado,$value);
          
      }
    }

    return $resultado;
  }

function getInfobyId($id){
    foreach (getData() as $key => $value) {
      if ($id==$value['Direccion']) {
        return $value;
      }
    }
  }

function getInfobycity($city){
    $resultado=array();
    $datos=getData();
	
    foreach ( $datos as $key => $value) {
      if ($city==$value['Ciudad']) {
          array_push($resultado,$value);
      }
    }
    return $resultado;
  }


  function getcity(){
    $datos=getData();
    $resultado=array();
      
    foreach ( $datos as $key1 => $value1) 
       array_push($resultado,$value1['Ciudad']);

      
    return array_values(array_unique($resultado));

  }

  function getTipo(){
      $datos=getData();
      $resultado=array();
        
      foreach ( $datos as $key1 => $value1) 
         array_push($resultado,$value1['Tipo']);

        
      return array_values(array_unique($resultado));

    }



?>
