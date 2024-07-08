
namespace Demo {
    // created class 
   export namespace Sg {
        export class Signup {
            /**
         * this method id for validation 
         */
            validate(): any {
                let functionName: string = "validate";
                let name: any;
                let email: any;
                let pswd: any;
                let cnfpswd: any;
                try {
                    //Use Try catch block to handle the exception
                    name = ($("#name")).val();
                email = ($("#email")).val();
                pswd = ($("#password")).val();
                cnfpswd = ($("#confirm_password")).val();

                // num1 = (<HTMLInputElement>document.getElementById("number1")).value;
                if (!this.isValid(name) || !this.isValid(email) || !this.isValid(pswd)|| !this.isValid(cnfpswd)) {
                    this.showMessage("kindly fill details");
                }
                else {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    }else{
                        this.showMessage("You have entered an invalid email address!")
                        return;
                    }
                    if (pswd == cnfpswd) {
                        // $("#btnSignUp").attr("type",'submit');
                        $.ajax({
                            type: "POST", 
                            url: "http://localhost:53057/api/SignUp", 
                            data: { "Names": name, "Passwords": pswd, "Email": email, "UserType": "Student" }, 
                            success: (response) => {
                                // alert("hello"); 
                                location.replace("login.html");
                            }, error: (err) => {
                                this.showMessage("Error inside ajax" + err);
                            }
                        });

                    }
                    else {
                        this.showMessage("Please check your Password and Confirm Password");
                    }
                }
                } catch (error: any) {
                    // Display an error message
                    this.showMessage(functionName+": "+error.message)
                }

                
            }
            isValid(value: any){
                if(value != '' && value != undefined && value != null){
                    return true;
                }
                else{
                    return false;
                }
            }
            showMessage(message: any){
                alert(message);
            }
        }
    }

}
// let typescriptExample = new Demo.Typescript.BasicPrograms();
let typescriptExampless = new Demo.Sg.Signup();
//npm install typescript --save-dev

// npm install -g typescript

