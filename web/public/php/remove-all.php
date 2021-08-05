<?php
require_once '../../app/vendor/autoload.php';
use \App\Datatype\DB;

$is_confirmed = htmlspecialchars($_GET['is_confirmed']);
if ($is_confirmed === 'yes') {
    $pdo = (new DB)->get_pdo();
    $sql = "DELETE FROM names";
    $query = $pdo->query($sql);
} else {
    echo 'Ошибка сервера. Повторите позже.';
}