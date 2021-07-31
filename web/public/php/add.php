<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$pdo = (new DB)->get_pdo();

if ($name = $_POST['name']) {
    $sql = "INSERT INTO names (name) VALUES (:name)";
    $query= $pdo->prepare($sql);
    $query->execute(['name' => $name]);
} else {
    echo 'Введите имя!';
    exit();
}

header('location: /');



