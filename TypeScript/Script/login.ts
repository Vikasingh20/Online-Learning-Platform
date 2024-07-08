namespace Prac {
  export namespace Typescript {
    export class login {
      /**
         * this method id for validating 
         */
      validate(): any {
        let email: any;
        let pswd: any;
 // Retrieve values from the input fields with corresponding IDs
        email = (<HTMLInputElement>document.getElementById("UserName")).value;
        pswd = (<HTMLInputElement>document.getElementById("password")).value;
// Check if either email or password is not valid and display an appropriate message
        if (!this.isValid(email) ||  !this.isValid(pswd)) {
          $("#message").html("kindly fill details");

        }
        else if (!this.isValid(email)) {
          $("message").html("kindly fill your emailid");
        }
        else if (!this.isValid(pswd)) {
          $("message").html("kindly enter your password")
        }

        else {
          // Make an AJAX request to validate the user credentials
          $.ajax({
            type: "GET", url: "http://localhost:53057/api/SignUp?email=" + email + "&pass=" + pswd, success: (response) => {
              if (response == null) {
                  // Check the response and redirect the user based on the UserType
                $("#message").html("User Not Found Or Check The Details You Have entered");
              }
              else {
                if (response.UserType == "Admin") {
                  $("#message").css("display", "none");
                  window.location.href = "AdminSignUp.html";
 // Clear localStorage
                  localStorage.clear()
                }
                else if (response.UserType == "Instructor") {
                  $("#message").css("display", "none");
                  window.location.href = "InstructorCourse.html";

                  localStorage.clear()
                }
                else {
                  $("#message").css("display", "none");
                  localStorage.clear()
                  localStorage.setItem("userIdFromStorage", response.UserID);
                  localStorage.setItem("userNameFromStorage", response.Names);

                  window.location.href = "Product.html"
                }
              }

            },
            // Display an error message
            error: (err) => {
              this.showMessage(err);
            }
          });
        }
      }
      // Method to check if a value is valid (not empty, undefined, or null)
      isValid(value: any) {
        if (value != '' && value != undefined && value != null) {
          return true;
        }
        else {
          return false;
        }
      }
       // Method to display a message using an alert
      showMessage(message: any) {
        alert(message);
      }
    }
  }

}
let typescriptExamples = new Prac.Typescript.login();

