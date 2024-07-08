var Prod;
(function (Prod) {
    var Typescript;
    (function (Typescript) {
        var index = /** @class */ (function () {
            function index() {
            }
            //---------  function to display product 
            index.prototype.ViewProduct = function () {
                var _this = this;
                //for retriving the data
                var submitPayment = document.body.querySelector("#submitPayment");
                try {
                    $.ajax({
                        //getting the data using Ajax
                        type: "GET", url: "http://localhost:53057/api/Courses", success: function (response) {
                            $(".data").remove();
                            for (var i = 0; i < response.length; i++) {
                                var productDetails = response[i];
                                if (productDetails.Category == "Coding") {
                                    var str = "<div class='product-box'><img src='" + productDetails.Img + "' class='product-img'><h2 class='product-title'>" + productDetails.Title + "</h2><h3 class='product-description'>" + productDetails.Descriptions + "</h3><span class='price'>Rs: " + productDetails.Fee + "</span><button class='buy-now add-cart' data-courseId=" + productDetails.CourseID + " data-courseTitle=" + encodeURIComponent(productDetails.Title) + " data-courseFee=" + productDetails.Fee + " data-Img=" + encodeURIComponent(productDetails.Img) + " data-content=" + encodeURIComponent(productDetails.Content) + " data-description=" + encodeURIComponent(productDetails.Descriptions) + " data-category=" + encodeURIComponent(productDetails.Category) + ">Enroll</button></div>";
                                    $(".shop-content").append(str);
                                }
                            }
                        }
                    });
                }
                catch (error) {
                    //// Display an alert for any error that occurs 
                    alert(error);
                }
                // ---------- script to add product to cart
                $(document).on("click", ".add-cart", function (event) {
                    var courseID;
                    var courseTitle;
                    var Fee;
                    var tag;
                    var userId;
                    var content;
                    var description;
                    var category;
                    var userName;
                    try {
                        courseID = $(event.target).attr("data-courseId");
                        courseTitle = decodeURIComponent(String($(event.target).attr("data-courseTitle")));
                        Fee = $(event.target).attr("data-courseFee");
                        userId = localStorage.getItem("userIdFromStorage");
                        userName = localStorage.getItem("userNameFromStorage");
                        tag = decodeURIComponent(String($(event.target).attr("data-Img")));
                        content = decodeURIComponent(String($(event.target).attr("data-content")));
                        description = decodeURIComponent(String($(event.target).attr("data-description")));
                        category = decodeURIComponent(String($(event.target).attr("data-category")));
                        localStorage.setItem("courseId", courseID);
                        localStorage.setItem("courseTitle", courseTitle);
                        localStorage.setItem("courseDescription", description);
                        localStorage.setItem("courseContent", content);
                        localStorage.setItem("courseImage", tag);
                        localStorage.setItem("courseCategory", category);
                        localStorage.setItem("courseFee", Fee);
                        //  submitPayment.addEventListener("click",()=>{
                        //   $.ajax({
                        //        type: "POST", url: "http://localhost:53057/api/Enrolled", data: { "UserID": userId, "Names": userName, "CourseID": courseID, "Title": courseTitle, "Desriptions": description, "Content": content, "Fee": Fee, "Img": tag, "Category": category, "CourseStatus": "Enrolled" },
                        //        success: () => {
                        //         //  alert("Course added to your cart");
                        //         window.location.href = "CartPage.html";
                        //        }, error: (err) => {
                        //          alert(err);
                        //        }
                        //      });
                        //  });
                        window.location.href = "Paynow.html";
                        // localStorage.setItem("EnrollmentDetails",courseDetails);
                        //---------- Inserting data to Order Table
                        //  $.ajax({
                        //    type: "POST", url: "http://localhost:53057/api/Enrolled", data: { "UserID": userId, "Names": userName, "CourseID": courseID, "Title": courseTitle, "Desriptions": description, "Content": content, "Fee": Fee, "Img": tag, "Category": category, "CourseStatus": "Enrolled" },
                        //    success: () => {
                        //      alert("Course added to your cart");
                        //    }, error: (err) => {
                        //      alert(err);
                        //    }
                        //  });
                    }
                    catch (error) {
                        //// Display an alert for any error that occurs 
                        alert(error.message);
                    }
                });
                if (submitPayment != null) {
                    submitPayment.addEventListener("click", function () {
                        var cardNo = $("#cardNumber").val();
                        var expiryDate = $("#expiryDate").val();
                        var cvv = $("#cvv").val();
                        if (!_this.isValid(cardNo) || !_this.isValid(expiryDate) || !_this.isValid(cvv)) {
                            // this.showMessage("Please Enter Valid Details")
                            window.location.href = "cancel.html";
                            return;
                        }
                        else {
                            if (cardNo.length != 16 || expiryDate.length != 5 || cvv.length != 3) {
                                window.location.href = "cancel.html";
                                return;
                            }
                        }
                        var expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                        if (!expiryDateRegex.test(expiryDate)) {
                            alert("Enter Valid Expiry Date.");
                            return;
                        }
                        var courseId = localStorage.getItem("courseId");
                        var title = localStorage.getItem("courseTitle");
                        var description = localStorage.getItem("courseDescription");
                        var content = localStorage.getItem("courseContent");
                        var tag = localStorage.getItem("courseImage");
                        var category = localStorage.getItem("courseCategory");
                        var fee = localStorage.getItem("courseFee");
                        var userId = localStorage.getItem("userIdFromStorage");
                        var userName = localStorage.getItem("userNameFromStorage");
                        $.ajax({
                            type: "POST", url: "http://localhost:53057/api/Enrolled", data: { "UserID": userId, "Names": userName, "CourseID": courseId, "Title": title, "Desriptions": description, "Content": content, "Fee": fee, "Img": tag, "Category": category, "CourseStatus": "Enrolled" },
                            success: function () {
                                //  alert("Course added to your cart");
                                // window.location.href = "CartPage.html";
                                window.location.href = "success.html";
                            }, error: function (err) {
                                _this.showMessage(err);
                            }
                        });
                    });
                }
                // this.ViewProduct();
            };
            index.prototype.isValid = function (value) {
                if (value != '' && value != undefined && value != null) {
                    return true;
                }
                else {
                    return false;
                }
            };
            index.prototype.showMessage = function (message) {
                alert(message);
            };
            return index;
        }());
        Typescript.index = index;
    })(Typescript = Prod.Typescript || (Prod.Typescript = {}));
})(Prod || (Prod = {}));
//Created Object Reference
var typescriptEx = new Prod.Typescript.index();
typescriptEx.ViewProduct();
//     // ---------- script to add product to cart
// $(document).on("click", ".add-cart", (event) => {
//   let courseID: any;
//   let courseTitle: any;
//   let Fee: any;
//   let tag: any;
//   let userId: any;
//   let content: any;
//   let description: any;
//   let category: any;
//   let userName: any;
//   try {
//   courseID = $(event.target).attr("data-courseId");
//   courseTitle = $(event.target).attr("data-courseTitle");
//   Fee = $(event.target).attr("data-courseFee");
//   // var prodqty = $("#qty").val();
//   // prodQty = prompt("Please enter your quantity in numbers");
//   userId = localStorage.getItem("userIdFromStorage");
//   userName = localStorage.getItem("userNameFromStorage");
//   tag = $(event.target).attr("data-Img");
//   content = $(event.target).attr("data-content");
//   description = $(event.target).attr("data-description");
//   category = $(event.target).attr("data-category");
//     //---------- Inserting data to Order Table
//     $.ajax({
//       type: "POST", url: "http://localhost:53057/api/Enrolled", data: { "UserID": userId,"Names": userName, "CourseID": courseID, "Title": courseTitle, "Desriptions": description, "Content": content, "Fee": Fee, "Img": tag, "Category": category, "CourseStatus": "Enrolled" },
//       success: () => {
//         alert("Course added to your cart");
//       }, error: (err) => {
//         alert(err);
//       }
//     });
//   } catch (error: any) {
//     alert(error.message)
//   }
// });
//for accessing $jquery we'll have to create a function outside the class then ,use jquery by calling the function
