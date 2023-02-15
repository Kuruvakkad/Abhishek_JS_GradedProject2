function Login() {
    var a = [
      { name: 'test@gmail.com', password: btoa('open123') },
      { name: 'beast@gmail.com', password: btoa('close123') }
    ];
  
    // Extract username and password from input fields
    var username = document.getElementById('uname').value;
    var password = btoa(document.getElementById('psw').value);
  
    // Check if input credentials match stored user info
    var foundUser = a.find(user => user.name === username && user.password === password);
  
    if (foundUser) {
      // Store current logged-in user in session storage
      sessionStorage.setItem('currentloggedin', foundUser.name);
  
      // Store all user info in local storage
      localStorage.setItem('all_users', JSON.stringify(a));
  
      // Prevent user from going back to login page
      if (typeof(Storage) !== 'undefined') {
        sessionStorage.setItem('login', 'true');
      }
      window.onpopstate = function (event) {
        if (sessionStorage.getItem('login') === 'true') {
          history.go(1);
        }
      };
  
      // Redirect to biodata.html
      window.location.href = 'resumes.html';
    } else {
      alert('Login Failed');
    }
  }
  