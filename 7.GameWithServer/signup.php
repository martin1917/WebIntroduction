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
    <link rel="stylesheet" href="./css/signup.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./js/signup.js"></script>
    <title>7laba</title>
</head>

<body>
    <div class="wrapper">
        <div class="box">
            <form action="" id="form">
                <div class="header">Регистрация</div>
                <div class="field">
                    <div>
                        <div>Логин</div>
                        <div><input type="text" name="login" autocomplete="off"></div>
                    </div>
                    <div class="error" id="login"></div>
                </div>
                <div class="field">
                    <div>
                        <div>Имя</div>
                        <div><input type="text" name="name" autocomplete="off"></div>
                    </div>
                    <div class="error" id="name"></div>
                </div>
                <div class="field">
                    <div>
                        <div>Пароль</div>
                        <div><input type="password" name="pas"></div>
                    </div>
                    <div class="error" id="pas"></div>
                </div>
                <div class="field">
                    <div>
                        <div>Повторить пароль</div>
                        <div><input type="password" name="repas"></div>
                    </div>
                    <div class="error" id="repas"></div>
                </div>
                <div class="signup">
                    <input type="submit" value="SIGN UP">
                </div>
            </form>
        </div>
        <div>Вы уже зарегистрированы?<a href="login.php">Login</a></div>
    </div>
</body>

</html>