$(document).ready(function() {
    checkID(); //checks if valid adim, if so continue
    
    $("#createButton").on("click",function() {    //registers onClick event
        createNewAccount();
    });
    
    $("#logout").on("click",function() {
        window.localStorage.clear();
        window.location = "index.html";
    });
});

function checkID(){
    var adminID = window.localStorage.getItem("adminID");
    if (adminID == null){
        window.location = "index.html";
    }
}

function createNewAccount() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var username = document.getElementById("createUsername").value;
    var password = document.getElementById("createPassword");
    var passwordConf = document.getElementById("passwordConf");
    
    if (password.value != passwordConf.value) {
        alert("Passwords do not match. Please try again.");
        password.value = "";
        passwordConf = "";
    }
    else if (firstName == "" || lastName == "" || phoneNumber == "" || username == "" || password.value == "" || passwordConf == "") {
         alert("Please fill out all fields");
    }
    else {
        	$.post("scripts/createNewAccount.php", 
				   $("#createAccountForm :input"),
					function(data) 
					{
						if (data == "already exists") {   //admin account already exists for that user
							$("#status").html("<span style='color: red; font-size: 18px'>Admin account for that username already exists.</span>");
						}
						else {
							$("#status").html("<span style='color: green; font-size: 22px'>New admin account created.</span>");
						}
                
                	});
                $("#createAccountForm").submit( function() {
					return false;
				});
   			} 
    }