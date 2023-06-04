<?php
session_start();
setcookie("score", 0, time() + 3600, "/");
if (!isset($_COOKIE['name'])) {
    session_destroy();
    header('Location: login.php');
}
if (!isset($_SESSION['login'])) {
    header('Location: login.php');
}

/*Сортировка файла со счетом*/
$f = fopen('./server/log/score.txt', 'a+');
$records = array();
while ($line = fgets($f)) {
    array_push($records, json_decode(substr($line, 0, -1)));
}

arsort($records, 0);
file_put_contents('./server/log/score.txt', "");

foreach ($records as $record) {
    fputs($f, json_encode($record) . "\n");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./js/index.js"></script>
    <title>Game</title>
</head>

<body>
    <div class="wrapper">
        <div class="wrapper__head">
            <div class="info">
                <div class="welcome">
                    Hello,
                    <span id="name"><?php echo $_COOKIE['name'] ?></span>
                </div>
                <div class="score">
                    Score =
                    <span id="score">0</span>
                </div>
            </div>
            <div class="begin">
                <div class="timer">
                    Time:
                    <input type="number" min="1" value="50">
                </div>
                <div class="start">
                    <input type="button" value="START">
                </div>
            </div>
            <div class="logout">
                Logout
            </div>
        </div>
        <div class="wrapper__body">
            <div class="message">Занято</div>
            <div class="exercise">
                <div class="task">2 + 7 = </div>
                <div class="answer"></div>
            </div>
            <div class="buttons">
                <div class="btn">1</div>
                <div class="btn">2</div>
                <div class="btn">3</div>
                <div class="btn">4</div>
                <div class="btn">5</div>
                <div class="btn">6</div>
                <div class="btn">7</div>
                <div class="btn">8</div>
                <div class="btn">9</div>
                <div class="btn">10</div>
            </div>
        </div>
        <div class="wrapper__footer">
            <div class="tables">
                <div class="table">
                    <table id="yourScore">
                        <tr>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Time</th>
                        </tr>
                    </table>
                </div>
                <div class="table">
                    <table id="generalScore">
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Time</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="message-score"></div>
    </div>
</body>

</html>