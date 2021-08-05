<?php

namespace AppTest\Datatype;


use App\Datatype\DB;
use PDO;
use PHPUnit\Framework\TestCase;

class DBTest extends TestCase {
    public function testGetPdo() {
        $this->assertContainsOnlyInstancesOf(PDO::class, [(new DB())->get_pdo()], 'Contains not only instance of class "PDO".');
    }
}
