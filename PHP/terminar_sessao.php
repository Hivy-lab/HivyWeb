<?php
    session_start();
    include "./base.php";
    $novo = new base("","","","");
    $novo->terminar_sessao();
    header('Location: /index.php');
    echo 'Terminando a sessão... Aguarde alguns segundos.';
?>
