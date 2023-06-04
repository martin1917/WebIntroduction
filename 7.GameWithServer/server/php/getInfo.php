<?php
/*
    получить счет игроков
*/
session_start();

/*костыль (удаляет элементы, у которых одиковый логин)*/
function delDupl($array)
{
    $arr_new = array();

    $length = count($array);
    if ($length == 1) return $array;

    $cmp = "";
    for ($i = 0; $i < $length - 1; $i++) {
        if (
            $array[$i]->login != $cmp ||
            strlen($cmp) == 0
        ) {
            $cmp = $array[$i]->login;
            array_push($arr_new, $array[$i]);
            if ($array[$i + 1]->login != $cmp) {
                array_push($arr_new, $array[$i + 1]);
                $cmp = $array[$i + 1]->login;
            }
        }
    }

    if ($array[$length - 1]->login != $cmp) {
        array_push($arr_new, $array[$length - 1]);
    }

    return $arr_new;
}

$info = array();            //общая инфа
$myInfo = array();          //инфа о нас
$generalInfo = array();     //инфа об остальных игроках

$f = fopen('../log/score.txt', 'a+');
while ($line = fgets($f)) {
    $curr_score = json_decode(substr($line, 0, -1));
    if ($_SESSION['login'] == $curr_score->login) {
        array_push($myInfo, $curr_score);
    } else {
        array_push($generalInfo, $curr_score);
    }
}

$generalInfo = delDupl($generalInfo);  //удаляем записи с одниковыми логинами (Выводим только лучшие результаты игроков
array_push($info, $myInfo);
array_push($info, $generalInfo);

header('Content-Type: application/json');
echo json_encode($info);
