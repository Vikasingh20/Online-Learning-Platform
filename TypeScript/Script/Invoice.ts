namespace Invoice{
    // Define a namespace for TypeScript-related functionality within the Invoice module
    export namespace Typescript{
         
        export class CourseInvoice{
            //function for creatng Invoice 
            invoiceRecord():any{
             //variables for Retrieve course details from localStorage
            let courseId:any = localStorage.getItem("courseId");
            let title:any = localStorage.getItem("courseTitle");
            let description: any = localStorage.getItem("courseDescription");
            let content: any = localStorage.getItem("courseContent");
            let tag: any = localStorage.getItem("courseImage");
            let category: any = localStorage.getItem("courseCategory");
            let fee: any = localStorage.getItem("courseFee");
            let userId: any = localStorage.getItem("userIdFromStorage");
            let userName: any = localStorage.getItem("userNameFromStorage");
// Display course information in the invoice
            $("#studentName").text(userName);
            $("#courseName").text(title);
            $(".fee").text(fee);
            $("#category").text(category);

            }
        }
    }
}
// Create an instance of the CourseInvoice class from the Invoice.Typescript namespace

let invoiceObj: any = new Invoice.Typescript.CourseInvoice();
invoiceObj.invoiceRecord();