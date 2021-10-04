function register() {
    let email = document.getElementById("email").value;
    let passwd = document.getElementById('pwd').value;
    let passwdCheck = document.getElementById('pwdCheck').value;
    let acctLvl = document.getElementsByName("accessLvl");
    let last = document.getElementById("lname").value;

    //saving user data
    localStorage.setItem("email", email);
    localStorage.setItem("pwd", passwd);
    localStorage.setItem("lname", last);

    for (i = 0; i < acctLvl.length; i++) {
        if (acctLvl[i].checked) {
            localStorage.setItem("accessLvl", acctLvl[i].id);
            console.log("accessLvl set to", localStorage.getItem("accessLvl"))
        }
    }
    //validating registration
    if (passwd === passwdCheck) {
        console.log("Validating registration")
        console.log("Checking option 1")
        console.log("Password match test: ", passwd == passwdCheck)
        if (localStorage.getItem("accessLvl") == "mod" || localStorage.getItem("accessLvl") == "user") {
            console.log("Admin account test: ", localStorage.getItem("accessLvl") == "admin");
            alert("Account registration successful");
            window.location.href="login.html"
        }
        else if (passwd === passwdCheck) {
            console.log("Option 1 failed.  Member not mod or user with valid password.  Checking option 2")
            if (localStorage.getItem("accessLvl") == "admin") {
                console.log("Admin account test: ", localStorage.getItem("accessLvl") == "admin");
                console.log("License number set to ", document.getElementById("license").value);
                if (document.getElementById("license").value == "" || document.getElementById("license").value == null) {
                    console.log("License information test: ", document.getElementById("license").value != "" || document.getElementById("license").value == null);
                    alert("License number required for admin account");
                }
            }
        }
        else if (passwd === passwdCheck) {
            console.log("Option 2 failed.  Member not admin missing license number.  Checking option 3.")
            if (localStorage.getItem("accessLvl") == "admin") {
                console.log("Admin account test: ", localStorage.getItem("accessLvl") == "admin");
                if (document.getElementById("license").value != "" || document.getElementById("license").value != null) {
                    console.log("License number set to ", document.getElementById("license").value);
                    console.log("License information test: ", document.getElementById("license").value != "" || document.getElementById("license").value == null);
                    alert("Account registration successful");
                    window.location.href="login.html"
                }
            }
        }
        else if (passwd != passwdCheck) {
            console.log("Option 3 failed.  Member not an admin with license number.  Checking passwords.")
            console.log("Password match test: ", passwd == passwdCheck);
            alert("Passwords do not match");
        }
        else {
            console.log("Error:  No clauses matched.  Check script")
        }
    }
}


function login() {
    //assigning variables to user data input into fields
    let uname = document.getElementById("username").value;
    let userPwd = document.getElementById('pwd').value;
    let userAccessLvl = localStorage.getItem("accessLvl");

    //comparing input user data to registration data to permit or deny login
    console.log("checking user credentials...")
    if (localStorage.getItem("email") == "" || localStorage.getItem("email") == null) {
        console.log("Email exists: ", localStorage.getItem("email") == true);
        alert("Account not found.  Please click the 'Register New User' button to create an account.")
    }
    else if (localStorage.getItem("email") == "" || localStorage.getItem("email") == null) {
        console.log("Email test passed.  Checking password...")
        alert("Account not found.  Please click the 'Register New User' button to create an account.")
    }
    else if (uname !== localStorage.getItem("email") || userPwd !== localStorage.getItem("pwd")) {
        console.log("Email match test: ", uname !== localStorage.getItem("email"));
        console.log("Password match test: ", userPwd !== localStorage.getItem("pwd"));
        alert("Username or password is incorrect");
    } 
    else {
        alert("Login successful!")
        window.location.href='bulletin.html';
    }

    //alert based on access level
    if (userAccessLvl === "admin") {
        alert("YOU ARE LOGGED IN AS ADMINISTRATOR");
    } 
    else if (userAccessLvl == "mod") {
        alert("YOU ARE LOGGED IN AS A MODERATOR");
    } 
    else {
        alert("Welcome to the Vax-Track Platform!");
    }
}

//changes header based on user access level
function accessBanner() {
    let userAccessLvl = localStorage.getItem("accessLvl");

    if (userAccessLvl == "admin") {
        document.getElementById("mainH3").innerHTML = "ADMINISTRATOR";
        document.getElementById("mainH3Copy").innerHTML ="ADMINISTRATOR";
    } 
    else if (userAccessLvl == "mod") {
        document.getElementById("mainH3").innerHTML = "MODERATOR";
        document.getElementById("mainH3Copy").innerHTML = "MODERATOR";
    } 
    else {
        document.getElementById("mainH3").innerHTML = " ";
        document.getElementByID("mainH3Copy").innerHTML = " ";
    }

}

function logout() {
    //deletes items saved in localStorage and redirects user to landing page

    localStorage.removeItem("email");
    localStorage.removeItem("pwd");
    localStorage.removeItem("lname");
    localStorage.removeItem("accessLvl");
    localStorage.clear();
    alert("You have successfully logged out");
    window.location.href="index.html";
}

//reveal text box for license input if user wishes to register as an admin
function getLicense() {
    let adminSelected = document.getElementById("admin");
    let divText = document.getElementById("divText");
    divText.style.display = adminSelected.checked ? "block" : "none";
}


//add post to bulletin board
function post() {
    
    let userInput = document.getElementById("textArea1").value;
    let postList = document.getElementById("commentDisplay");
    let newComment = document.createElement("li");
    let delButton = document.createElement("button");
    delButton.textContent = "DELETE";
    delButton.style.marginLeft = "15px";

    
    //styling dynamically generated list items
    newComment.style.listStylePosition = "outside";
    
    //appending text to list element and list element to unordered list
    var tNode = document.createTextNode(userInput + " :  Posted by: " + localStorage.getItem("email") + " on " + " " + Date());
    newComment.appendChild(tNode);
    newComment.appendChild(delButton);
    postList.appendChild(newComment);

    //adding delete function to button
    delButton.addEventListener('click', function() {
        this.parentElement.remove();
    })
        
    //placing newest comments at top of list
    var commentDisplay = document.getElementById("commentDisplay");
    var i = commentDisplay.childNodes.length;
    while (i--)
        commentDisplay.appendChild(commentDisplay.childNodes[i]);
    
    //reset user input area
    forumForm.reset();
        
    return false;
    
}

