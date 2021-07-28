<?php
require_once './config.php';

if ($name = $_POST['name']) {
    $sql = "INSERT INTO names (name) VALUES (:name)";
    $query= $pdo->prepare($sql);
    $query->execute(['name' => $name]);
} else {
    echo 'Введите имя!';
    exit();
}

header('location: /');



