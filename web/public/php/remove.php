<?php
require_once './config.php';

if ($id = $_GET['id']) {
    $sql = "DELETE FROM names WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->execute(['id' => $id]);
    header('Location: /');
} else {
    echo `Пользователя с id "{$id}" в базе не найдено`;
    exit();
}