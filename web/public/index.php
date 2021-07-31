<?php
require_once '../app/vendor/autoload.php';
use App\Datatype\DB;

$rows = (new DB())->get_all_tasks();
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Менеджер заданий</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <main class="app">
        <header class="header">
            <h1>Менеджер заданий</h1>
        </header>
        <section class="form-section">
            <form action="./php/add.php" method="POST" class="main-form">
                <div id="form-details">
                    <input type="text" name="name" id="input-task" placeholder="Введите задание" autocomplete="off">
                    <button type="reset" id="reset" class="btn-reset"></button>
                    <button type="submit" id="ready" class="btn btn-ready" disabled>Готово</button>
                </div>
                <button type="button" id="add_task" title="Добавить задание"></button>
                <button type="button" id="delete_all" title="Удалить все задания" disabled></button>
            </form>
        </section>
        <section class="list-section">
                <?php
                if ($rows) {
                    $num = 1;
                    echo '<ol id="names_list">';
                    foreach ($rows as $row) {
                        echo '
                            <li class="task">
                                <p id="row_'.$row['id'].'">'. $row['name'] .'</p>
                                <a href="/php/remove.php?id='.$row['id'].'">
                                    <button type="button" id="delete_data_'.$num.'"></button>
                                </a>
                                <button type="button" id="update_data_'.$num. '"></button>
                                <form class="form-update" action="/php/update.php" method="post">
                                    <input type="text" name="name" id="update_name' . $num .'" autocomplete="off">
                                    <input type="hidden" name="id" value="'.$row['id'].'">
                                    <button type="button" class="btn" id="save_data_'.$num .'">Сохранить</button>
                                </form>
                            </li>
                        ';
                        $num++;
                    }
                    echo '</ol>';
                } else {
                    echo '
                        <div class="empty">
                            <div class="animation-background"></div>
                            <svg height="64pt" viewBox="-66 0 569 569.286" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="m.109375 66.382812v493.132813c0 5.238281 4.246094 9.484375 9.484375 9.484375h360.367188c5.234374 0 9.480468-4.246094 9.480468-9.484375v-398.296875c0-.210938-.101562-.390625-.121094-.597656-.046874-.832032-.210937-1.652344-.484374-2.4375-.105469-.304688-.179688-.597656-.3125-.894532-.460938-1.03125-1.101563-1.972656-1.898438-2.777343l-94.832031-94.832031c-.804688-.800782-1.75-1.441407-2.789063-1.898438-.285156-.121094-.574218-.222656-.871094-.3125-.792968-.273438-1.617187-.4375-2.457031-.492188-.160156.027344-.347656-.074218-.546875-.074218h-265.535156c-5.238281 0-9.484375 4.242187-9.484375 9.480468zm346.957031 85.351563h-62.457031v-62.457031zm-327.992187-75.867187h246.570312v85.351562c0 5.234375 4.246094 9.480469 9.480469 9.480469h85.351562v379.335937h-341.402343zm0 0"/><path d="m398.410156 493.132812v18.964844h28.449219c5.238281 0 9.484375-4.242187 9.484375-9.480468v-493.132813c0-5.238281-4.246094-9.484375-9.484375-9.484375h-360.367187c-5.238282 0-9.484376 4.246094-9.484376 9.484375v28.449219h18.96875v-18.96875h341.398438v474.167968zm0 0"/><path d="m75.976562 189.667969h227.597657v18.964843h-227.597657zm0 0"/><path d="m75.976562 132.765625h75.867188v18.96875h-75.867188zm0 0"/><path d="m75.976562 246.566406h151.734376v18.96875h-151.734376zm0 0"/><path d="m246.675781 246.566406h56.898438v18.96875h-56.898438zm0 0"/><path d="m75.976562 303.464844h227.597657v18.96875h-227.597657zm0 0"/><path d="m75.976562 417.265625h227.597657v18.96875h-227.597657zm0 0"/><path d="m161.324219 360.367188h142.25v18.964843h-142.25zm0 0"/><path d="m75.976562 360.367188h66.382813v18.964843h-66.382813zm0 0"/><path d="m75.976562 474.167969h37.933594v18.964843h-37.933594zm0 0"/><path d="m132.875 474.167969h170.699219v18.964843h-170.699219zm0 0"/>
                            </svg>
                            <div class="empty-phrase">Заданий нет</div>
                        </div>
                    ';
                }
                ?>
        </section>
    </main>


    <script src="js/main.js"></script>
</body>
</html>
