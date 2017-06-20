<?php
	/*
	Plugin Name: DizPHP
	Plugin URI: http://dizcreation.com
	*/
	
	$msg = "php call";
	
	           
	
	if (isset($_POST['action']) && !empty($_POST['action'])) {
		$action = $_POST['action'];
		$query = $_POST['query'];
		$host = 'localhost';
		$db   = 'nexjen';
		$user = 'diztal';
		$pass = 'hypatia1';
		$charset = 'utf8';

		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		$opt = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
	/*	$pdo = new PDO($dsn, $user, $pass, $opt);
		$stmt = $pdo->prepare($query); // WHERE email = :email AND status=:status');
		$stmt->execute(); //['email' => $email, 'status' => $status]);
		$user = $stmt->fetchall();
		echo json_encode($user);     */
		
		switch ($action) {
			case 'test': 
				echo "php in the house";
				break;
			case 'sql':
				//echo $query;
				echo json_encode(showData($query));
				//echo "happy days";
				break;
			case 'insert':
				insertData($query);
				break;
				
				
		} // end switch           
		    
		
	}
	else {
		echo "failed";
	} 
	
	function insertData($data) {
		$host = 'localhost';
		$db   = 'nexjen';
		$user = 'diztal';
		$pass = 'hypatia1';
		$charset = 'utf8';
		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		$opt = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
		];
		$pdo = new PDO($dsn, $user, $pass, $opt);
		$pdo->exec($data);
		
	}      
	
	function showData($query) {
		$host = 'localhost';
		$db   = 'nexjen';
		$user = 'diztal';
		$pass = 'hypatia1';
		$charset = 'utf8';

		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		$opt = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		$pdo = new PDO($dsn, $user, $pass, $opt);
		
		$stmt = $pdo->prepare($query); // WHERE email = :email AND status=:status');
		$stmt->execute(); //['email' => $email, 'status' => $status]);
		$user = $stmt->fetchall();
		return $user;
	}   
	
?>