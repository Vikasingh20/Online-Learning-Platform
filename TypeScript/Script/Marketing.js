var Prod;
(function (Prod) {
    var Typescript;
    (function (Typescript) {
        var Marketing = /** @class */ (function () {
            function Marketing() {
            }
            //---------  function to display product 
            Marketing.prototype.ViewProduct = function () {
                var _this = this;
                // Retrieve the submitPayment element from the document
                var submitPayment = document.body.querySelector("#submitPayment");
                try {
                    // Make an AJAX request to retrieve marketing courses
                    $.ajax({
                        type: "GET", url: "http://localhost:53057/api/Courses", success: function (response) {
                            $(".data").remove();
                            for (var i = 0; i < response.length; i++) {
                                var productDetails = response[i];
                                if (productDetails.Category == "Marketing") {
                                    var str = "<div class='product-box'><img src='" + productDetails.Img + "' class='product-img'><h2 class='product-title'>" + productDetails.Title + "</h2><h3 class='product-description'>" + productDetails.Descriptions + "</h3><span class='price'>Rs: " + productDetails.Fee + "</span><button class='buy-now add-cart' data-courseId=" + productDetails.CourseID + " data-courseTitle=" + encodeURIComponent(productDetails.Title) + " data-courseFee=" + productDetails.Fee + " data-Img=" + encodeURIComponent(productDetails.Img) + " data-content=" + encodeURIComponent(productDetails.Content) + " data-description=" + encodeURIComponent(productDetails.Descriptions) + " data-category=" + encodeURIComponent(productDetails.Category) + ">Enroll</button></div>";
                                    $(".shop-content").append(str);
                                }
                            }
                        }
                    });
                }
                catch (error) {
                    // Display an alert for any error that occurs during the AJAX request
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
                        // Store data in localStorage for payment processing
                        localStorage.setItem("courseId", courseID);
                        localStorage.setItem("courseTitle", courseTitle);
                        localStorage.setItem("courseDescription", description);
                        localStorage.setItem("courseContent", content);
                        localStorage.setItem("courseImage", tag);
                        localStorage.setItem("courseCategory", category);
                        localStorage.setItem("courseFee", Fee);
                        window.location.href = "Paynow.html";
                    }
                    catch (error) {
                        alert(error.message);
                    }
                });
                // Check if the submitPayment element exists
                if (submitPayment != null) {
                    submitPayment.addEventListener("click", function () {
                        var cardNo = $("#cardNumber").val();
                        var expiryDate = $("#expiryDate").val();
                        var cvv = $("#cvv").val();
                        // Check if payment details are valid
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
                        // Retrieve course details from localStorage
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
                                // Display an alert for any error that occurs 
                                _this.showMessage(err);
                            }
                        });
                    });
                }
                // this.ViewProduct();
            };
            // Method to check if a value is valid (not empty, undefined, or null)
            Marketing.prototype.isValid = function (value) {
                if (value != '' && value != undefined && value != null) {
                    return true;
                }
                else {
                    return false;
                }
            };
            Marketing.prototype.showMessage = function (message) {
                // Display an alert for any error that occurs 
                alert(message);
            };
            return Marketing;
        }());
        Typescript.Marketing = Marketing;
    })(Typescript = Prod.Typescript || (Prod.Typescript = {}));
})(Prod || (Prod = {}));
// Create an instance of the Marketing class from the Prod.Typescript namespace
var typescriptMarketing = new Prod.Typescript.Marketing();
typescriptMarketing.ViewProduct();
