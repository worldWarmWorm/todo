<?php


namespace App\Datatype;

use MongoDB\Driver\Exception\RuntimeException;
use PDO;
use PDOException;

class Config {
    private string $host = 'mysql';
    private string $port = '3306';
    private string $username = 'root';
    private string $password = 'root';
    private string $dbname = 'todo';
    private string $charset = 'utf8';

    private function get_dsn(): string {
        return 'mysql:host='.$this->host.';dbname='.$this->dbname.';charset='.$this->charset.';port='.$this->port;
    }

    public function db_connect(): PDO {
        try {
            return new PDO($this->get_dsn(), $this->username, $this->password);
        } catch (PDOException $e) {
            throw new RuntimeException($e->getMessage());
        }
    }
}