<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$pdo = (new DB)->get_pdo();

if ($id = $_GET['id']) {
    $sql = "DELETE FROM names WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->execute(['id' => $id]);
    header('Location: /');
} else {
    echo `Пользователя с id "{$id}" в базе не найдено`;
    exit();
}