var Instructor;
(function (Instructor) {
    var Typescript;
    (function (Typescript) {
        var Courses = /** @class */ (function () {
            function Courses() {
            }
            Courses.prototype.course = function () {
                var editBtn = document.body.querySelector("#btn-Edit");
                var updateBtn = document.body.querySelector("#btn-Update");
                var addBtn = document.body.querySelector("#btn-Add");
                var insertBtn = document.body.querySelector("#btn-Insert");
                var deletBtn = document.body.querySelector("#btn-Delete");
                $(document).ready(function () {
                    // ------------ To get list of products
                    $.ajax({
                        type: "GET", url: "http://localhost:53057/api/Courses", success: function (response) {
                            $(".data").remove();
                            for (var i = 0; i < response.length; i++) {
                                var productDetails = response[i];
                                var str = "<tr class='data'><td>" + productDetails.Title + "</td> <td>" + productDetails.Descriptions + "</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-courseId=" + productDetails.CourseID + ">View</button></td></tr>";
                                $(".ProdTable").append(str);
                            }
                        }, error: function (err) {
                            alert(err);
                            console.log(err);
                        }
                    });
                    var currentId;
                    var currentRow;
                    //-------------- To display the details in dialouge box
                    $(document).on("click", ".btnView", function (event) {
                        //target property return the element that triggrered the event.
                        $("#message").html("");
                        $(".productIDInput").css('display', 'contents');
                        $(".inp").prop('disabled', "true");
                        // $(".inp").setpropibute()
                        $(".inp").css('border', 'none');
                        $("#btn-Insert").css('display', 'none');
                        $("#btn-Delete").css('display', 'block');
                        $("#btn-Edit").css('display', 'block');
                        $("#btn-Update").css('display', 'block');
                        $("#course-image").css('display', 'block');
                        var courseId = $(event.target).attr("data-courseId");
                        currentId = courseId;
                        currentRow = $(event.target).parent().parent();
                        $.ajax({
                            type: "GET", url: "http://localhost:53057/api/Courses?ID=" + courseId,
                            success: function (response) {
                                // @ts-ignore
                                $("#ViewModel").modal();
                                $("#ip-courseId").val(response.CourseID);
                                $("#ip-courseTitle").val(response.Title);
                                $("#ip-courseDescription").val(response.Descriptions);
                                $("#ip-courseFee").val(response.Fee);
                                $("#ip-courseImg").val(response.Img);
                                $("#ip-courseCategory").val(response.Category);
                                $("#ip-courseContent").val(response.Content);
                                $("#course-image").html("<img src=" + response.Img + " alt='Course Image'  width='300px' height='auto'>");
                            },
                            error: function (err) {
                                alert(err);
                            }
                        });
                    });
                    //---------- To add and Update the data
                    // $("#btn-Edit").click(function(){
                    editBtn.addEventListener("click", function () {
                        $("#ip-courseTitle").prop('disabled', false);
                        $("#ip-courseDescription").prop('disabled', false);
                        $("#ip-courseFee").prop('disabled', false);
                        $("#ip-courseImg").prop('disabled', false);
                        $("#ip-courseCategory").prop('disabled', false);
                        $("#ip-courseContent").prop('disabled', false);
                        $(".inp").css('border', '1px solid rgba(174, 173, 173, 0.614)');
                        $("#message").html("You can edit now.");
                    });
                    // $("#btn-Update").click(function(){
                    updateBtn.addEventListener("click", function () {
                        var courseId = $("#ip-courseId").val();
                        var courseTitle = $("#ip-courseTitle").val();
                        var courseDescription = $("#ip-courseDescription").val();
                        var courseFee = $("#ip-courseFee").val();
                        var courseContent = $("#ip-courseContent").val();
                        var courseCategory = $("#ip-courseCategory").val();
                        var courseImg = $("#ip-courseImg").val();
                        $.ajax({
                            type: "PUT", url: "http://localhost:53057/api/Courses", data: { "CourseID": courseId, "Title": courseTitle, "Descriptions": courseDescription, "Content": courseContent, "Fee": courseFee, "Category": courseCategory, "Img": courseImg }, success: function () {
                                $("#course-image").html("<img src=" + courseImg + " alt='Course Image'  width='300px' height='auto'>");
                                $("#message").html("Data Updated Successfully");
                                $(".inp").prop('disabled', true);
                            }, error: function (err) { alert(err); }
                        });
                    });
                    //-------------- To delete the product  
                    // $("#btn-Delete").click(()=>{
                    deletBtn.addEventListener("click", function () {
                        $.ajax({
                            type: "DELETE", url: "http://localhost:53057/api/Courses?ID=" + currentId, success: function (response) {
                                $("#message").html("Course Deleted Successfully !");
                                currentRow.remove();
                            },
                            error: function (err) {
                                alert(err);
                            }
                        });
                    });
                    // $("#btn-Insert").click(function(){
                    addBtn.addEventListener("click", function () {
                        $(".inp").val("");
                        $(".productIDInput").css('display', 'none');
                        $("#ip-courseTitle").prop('disabled', false);
                        $("#ip-courseDescription").prop('disabled', false);
                        $("#ip-courseFee").prop('disabled', false);
                        $("#ip-courseImg").prop('disabled', false);
                        $("#ip-courseCategory").prop('disabled', false);
                        $("#ip-courseContent").prop('disabled', false);
                        $("#btn-Insert").css('display', 'block');
                        $("#btn-Delete").css('display', 'none');
                        $("#btn-Edit").css('display', 'none');
                        $("#btn-Update").css('display', 'none');
                        $("#course-image").css('display', 'none');
                        $("#message").css('display', 'none');
                        $(".inp").css('border', '1px solid rgba(174, 173, 173, 0.614)');
                        // @ts-ignore
                        $("#ViewModel").modal();
                    });
                    //---------- Inserting New Product
                    // $("#btn-Insert1").click(function(){
                    insertBtn.addEventListener("click", function () {
                        $("#message").css('display', 'block');
                        var courseTitle = $("#ip-courseTitle").val();
                        var courseDescription = $("#ip-courseDescription").val();
                        var courseContent = $("#ip-courseContent").val();
                        var courseFee = $("#ip-courseFee").val();
                        var courseCategory = $("#ip-courseCategory").val();
                        var courseImg = $("#ip-courseImg").val();
                        if (courseTitle == "" || courseFee == "" || courseDescription == "" || courseCategory == "" || courseImg == "" || courseContent == "") {
                            alert("Please Enter Valid details");
                            return;
                        }
                        else {
                            $.ajax({
                                type: "POST", url: "http://localhost:53057/api/Courses", data: { "Title": courseTitle, "Descriptions": courseDescription, "Content": courseContent, "Fee": courseFee, "Category": courseCategory, "Img": courseImg }, success: function () {
                                    $("#course-image").css('display', 'block');
                                    $("#course-image").html("<img src=" + courseImg + " alt='Course Image'  width='300px' height='auto'>");
                                    $("#message").html("Course Added Successfully");
                                    $(".inp").prop('disabled', true);
                                }, error: function (err) { alert(err); }
                            });
                        }
                    });
                });
            };
            return Courses;
        }());
        Typescript.Courses = Courses;
    })(Typescript = Instructor.Typescript || (Instructor.Typescript = {}));
})(Instructor || (Instructor = {}));
var coursesObj = new Instructor.Typescript.Courses();
coursesObj.course();
