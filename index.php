<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Autenticação</title>
</head>
<body>
    <h1>Autenticação</h1>
    <form method="post" action="<?php htmlspecialchars($_SERVER['PHP_SELF']); ?>">
        <label for="email">Indique o email do utilizador:</label>
        <br>
        <input type="email" name="email" id="email" required />
        <br>
        <label for="password">Indique a senha:</label>
        <br>
        <input type="password" name="password" id="password" required />
        <br><br>
        <input type="submit" value="Submeter" />
    </form>

    <?php
        include "./PHP/base.php";

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $email = $_POST['email'];
            $senha = $_POST['password'];

            $novo = new base("",$senha,$email,"");
            $resultado = $novo->login();

            if ($resultado->num_rows == 1) {
                $novo->criar_sessao();
                header('location: menu.html');
            }
            else
                echo "<p>Login errado!</p>";
        }
    ?>
    <p><a href="/PHP/criar.php">register</a></p>
</body>
</html>