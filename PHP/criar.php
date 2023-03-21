<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Formulário Criar</title>
</head>
<body>
    <h1>Criar Utilizador</h1>
    
    <?php
        include "./base.php";

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nome = $_POST['nome'];
            $senha = $_POST['senha'];
            $email = $_POST['email'];
            $tipo = $_POST['tipo'];
            $util = new base($nome,$senha,$email,$tipo);
            $resultado = $util->criar();
            if ($resultado) {
                echo "<br />Registo $nome criado.<br />";
            }
            else {
                echo "<br />Erro: registo não criado.<br />"; 
            }
        }
        else
            include "form_criar.html";
    ?>
    <p><a href="menu.html">Voltar</a></p>
</body>
</html>