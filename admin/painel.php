<?php
session_start();
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header('Location: login.php');
    exit;
}

$dataFile = __DIR__ . '/data.json';
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

// Carregar imagens do JSON
$imagens = [];
if (file_exists($dataFile)) {
    $json = json_decode(file_get_contents($dataFile), true);
    if (isset($json['imagens'])) $imagens = $json['imagens'];
}

// Upload de imagens
if (!empty($_FILES['imagens']['name'][0])) {
    foreach ($_FILES['imagens']['tmp_name'] as $i => $tmp) {
        if ($_FILES['imagens']['error'][$i] === UPLOAD_ERR_OK) {
            $nome = basename($_FILES['imagens']['name'][$i]);
            $ext = strtolower(pathinfo($nome, PATHINFO_EXTENSION));
            $novoNome = uniqid('img_') . '.' . $ext;
            $destino = 'uploads/' . $novoNome;
            if (move_uploaded_file($tmp, $uploadDir . $novoNome)) {
                $imagens[] = $destino;
            }
        }
    }
    file_put_contents($dataFile, json_encode(['imagens' => $imagens], JSON_PRETTY_PRINT));
    header('Location: painel.php');
    exit;
}

// Exclusão de imagem
if (isset($_GET['excluir'])) {
    $img = $_GET['excluir'];
    $key = array_search($img, $imagens);
    if ($key !== false) {
        unset($imagens[$key]);
        if (file_exists(__DIR__ . '/' . $img)) unlink(__DIR__ . '/' . $img);
        $imagens = array_values($imagens);
        file_put_contents($dataFile, json_encode(['imagens' => $imagens], JSON_PRETTY_PRINT));
    }
    header('Location: painel.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Painel Admin</title>
</head>
<body>
    <h2>Painel Administrativo</h2>
    <p><a href="logout.php">Sair</a></p>
    <h3>Imagens do Carrossel</h3>
    <?php if (empty($imagens)): ?>
        <p>Nenhuma imagem cadastrada.</p>
    <?php else: ?>
        <div style="display:flex;flex-wrap:wrap;gap:20px;">
        <?php foreach ($imagens as $img): ?>
            <div style="text-align:center;">
                <img src="<?= htmlspecialchars($img) ?>" style="max-width:180px;max-height:120px;display:block;">
                <form method="get" style="margin-top:5px;">
                    <input type="hidden" name="excluir" value="<?= htmlspecialchars($img) ?>">
                    <button type="submit" onclick="return confirm('Excluir esta imagem?')">Excluir</button>
                </form>
            </div>
        <?php endforeach; ?>
        </div>
    <?php endif; ?>
    <hr>
    <h3>Adicionar novas imagens</h3>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="imagens[]" multiple required accept="image/*">
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
