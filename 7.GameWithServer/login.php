<?php
session_start();
if (isset($_SESSION['login'])) {
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./js/login.js"></script>
    <title>7laba</title>
</head>

<body>
    <div class="wrapper">
        <div class="box">
            <form action="" id="form">
                <div class="header">Авторизция</div>
                <div class="field">
                    <div>Логин</div>
                    <div><input type="text" name="login" autocomplete="off"></div>
                </div>
                <div class="field">
                    <div>Пароль</div>
                    <div><input type="password" name="pas"></div>
                </div>
                <div class="error"></div>
                <div class="signup">
                    <input type="submit" value="LOG IN">
                </div>
            </form>
        </div>
        <div>Вы еще не зарегистрированы?<a href="signup.php">Sign up</a></div>
    </div>
</body>

</html>