<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

/*Получаем все поля из массива data
и по ним формируем массив ошибок*/
$keys = array_keys($data);
$errors = array();
foreach ($keys as $key) {
    $errors[$key] = "";
}

/*Валидация*/
if ($data['book'] == "0") {
    $errors['book'] = "Выберете книгу";
}
if (strlen($data['count']) == 0) {
    $errors['count'] = "Вы не указали количество";
}

if ($data['delivery']) {
    $data['delivery'] = 1;

    if (strlen($data['city']) == 0) {
        $errors['city'] = "Вы не написали свой город";
    } else if (preg_match('/ +/', $data['city']) || preg_match('/\d+/', $data['city'])) {
        $errors['city'] = "Название города не должно содержать пробелов и цифр";
    }

    if (strlen($data['street']) == 0) {
        $errors['street'] = "Вы не написали свою улицу";
    } else if (preg_match('/ +/', $data['street']) || preg_match('/\d+/', $data['street'])) {
        $errors['street'] = "Название улицы не должно содержать пробелов и цифр";
    }

    if (strlen($data['house']) == 0) {
        $errors['house'] = "Вы не написали номер своего дома";
    }
    if (strlen($data['flat']) == 0) {
        $errors['flat'] = "Вы не написали номер своей квартиры";
    }
} else {
    $data['delivery'] = 0;
}

$incorrect = false;
foreach ($errors as $er) {
    if (strcmp($er, "") != 0) {
        $incorrect = true;
        break;
    }
}

if (!$incorrect) {
    $data['time'] = date('d.m.y H:i:s');
    $data['login'] = $_SESSION['login'];
    $f = fopen('../log/order.txt', 'a+');
    $text = json_encode($data) . "\n";
    fwrite($f, $text);
}

header('Content-Type: application/json');
echo json_encode($errors);
