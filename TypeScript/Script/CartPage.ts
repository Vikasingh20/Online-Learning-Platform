
namespace CartPage {
    export namespace Typescript {
        // Define a class called Cart
        export class Cart {
            ViewProduct(): any {
                //Created function 

                $(document).ready(function (): any {
                    try {
                        // // Make an AJAX request to retrieve enrolled courses
                        $.ajax({
                            type: "GET", url: "http://localhost:53057/api/Enrolled", success: (response) => {
                                $(".data").remove();
                                if (response.length == 0) {
                                    $(".cart-empty").css("display", "inline");
                                }
                                else {
                                    $(".cart-empty").css("display", "none");
                                }
                                let userId = localStorage.getItem("userIdFromStorage");
                                for (var i = 0; i < response.length; i++) {
                                    var productDetails = response[i];
                                    //  // Check if the product belongs to the current user
                                    if (productDetails.UserID == userId) {
                                        var str = "<div class='product-box'><img src='" + productDetails.Img + "' class='product-img'><h2 class='product-title'>" + productDetails.Title + "</h2><h3 class='product-description'>" + productDetails.Desriptions + "</h3><span class='price'>Rs: " + productDetails.Fee + "</span><button class='buy-now remove-item' data-enrollId=" + productDetails.EnrolledID + " data-courseTitle=" + productDetails.Title + " data-courseFee=" + productDetails.Fee + " data-Img=" + productDetails.Img + " data-content=" + productDetails.Content + " data-description=" + productDetails.Descriptions + " data-category=" + productDetails.Category + ">Unenroll</button></div>"
                                        $(".shop-content").append(str);
                                    }
                                   
                                }
                            }, error: (err) => {
                                alert(err)
                                console.log(err);
                            }
                        });
                    } catch (error) {
                        alert(error)
                    }

                    $(document).on("click", ".remove-item", (event: any) => {
                        var enrollId = $(event.target).attr("data-enrollId");
                        // // Make an AJAX request to retrieve enrolled courses

                        $.ajax({
                            type: "DELETE", url: "http://localhost:53057/api/Enrolled?ID=" + enrollId, success: (response) => {
                                alert("You have successfully unenrolled from the course.")
                                window.location.href = "CartPage.html";
                            },
                            error: (err) => {
                                alert(err);
                            }
                        });
                    });
                }
                )
            }
        }
    }
}

// Create an instance of the Cart class and call the ViewProduct method
let cartObj = new CartPage.Typescript.Cart();
cartObj.ViewProduct();
