<?php
/*
    получение задания
*/
$operation = array(
    1 => "+",
    2 => "-",
    3 => "*",
    4 => "/"
);
$exercise = array();

//уровни сложности
$minD = 0;
$maxD = 10;
$minOp = 1;
$maxOp = 1;

if (2 <= $_COOKIE['score'] && $_COOKIE['score'] <= 4) {
    $minD = 0;
    $maxD = 100;
    $minOp = 1;
    $maxOp = 2;
} else if (5 <= $_COOKIE['score'] && $_COOKIE['score'] <= 8) {
    $minD = -100;
    $maxD = 100;
    $minOp = 1;
    $maxOp = 3;
} else if (9 <= $_COOKIE['score'] && $_COOKIE['score'] <= 15) {
    $minD = -250;
    $maxD = 500;
    $minOp = 1;
    $maxOp = 4;
} else if (16 <= $_COOKIE['score'] && $_COOKIE['score'] <= 20) {
    $minD = -1000;
    $maxD = 1000;
    $minOp = 1;
    $maxOp = 4;
} else if (21 <= $_COOKIE['score']) {
    $minD = -10000;
    $maxD = 10000;
    $minOp = 1;
    $maxOp = 4;
}

//получение псевдо-случайных чисел
$exercise["param1"] = rand($minD, $maxD);
$exercise["operation"] = $operation[rand($minOp, $maxOp)];
switch ($exercise["operation"]) {
    case "+":
        $exercise["param2"] = rand(1 - $exercise["param1"], 10 - $exercise["param1"]);
        if ($exercise["param2"] < 0)
            $exercise["param2"] = "(" . $exercise["param2"] . ")";

        break;
    case "-":
        $exercise["param2"] = rand($exercise["param1"] - 1, $exercise["param1"] - 10);
        if ($exercise["param2"] < 0)
            $exercise["param2"] = "(" . $exercise["param2"] . ")";

        break;
    case "*":
        $numerator = rand(1, 10);
        $exercise["param2"] = "(" . $numerator . "/" . $exercise["param1"] . ")";
        break;
    case "/":
        $denominator = rand(1, 10);
        $exercise["param2"] = "(" . $exercise["param1"] . "/" . $denominator . ")";
        break;
}

header("Content-Type: application/json");
echo json_encode($exercise);
