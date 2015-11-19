<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

/*  Script takes POST request, grabs 'username' and 'password' from request */
/*  authenticates from database */
/*  return values:
 *      -1 - invalid username or password (don't log in)
 *      adminID - the adminID that corresponds to the username/password match
 */
    include 'DatabaseCredentials.php';
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
         die("Connection failed: " . $conn->connect_error);
    }
    
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $userID = -1;
    
    $sql = "SELECT * FROM Accounts WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);
    
    if(mysqli_num_rows($result) > 0){
    	$row = mysqli_fetch_assoc($result);
    	$userID = $row["adminID"];
    }
    echo $userID;
    
    $conn->close();
?>