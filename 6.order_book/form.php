<?php
/*
    Лёвин Максим
    20ВП1
    15
 */
session_start();
if (!isset($_COOKIE['name'])) {
    session_destroy();
    header('Location: index.php');
}
if (!isset($_SESSION['login'])) {
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/form.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="../js/form.js"></script>
    <title>7laba</title>
</head>

<body>
    <div class="wrapper">
        <div class="wrapper_head">
            <div class="weclome">Привет,<br> <span><?= $_COOKIE["name"] ?></span></div>
            <div class="logout">Выйти</div>
        </div>
        <div class="box">
            <form action="" id="form">
                <div class="header">Заказ книг</div>
                <div class="field">
                    <div>
                        <div>Книга</div>
                        <div>
                            <select name="book">
                                <option value="0"></option>
                                <option value="HP_1">Гарри Поттер и филосовский камень</option>
                                <option value="HP_2">Гарри Поттер и тайная комната</option>
                                <option value="HP_3">Гарри Поттер и кубок огна</option>
                                <option value="HP_4">Гарри поттер Орден Феникса</option>
                                <option value="VM_1">Война и мир 1 том</option>
                                <option value="VM_2">Война и мир 2 том</option>
                            </select>
                        </div>
                    </div>
                    <div class="error" id="book"></div>
                </div>
                <div class="field">
                    <div>
                        <div>Количество</div>
                        <div><input type="number" name="count" min="1" value="1"></div>
                    </div>
                    <div class="error" id="count"></div>
                </div>
                <div class="field">
                    <div>
                        <div>Доставка</div>
                        <div><input type="checkbox"></div>
                    </div>
                    <div class="error" id="chBox"></div>
                </div>
                <div class="field addres">
                    <div>
                        <div>Город</div>
                        <div><input type="text" name="city" autocomplete="off"></div>
                    </div>
                    <div class="error" id="city"></div>
                </div>
                <div class="field addres">
                    <div>
                        <div>Улица</div>
                        <div><input type="text" name="street" autocomplete="off"></div>
                    </div>
                    <div class="error" id="street"></div>
                </div>
                <div class="field addres">
                    <div>
                        <div>Дом</div>
                        <div><input type="number" name="house" min="1" value="1"></div>
                    </div>
                    <div class="error" id="house"></div>
                </div>
                <div class="field addres">
                    <div>
                        <div>Квартира</div>
                        <div><input type="number" name="flat" min="1" value="1"></div>
                    </div>
                    <div class="error" id="flat"></div>
                </div>
                <div class="oreder">
                    <input type="submit" value="ORDER">
                </div>
            </form>
        </div>
    </div>
</body>

</html>