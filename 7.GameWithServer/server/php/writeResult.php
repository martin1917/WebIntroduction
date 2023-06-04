<?php
/*
    записать счет игрока в файл score.txt
*/
session_start();
$data = json_decode(file_get_contents('php://input'));

//открываем файл и заносим новую запись
$f = fopen('../log/score.txt', 'a+');

$text = json_encode(array(
    "login" => $_SESSION['login'],
    "name" => $_COOKIE['name'],
    "score" => $_COOKIE['score'],
    "time" => date('d.m.y H:i:s'),
    "dTime" => $data->dTime
)) . "\n";

fwrite($f, $text);
setcookie("score", 0, time() + 3600, "/");

$f = fopen('../log/score.txt', 'a+');
$records = array();
while ($line = fgets($f)) {
    array_push($records, json_decode(substr($line, 0, -1)));
}

arsort($records, 0);
file_put_contents('../log/score.txt', "");

foreach ($records as $record) {
    fputs($f, json_encode($record) . "\n");
}
