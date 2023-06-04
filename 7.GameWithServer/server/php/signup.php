<?php
/*
    создать новый аккаунт (зарегистрироваться)
*/
session_start();

$data =  json_decode(file_get_contents('php://input'));

$errors = array(
    "login" => "",
    "name" => "",
    "pas" => "",
    "repas" => ""
);

/*Валидация*/
if (empty($data->login)) {
    $errors['login'] = "Вы не ввели Логин";
} else if (preg_match('/ +/', $data->login)) {
    $errors['login'] = "Логин не может содержать пробелы";
}
if (empty($data->name)) {
    $errors['name'] = "Вы не ввели Имя";
} else if (preg_match('/ +/', $data->name)) {
    $errors['name'] = "Имя не может содержать пробелы";
}

if (empty($data->pas)) {
    $errors['pas'] = "Вы не ввели Пароль";
} else if (preg_match('/ +/', $data->pas)) {
    $errors['pas'] = "Пароль не может содержать пробелы";
}

if (!empty($data->pas) && !preg_match('/ +/', $data->pas) && strcmp($data->pas, $data->repas) != 0) {
    $errors['repas'] = "Пароли не совпадают!";
}

/*Проверка существования данного юзера*/
$incorrect = false;
foreach ($errors as $er) {
    if (strcmp($er, "") != 0) {
        $incorrect = true;
        break;
    }
}

$errors['user'] = "";
unset($data->repas);
if (!$incorrect) {
    $f = fopen('../log/user.txt', 'a+');
    while ($line = fgets($f)) {
        $user = json_decode(substr($line, 0, -1));
        if ($data->login == $user->login) {
            $errors['user'] = "Данный пользователь уже зарегистрирован";
            break;
        }
    }

    if (!$errors['user']) {
        $_SESSION["login"] = $data->login;
        setcookie("score", 0, time() + 3600, "/");
        setcookie("name", $data->name, time() + 3600, "/");
        $text = json_encode($data) . "\n";
        fwrite($f, $text);
    }
}

header('Content-Type: application/json');
echo json_encode($errors);
