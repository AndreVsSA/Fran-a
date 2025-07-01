<?php
session_start();
// Gere seu hash com password_hash('sua_senha', PASSWORD_DEFAULT)
$hash = '$2y$10$w5QK9pQn7n2QwQwQwQwQwOQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw'; // Troque pelo seu hash real
$erro = '';

if (isset($_POST['senha'])) {
    if (password_verify($_POST['senha'], $hash)) {
        $_SESSION['logado'] = true;
        header('Location: painel.php');
        exit;
    } else {
        $erro = 'Senha incorreta!';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Login Admin</title>
</head>
<body>
    <h2>Login Administrativo</h2>
    <?php if ($erro) echo "<p style='color:red;'>$erro</p>"; ?>
    <form method="post">
        <label>Senha:</label>
        <input type="password" name="senha" required>
        <button type="submit">Entrar</button>
    </form>
</body>
</html>
