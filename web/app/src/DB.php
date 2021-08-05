<?php


namespace App\Datatype;
use MongoDB\Driver\Exception\RuntimeException;
use PDO;
use PDOException;

class DB {
    private string $host = 'mysql';
    private string $port = '3306';
    private string $username = 'root';
    private string $password = 'root';
    private string $dbname = 'todo';
    private string $charset = 'utf8';

    /**
     * @return string
     */
    private function get_dsn(): string {
        return 'mysql:host='.$this->host.';dbname='.$this->dbname.';charset='.$this->charset.';port='.$this->port;
    }

    /**
     * @return PDO
     */
    private function db_connect(): PDO {
        try {
            return new PDO($this->get_dsn(), $this->username, $this->password);
        } catch (PDOException $e) {
            throw new RuntimeException($e->getMessage());
        }
    }

    /**
     * @return PDO
     */
    public function get_pdo(): PDO {
        return (new self())->db_connect();
    }

    /**
     * @return array
     */
    public function get_all_tasks(): array {
        $pdo = $this->get_pdo();
        $sql = "SELECT * FROM names";
        $query = $pdo->query($sql);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * @param $id
     * @return array
     */
    public function get_task($id): array {
        $pdo = $this->get_pdo();
        $sql = "SELECT id, name FROM names where id = :id";
        $query = $pdo->prepare($sql);
        $query->execute(['id' => $id]);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}