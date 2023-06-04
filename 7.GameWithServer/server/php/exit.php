<?php
/*
    выход из аккаунта
*/
session_destroy();
setcookie("name", "", time() - 3600, "/");
