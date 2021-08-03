<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$pdo = (new DB)->get_pdo();
if ($id = htmlspecialchars($_GET['id'])) {
    $sql = "DELETE FROM names WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->execute(['id' => $id]);
} else {
    echo 'Ошибка сервера. Повторите позже.';
}