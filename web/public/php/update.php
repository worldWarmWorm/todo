<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$pdo = (new DB)->get_pdo();
$id = $_POST['id'];
$name = $_POST['name'];
if ($id) {
    $sql = "UPDATE names SET name = :name WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->execute(['id' => $id, 'name' => $name]);
//    header('Location: /');
} else {
    echo `Пользователя с id "{$id}" в базе не найдено`;
    exit();
}