$(document).ready(function() {
    checkID(); //checks if cookie is present & valid, if so login
    $("#signIn").click( function() {
		sendRequest();
	});
});

function checkID(){
    var adminID = window.localStorage.getItem("adminID");
    if (adminID != null){
        if (adminID > 0) {
           window.location = "welcome.html";
        }
    }
}

//can submit username/password by pressing enter key
function enterPressed(){
    if (window.event.keyCode==13){
        sendRequest();
    }else {
        //do nothing
    }
}

//sends info to php server to verify username/password
function sendRequest() {
	if($("#username").val() == "" || $("#password").val() == "") 
		{
			$("#incorrectPass").html("<div style='color: red; padding: 3px'>Please enter both username and password</div>");
		}
		else
			$.post("scripts/VerifyLogin.php", 
				   $("#loginForm :input").serializeArray(),
					function(data) 
					{
						if(data == -1) 
						{
							$("#incorrectPass").html("<div style='color: red; padding: 3px'>Invalid username or password.  Please try again</div>");
						}
						else {
							window.localStorage.setItem("adminID", data);
							window.location.replace("welcome.html");	
						}		
					});
			$("#loginForm").submit( function() {
				return false;
	});
}

