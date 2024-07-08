namespace Prod{
    export namespace Typescript{
        export class Home{
                //---------  function to display product 
       ViewProduct():any{
        
        let submitPayment : any =<HTMLElement>document.body.querySelector("#submitPayment");      
        try {
          $.ajax({
            type: "GET", url: "http://localhost:53057/api/Courses", success: (response) => {
                $(".data").remove();
                for (let i = 0; i < response.length; i++) {
                   let productDetails = response[i]; 

                  let str = "<div class='product-box'><img src='"+productDetails.Img+"' class='product-img'><h2 class='product-title'>"+productDetails.Title+"</h2><h3 class='product-description'>"+productDetails.Descriptions+"</h3><span class='price'>Rs: "+productDetails.Fee+"</span><button class='buy-now add-cart' data-courseId="+productDetails.CourseID+" data-courseTitle="+encodeURIComponent(productDetails.Title)+" data-courseFee="+productDetails.Fee+" data-Img="+encodeURIComponent(productDetails.Img)+" data-content="+encodeURIComponent(productDetails.Content)+" data-description="+encodeURIComponent(productDetails.Descriptions)+" data-category="+encodeURIComponent(productDetails.Category)+">Enroll</button></div>"

                   // var str = "<div class='card-div'><div class='img'><img src='"+productDetails.Tag+"'></div><div class='name'>"+productDetails.ProductName+"</div><span class='price'>Rs. "+productDetails.Price+"/-</span><div class='btn'><button class='add-cart' data-prodId="+productDetails.ProductID+" data-prodName="+productDetails.ProductName+" data-prodPrice="+productDetails.Price+" data-tag="+productDetails.Tag+">Add to Cart</button></div><div class='stock'><span>Only "+productDetails.Quantity+" left in stock</span></div></div>"
                    $(".shop-content").append(str);
    
                }
            }
        });
        } catch (error) {
          alert(error)
        }

         // ---------- script to add product to cart
         $(document).on("click", ".add-cart", (event) => {
          alert("Please Login to Enroll for any Course.");
         });

       }


        }
    }
}
//Created object 
let homeObj =new Prod.Typescript.Home();
homeObj.ViewProduct();

