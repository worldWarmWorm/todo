<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$db = new DB();
$pdo = $db->get_pdo();
$id = $_POST['id'];
$name = $_POST['name'];
if ($id && $name) {
    $sql = "UPDATE names SET name = :name WHERE id = :id";
    $query = $pdo->prepare($sql);
    $query->execute(['id' => $id, 'name' => $name]);
    print_r(json_encode($db->get_task($id)));
} else {
    echo 'Ошибка сервера. Повторите позже.';
}