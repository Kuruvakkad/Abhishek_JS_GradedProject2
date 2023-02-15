function Login() {
    var a = new Array();
    up1 = new Object();
    up2 = new Object();
  
    up1 = {
      name: "test@gmail.com",
      password: btoa("open123")
    };
    up2 = {
      name: "beast@gmail.com",
      password: btoa("close123")
    };
    a.push(up1);
    a.push(up2);
  
    // authentication step
    // using map function for checking the validity of the user information from the LocalStorage and declaring a successful Login
    const hash = Object.assign(...a.map(e => ({ [e.name]: e.password })));
  
    // Extracting the currently logged-in user information
    var username = document.getElementById("uname").value;
    var password = btoa(document.getElementById("psw").value);
  
    if (hash[username] === password) {
      alert("Login Successful");
      sessionStorage.setItem("currentloggedin", username);
      // Storing the array of user objects. LocalStorage stores only string values
      localStorage.setItem("all_users", JSON.stringify(a));
  
      // code to prevent the user from going back to the login page
      if (typeof Storage !== "undefined") {
        sessionStorage.setItem("login", "true");
      }
      window.onpopstate = function (event) {
        if (sessionStorage.getItem("login") === "true") {
          history.go(1);
        }
      };
      
      // redirect to biodata.html page
      window.location.href = "resumes.html";
    } else {
      alert("Login Failed");
    }
  }
  