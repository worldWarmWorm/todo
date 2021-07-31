<?php


namespace App\Datatype;
use PDO;

class DB extends Config {
    public function get_pdo(): PDO {
        return (new parent)->db_connect();
    }

    public function get_all_tasks(): array {
        $pdo = $this->get_pdo();
        $sql = "SELECT * FROM names";
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}