var CartPage;
(function (CartPage) {
    var Typescript;
    (function (Typescript) {
        // Define a class called Cart
        var Cart = /** @class */ (function () {
            function Cart() {
            }
            Cart.prototype.ViewProduct = function () {
                //Created function 
                $(document).ready(function () {
                    try {
                        // // Make an AJAX request to retrieve enrolled courses
                        $.ajax({
                            type: "GET", url: "http://localhost:53057/api/Enrolled", success: function (response) {
                                $(".data").remove();
                                if (response.length == 0) {
                                    $(".cart-empty").css("display", "inline");
                                }
                                else {
                                    $(".cart-empty").css("display", "none");
                                }
                                var userId = localStorage.getItem("userIdFromStorage");
                                for (var i = 0; i < response.length; i++) {
                                    var productDetails = response[i];
                                    //  // Check if the product belongs to the current user
                                    if (productDetails.UserID == userId) {
                                        var str = "<div class='product-box'><img src='" + productDetails.Img + "' class='product-img'><h2 class='product-title'>" + productDetails.Title + "</h2><h3 class='product-description'>" + productDetails.Desriptions + "</h3><span class='price'>Rs: " + productDetails.Fee + "</span><button class='buy-now remove-item' data-enrollId=" + productDetails.EnrolledID + " data-courseTitle=" + productDetails.Title + " data-courseFee=" + productDetails.Fee + " data-Img=" + productDetails.Img + " data-content=" + productDetails.Content + " data-description=" + productDetails.Descriptions + " data-category=" + productDetails.Category + ">Unenroll</button></div>";
                                        $(".shop-content").append(str);
                                    }
                                }
                            }, error: function (err) {
                                alert(err);
                                console.log(err);
                            }
                        });
                    }
                    catch (error) {
                        alert(error);
                    }
                    $(document).on("click", ".remove-item", function (event) {
                        var enrollId = $(event.target).attr("data-enrollId");
                        // // Make an AJAX request to retrieve enrolled courses
                        $.ajax({
                            type: "DELETE", url: "http://localhost:53057/api/Enrolled?ID=" + enrollId, success: function (response) {
                                alert("You have successfully unenrolled from the course.");
                                window.location.href = "CartPage.html";
                            },
                            error: function (err) {
                                alert(err);
                            }
                        });
                    });
                });
            };
            return Cart;
        }());
        Typescript.Cart = Cart;
    })(Typescript = CartPage.Typescript || (CartPage.Typescript = {}));
})(CartPage || (CartPage = {}));
// Create an instance of the Cart class and call the ViewProduct method
var cartObj = new CartPage.Typescript.Cart();
cartObj.ViewProduct();
