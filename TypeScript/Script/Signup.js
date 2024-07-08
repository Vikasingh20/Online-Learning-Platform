var Demo;
(function (Demo) {
    // created class 
    var Sg;
    (function (Sg) {
        var Signup = /** @class */ (function () {
            function Signup() {
            }
            // created method for validating 
            Signup.prototype.validate = function () {
                var _this = this;
                var functionName = "validate";
                var name;
                var email;
                var pswd;
                var cnfpswd;
                try {
                    //Use Try catch block to handle the exception
                    name = ($("#name")).val();
                    email = ($("#email")).val();
                    pswd = ($("#password")).val();
                    cnfpswd = ($("#confirm_password")).val();
                    // num1 = (<HTMLInputElement>document.getElementById("number1")).value;
                    if (!this.isValid(name) || !this.isValid(email) || !this.isValid(pswd) || !this.isValid(cnfpswd)) {
                        this.showMessage("kindly fill details");
                    }
                    else {
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                        }
                        else {
                            this.showMessage("You have entered an invalid email address!");
                            return;
                        }
                        if (pswd == cnfpswd) {
                            // $("#btnSignUp").attr("type",'submit');
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:53057/api/SignUp",
                                data: { "Names": name, "Passwords": pswd, "Email": email, "UserType": "Student" },
                                success: function (response) {
                                    // alert("hello"); 
                                    location.replace("login.html");
                                }, error: function (err) {
                                    _this.showMessage("Error inside ajax" + err);
                                }
                            });
                        }
                        else {
                            this.showMessage("Please check your Password and Confirm Password");
                        }
                    }
                }
                catch (error) {
                    // Display an error message
                    this.showMessage(functionName + ": " + error.message);
                }
            };
            Signup.prototype.isValid = function (value) {
                if (value != '' && value != undefined && value != null) {
                    return true;
                }
                else {
                    return false;
                }
            };
            Signup.prototype.showMessage = function (message) {
                alert(message);
            };
            return Signup;
        }());
        Sg.Signup = Signup;
    })(Sg = Demo.Sg || (Demo.Sg = {}));
})(Demo || (Demo = {}));
// let typescriptExample = new Demo.Typescript.BasicPrograms();
var typescriptExampless = new Demo.Sg.Signup();
//npm install typescript --save-dev
// npm install -g typescript
