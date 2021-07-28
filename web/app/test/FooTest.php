<?php

namespace AppTest\Datatype;

use App\Datatype\Foo;
use PHPUnit\Framework\TestCase;

class FooTest extends TestCase
{
    public function testGetName()
    {
        $foo = new Foo();
        $this->assertEquals($foo->getName(), 'Nginx PHP MySQL');
    }
}
