<?php
require_once '../../app/vendor/autoload.php';
use App\Datatype\DB;

$db = new DB();
$pdo = $db->get_pdo();

if ($name = htmlspecialchars($_POST['name'])) {
    $sql = "INSERT INTO names (name) VALUES (:name)";
    $query= $pdo->prepare($sql);
    $query->execute(['name' => $name]);
    print_r(json_encode($db->get_all_tasks()));
} else {
    echo 'Ошибка на сервере. Попробуйте позже.';
}



