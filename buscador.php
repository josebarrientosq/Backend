<?php
  require('libreria.php');
  
  $ciudad=$_POST['Ciudad'];
  $tipo=$_POST['Tipo'];
  $precini=$_POST['Precioini'];
  $precfin=$_POST['Preciofin'];
  echo json_encode(buscar($precini,$precfin,$ciudad,$tipo));


?>
