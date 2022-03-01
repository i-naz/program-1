<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=2b16fa862a1ca44e187917563c894ed3';
$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['data'] = $decode['weather'];

	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
?> 