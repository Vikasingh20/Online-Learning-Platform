var Invoice;
(function (Invoice) {
    // Define a namespace for TypeScript-related functionality within the Invoice module
    var Typescript;
    (function (Typescript) {
        var CourseInvoice = /** @class */ (function () {
            function CourseInvoice() {
            }
            //function for creatng Invoice 
            CourseInvoice.prototype.invoiceRecord = function () {
                //variables for Retrieve course details from localStorage
                var courseId = localStorage.getItem("courseId");
                var title = localStorage.getItem("courseTitle");
                var description = localStorage.getItem("courseDescription");
                var content = localStorage.getItem("courseContent");
                var tag = localStorage.getItem("courseImage");
                var category = localStorage.getItem("courseCategory");
                var fee = localStorage.getItem("courseFee");
                var userId = localStorage.getItem("userIdFromStorage");
                var userName = localStorage.getItem("userNameFromStorage");
                // Display course information in the invoice
                $("#studentName").text(userName);
                $("#courseName").text(title);
                $(".fee").text(fee);
                $("#category").text(category);
            };
            return CourseInvoice;
        }());
        Typescript.CourseInvoice = CourseInvoice;
    })(Typescript = Invoice.Typescript || (Invoice.Typescript = {}));
})(Invoice || (Invoice = {}));
// Create an instance of the CourseInvoice class from the Invoice.Typescript namespace
var invoiceObj = new Invoice.Typescript.CourseInvoice();
invoiceObj.invoiceRecord();
