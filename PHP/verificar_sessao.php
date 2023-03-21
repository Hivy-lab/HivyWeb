<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Verificar Sessão</title>
</head>
<body>
    <?php
        session_start();
    ?>
    <h1>Verificar Sessão</h1>
    <?php
        include_once "./base.php";

        $novo = new base("","","","");
        $resultado = $novo->verificar_sessao();

        if ($resultado) {
            echo "<p>Restam ",$_SESSION['expira']-time(),
            " segundos ao utilizador ", $_SESSION['email'],"</p>";
        }
        else
            header("location: index.php");
    ?>
    <p><a href="menu.html">Voltar</a></p>
</body>
</html>