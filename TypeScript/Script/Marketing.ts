namespace Prod{
    export namespace Typescript{
        export class Marketing{
                //---------  function to display product 
       ViewProduct():any{
          // Retrieve the submitPayment element from the document
        let submitPayment : any =<HTMLElement>document.body.querySelector("#submitPayment");      
        try {
         
           // Make an AJAX request to retrieve marketing courses
          $.ajax({
            type: "GET", url: "http://localhost:53057/api/Courses", success: (response) => {
                $(".data").remove();
                for (let i = 0; i < response.length; i++) {
                   let productDetails = response[i]; 

                   if(productDetails.Category == "Marketing"){
                    let str = "<div class='product-box'><img src='"+productDetails.Img+"' class='product-img'><h2 class='product-title'>"+productDetails.Title+"</h2><h3 class='product-description'>"+productDetails.Descriptions+"</h3><span class='price'>Rs: "+productDetails.Fee+"</span><button class='buy-now add-cart' data-courseId="+productDetails.CourseID+" data-courseTitle="+encodeURIComponent(productDetails.Title)+" data-courseFee="+productDetails.Fee+" data-Img="+encodeURIComponent(productDetails.Img)+" data-content="+encodeURIComponent(productDetails.Content)+" data-description="+encodeURIComponent(productDetails.Descriptions)+" data-category="+encodeURIComponent(productDetails.Category)+">Enroll</button></div>"
                    $(".shop-content").append(str);
                   }
    
                }
            }
        });
        } catch (error) {
           // Display an alert for any error that occurs during the AJAX request
          alert(error)
        }

         // ---------- script to add product to cart
         $(document).on("click", ".add-cart", (event) => {
           let courseID: any;
           let courseTitle: any;
           let Fee: any;
           let tag: any;
           let userId: any;
           let content: any;
           let description: any;
           let category: any;
           let userName: any;

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
             
             window.location.href="Paynow.html"
          
           } catch (error: any) {
             alert(error.message)
           }

         });
  // Check if the submitPayment element exists
         if(submitPayment != null){
          submitPayment.addEventListener("click",()=>{

            let cardNo: any = $("#cardNumber").val();
            let expiryDate: any = $("#expiryDate").val();
            let cvv: any = $("#cvv").val();
 // Check if payment details are valid
            if(!this.isValid(cardNo) || !this.isValid(expiryDate) || !this.isValid(cvv)){
              // this.showMessage("Please Enter Valid Details")
              window.location.href="cancel.html"
              return;
            }
            else{
              if(cardNo.length != 16 || expiryDate.length != 5 || cvv.length != 3){
                window.location.href="cancel.html"
                return;
              }
            }
           // Retrieve course details from localStorage
            let courseId:any = localStorage.getItem("courseId");
            let title:any = localStorage.getItem("courseTitle");
            let description: any = localStorage.getItem("courseDescription");
            let content: any = localStorage.getItem("courseContent");
            let tag: any = localStorage.getItem("courseImage");
            let category: any = localStorage.getItem("courseCategory");
            let fee: any = localStorage.getItem("courseFee");
            let userId: any = localStorage.getItem("userIdFromStorage");
            let userName: any = localStorage.getItem("userNameFromStorage");

            $.ajax({
                 type: "POST", url: "http://localhost:53057/api/Enrolled", data: { "UserID": userId, "Names": userName, "CourseID": courseId, "Title": title, "Desriptions": description, "Content": content, "Fee": fee, "Img": tag, "Category": category, "CourseStatus": "Enrolled" },
                 success: () => {
                  //  alert("Course added to your cart");
                  // window.location.href = "CartPage.html";
                  window.location.href = "success.html";
  
                 }, error: (err) => {
                  // Display an alert for any error that occurs 
                   this.showMessage(err);
                 }
               });
           });
         }
         
        // this.ViewProduct();
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

          showMessage(message: any) {
            // Display an alert for any error that occurs 
            alert(message);
          }


        }
    }
}
// Create an instance of the Marketing class from the Prod.Typescript namespace
let typescriptMarketing=new Prod.Typescript.Marketing();
typescriptMarketing.ViewProduct();
