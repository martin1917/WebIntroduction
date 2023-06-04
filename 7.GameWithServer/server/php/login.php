<?php
/*
    войти в аккаунт (авторизация)
*/
session_start();

$data =  json_decode(file_get_contents('php://input'));

/*Валидация*/
if (empty($data->login)) {
    echo "поле Логин пусто";
    exit(0);
} else if (preg_match('/ +/', $data->login)) {
    echo "поле Логин не может содержать пробелы";
    exit(0);
}
if (!empty($data->login) && empty($data->pas)) {
    echo "поле Пароль пусто";
    exit(0);
}

/*проверка существования юзера*/
$f = fopen('../log/user.txt', 'a+');
while ($line = fgets($f)) {
    $user = json_decode(substr($line, 0, -1));
    if (
        $data->login == $user->login &&
        $data->pas == $user->pas
    ) {
        $_SESSION['login'] = $data->login;
        setcookie("score", 0, time() + 3600, "/");
        setcookie("name", $user->name, time() + 3600, "/");
        exit(0);
    }
}

echo 'Неверно введене Логин/Пароль';
