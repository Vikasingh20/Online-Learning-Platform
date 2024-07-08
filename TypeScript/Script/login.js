var Prac;
(function (Prac) {
    var Typescript;
    (function (Typescript) {
        var login = /** @class */ (function () {
            function login() {
            }
            // Define a method called validate for user login validation
            login.prototype.validate = function () {
                var _this = this;
                var email;
                var pswd;
                // Retrieve values from the input fields with corresponding IDs
                email = document.getElementById("UserName").value;
                pswd = document.getElementById("password").value;
                // Check if either email or password is not valid and display an appropriate message
                if (!this.isValid(email) || !this.isValid(pswd)) {
                    $("#message").html("kindly fill details");
                }
                else if (!this.isValid(email)) {
                    $("message").html("kindly fill your emailid");
                }
                else if (!this.isValid(pswd)) {
                    $("message").html("kindly enter your password");
                }
                else {
                    // Make an AJAX request to validate the user credentials
                    $.ajax({
                        type: "GET", url: "http://localhost:53057/api/SignUp?email=" + email + "&pass=" + pswd, success: function (response) {
                            if (response == null) {
                                // Check the response and redirect the user based on the UserType
                                $("#message").html("User Not Found Or Check The Details You Have entered");
                            }
                            else {
                                if (response.UserType == "Admin") {
                                    $("#message").css("display", "none");
                                    window.location.href = "AdminSignUp.html";
                                    // Clear localStorage
                                    localStorage.clear();
                                }
                                else if (response.UserType == "Instructor") {
                                    $("#message").css("display", "none");
                                    window.location.href = "InstructorCourse.html";
                                    localStorage.clear();
                                }
                                else {
                                    $("#message").css("display", "none");
                                    localStorage.clear();
                                    localStorage.setItem("userIdFromStorage", response.UserID);
                                    localStorage.setItem("userNameFromStorage", response.Names);
                                    window.location.href = "Product.html";
                                }
                            }
                        },
                        // Display an error message
                        error: function (err) {
                            _this.showMessage(err);
                        }
                    });
                }
            };
            // Method to check if a value is valid (not empty, undefined, or null)
            login.prototype.isValid = function (value) {
                if (value != '' && value != undefined && value != null) {
                    return true;
                }
                else {
                    return false;
                }
            };
            // Method to display a message using an alert
            login.prototype.showMessage = function (message) {
                alert(message);
            };
            return login;
        }());
        Typescript.login = login;
    })(Typescript = Prac.Typescript || (Prac.Typescript = {}));
})(Prac || (Prac = {}));
var typescriptExamples = new Prac.Typescript.login();
