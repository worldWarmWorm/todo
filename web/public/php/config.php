<?php
    $host = 'mysql';
    $port = '3306';
    $username = 'root';
    $password = 'root';
    $dbname = 'todo';
    $charset = 'utf8';
    $dsn = 'mysql:host='.$host.';dbname='.$dbname.';charset='.$charset.';port='.$port;

    try {
        $pdo = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        throw new RuntimeException($e->getMessage());
    }