<?php
/* Регистрация|Авторизация|Выход|Получение данных о юзере */
session_start();

$data =  json_decode(file_get_contents('php://input'));
$module = $data->module;
unset($data->module);

switch ($module) {
    case "signup":
        $errors = array(
            "login" => "",
            "name" => "",
            "email" => "",
            "phone" => "",
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

        if (empty($data->phone)) {
            $errors['phone'] = "Вы не ввели телефон";
        } else if (!preg_match('/^(?:\+7|8)\d{10}$/', $data->phone)) {
            $errors['phone'] = "Не корректный ввод телефона." . "<br>" . "(Пример: +79874562145 или 89874562145)";
        }

        if (empty($data->email)) {
            $errors['email'] = "Вы не ввели email";
        } else if (!preg_match("/[0-9a-z]+@[a-z]/", $data->email)) {
            $errors['email'] = "Не корректный ввод email";
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
                setcookie("name", $data->name, time() + 3600, "/");
                $text = json_encode($data) . "\n";
                fwrite($f, $text);
            }
        }

        header('Content-Type: application/json');
        echo json_encode($errors);
        break;
    case "login":
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
                setcookie("name", $user->name, time() + 3600, "/");
                exit(0);
            }
        }

        echo 'Неверно введене Логин/Пароль';
        break;
    case "exit":
        session_destroy();
        setcookie("name", "", time() - 3600, "/");
        break;
    case "info":
        $info = array();
        $userInfo = array();
        $userOrder = array();
        $user = false;

        /*Данные пользователя*/
        $f = fopen('../log/user.txt', 'a+');
        while ($line = fgets($f)) {
            $curr_user = json_decode(substr($line, 0, -1));
            if ($_SESSION['login'] == $curr_user->login) {
                $user = $curr_user;
                break;
            }
        }

        if ($user != false) {
            $userInfo['phone'] = $user->phone;
            $userInfo['email'] = $user->email;
            $userInfo['login'] = $user->login;
        }

        /*Заказы пользователя*/
        $f = fopen('../log/order.txt', 'a+');
        while ($line = fgets($f)) {
            $curr_order = json_decode(substr($line, 0, -1));

            if ($_SESSION['login'] == $curr_order->login) {
                $order = array();
                $order['book'] = $curr_order->book;
                $order['count'] = $curr_order->count;
                $order['delivery'] = $curr_order->delivery;
                $order['city'] = "";
                $order['street'] = "";
                $order['house'] = "";
                $order['flat'] = "";

                if ($curr_order->delivery) {
                    $order['city'] = $curr_order->city;
                    $order['street'] = $curr_order->street;
                    $order['house'] = $curr_order->house;
                    $order['flat'] = $curr_order->flat;
                }

                $order['time'] = $curr_order->time;
                array_push($userOrder, $order);
            }
        }

        /*добавление userInfo[] и userOrder[] в info[]*/
        array_push($info, $userInfo);
        array_push($info, $userOrder);

        header('Content-Type: application/json');
        echo json_encode($info);
        break;
}
