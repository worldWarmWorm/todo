<?php
require_once '../../app/vendor/autoload.php';
use \App\Datatype\DB;

$pdo = (new DB)->get_pdo();
$sql = "DELETE FROM names";
$query = $pdo->query($sql);
header('location: /');