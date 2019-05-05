<?php
// Forked from https://gist.github.com/1809044
// Available from https://gist.github.com/nichtich/5290675#file-deploy-php
$WEBSITE = 'roisdigital ';
$TITLE   = $WEBSITE.'Git Deployment';
$VERSION = '0.11';
echo <<<EOT
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>$TITLE</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
$TITLE
$VERSION
-------
<br>
EOT;


$allowed = false;


$my_file = 'file.txt';
$handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
$data = $_SERVER['REMOTE_ADDR']."-";
fwrite($handle, $data);


if (strpos($_SERVER['REMOTE_ADDR'],'140.82.115')!==false){
    $data = "Found!-";
    fwrite($handle, $data);
    $allowed=true;
}
else {
    $data = "NOT\n";
    fwrite($handle, $data);
}

if (!$allowed) {
	header('HTTP/1.1 403 Forbidden');
 	echo "<span style=\"color: #ff0000\">Sorry, no hamster - better convince your parents!</span>\n";
    echo "</pre>\n</body>\n</html>";
    exit;
}

$data = "PULLING!\n";
fwrite($handle, $data);
fclose($handle);
flush();
// Actually run the update

$commands = array(
	'echo $PWD',
	'whoami',
	'git status',
	'git pull origin master',
    'git status',
	'git submodule sync',
	'git submodule update',
	'git submodule status',
    'test -e /usr/share/update-notifier/notify-reboot-required && echo "system restart required"',
    'echo "========== Letting you know that '.$TITLE.'"',
    'echo "========== Was a SUCCESS!!!!',
    'echo "==========       d(*O*)b ',
);

$output = "\n";
$log = "####### ".date('Y-m-d H:i:s'). " #######\n";

foreach($commands AS $command){
    // Run it
    $tmp = shell_exec("$command 2>&1");
    // Output
    $output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
    $output .= htmlentities(trim($tmp)) . "\n";
    $log  .= "\$ $command\n".trim($tmp)."\n";
}
$log .= "\n";
file_put_contents ('deploy-log.txt',$log,FILE_APPEND);
echo $output; 
?>
</pre>
</body>
</html>