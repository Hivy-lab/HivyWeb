<?php

class base {
    public const TEMPO = 120;

    public $conn;
    public $nome;
    public $senha;
    public $email;
    public $tipo;

    public function __construct($nome,$senha,$email,$tipo) {
        $this->nome = $nome;
        $this->senha = $senha;
        $this->email = $email;
        $this->tipo = $tipo;
        $this->conn = $this->ligarBD();
    }

    public function __destruct() {
        $this->fecharBD();
    }
    
    public function ligarBD() {
        // Create connection
        $conn = new mysqli("localhost", "root", "", "pw");

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    public function fecharBD() {
        $this->conn->close();
    }

    public function criar() {
        $sql = "INSERT INTO users (nome,senha,email,tipo) VALUES ('$this->nome','$this->senha','$this->email','$this->tipo')";
        $resultado = $this->conn->query($sql);
        // o resultado é boolenao: true or false
        return $resultado;
    }

    public function consultar_tudo() {
        $sql = "SELECT * FROM users";
        $resultado = $this->conn->query($sql);
        // o resultado é um conjunto de registos da tabela
        return $resultado;
    }

    public function consultar_um($id) {
        $sql = "SELECT * FROM users WHERE id=$id";
        $resultado = $this->conn->query($sql);
        // o resultado é um registo da tabela
        return $resultado;
    }

    public function atualizar($id) {
        $sql = "UPDATE users SET nome='$this->nome', senha='$this->senha', email='$this->email', tipo='$this->tipo'  WHERE id=$id";
        $resultado = $this->conn->query($sql);
        // o resultado é um booleano
        return $resultado;
    }

    public function apagar($id) {
        $sql = "DELETE FROM users WHERE id=$id";
        $resultado = $this->conn->query($sql);
        // o resultado é um booleano
        return $resultado;
    }

    public function login() {
        $sql = "SELECT * FROM users WHERE email='$this->email' AND senha='$this->senha'";
        $resultado = $this->conn->query($sql);
        // o resultado é um registo da tabela
        return $resultado;
    }

    // Sessão de duração limitada
    public function criar_sessao() {
        session_start();
        $_SESSION['email'] = $this->email;
        $_SESSION['inicio'] = time();
        $_SESSION['expira'] = time() + self::TEMPO;
    }

    public function terminar_sessao() {
        if(!empty($_SESSION)) {
            session_unset();
            session_destroy();
        }
    }

    // devolve true se a sessão existir e estiver ativa
    public function verificar_sessao() {
        if(empty($_SESSION))
            return false;
        elseif(time() > $_SESSION['expira']) {
            $this->terminar_sessao();
            return false;
        }
        else
            return true;
    }

}