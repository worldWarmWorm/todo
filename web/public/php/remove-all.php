<?php
require_once './config.php';
$sql = "DELETE FROM names";
$query = $pdo->query($sql);
header('location: /');