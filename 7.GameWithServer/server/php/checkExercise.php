<?php
/*
    проверка ответа
*/
$data = json_decode(file_get_contents('php://input'));

function addScore()
{
    $num = ++$_COOKIE['score'];
    setcookie("score", $num, time() + 3600, "/");
}

switch ($data->operation) {
    case "+":
        //если второй аргумент содержит скобки, то удаляем их
        $par2 = 0;
        if (!(strpos($data->param2, "(") === false))
            $par2 = substr($data->param2, 1, strlen($data->param2) - 1);
        else
            $par2 = $data->param2;

        if ($data->param1 + $par2 == $data->answer) {
            addScore();
            echo true;
        } else echo false;
        break;

    case "-":
        //если второй аргумент содержит скобки, то удаляем их
        $par2 = 0;
        if (!(strpos($data->param2, "(") === false))
            $par2 = substr($data->param2, 1, strlen($data->param2) - 1);
        else
            $par2 = $data->param2;

        if ($data->param1 - $par2 == $data->answer) {
            addScore();
            echo true;
        } else echo false;
        break;

    case "*":
        $par2 = explode("/", substr($data->param2, 1, strlen($data->param2) - 1));
        if ($data->param1 * (int)$par2[0] / (int)$par2[1] == $data->answer) {
            addScore();
            echo true;
        } else echo false;
        break;

    case "/":
        $par2 = explode("/", substr($data->param2, 1, strlen($data->param2) - 1));
        if ($data->param1 * (int)$par2[1] / (int)$par2[0] == $data->answer) {
            addScore();
            echo true;
        } else echo false;
        break;
}
