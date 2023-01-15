<?php
    $mensajero = $_POST['idmensajero'];
    $guide = $_POST['idguia'];

    if($mensajero != 'Selecciona un mensajero' && $guide != '' ){
        echo json_encode('proccess');
    } else {
        echo json_encode('error');
    }
?> 