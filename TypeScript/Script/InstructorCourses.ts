namespace Instructor{
    export namespace Typescript{
        export class Courses{
            /**
         * this method id for view 
         */
              course(): any{
                let editBtn : any =<HTMLElement>document.body.querySelector("#btn-Edit");
                let updateBtn: any = <HTMLElement>document.body.querySelector("#btn-Update");
                let addBtn: any = <HTMLElement>document.body.querySelector("#btn-Add");
                let insertBtn: any = <HTMLElement>document.body.querySelector("#btn-Insert");
                let deletBtn: any = <HTMLElement>document.body.querySelector("#btn-Delete");
                
                $(document).ready(function (): any {
                    // ------------ To get list of products
                        $.ajax({
                            type: "GET", url: "http://localhost:53057/api/Courses", success: (response) => {
                                $(".data").remove();
                                for (let i = 0; i < response.length; i++) {
                                    let productDetails = response[i];
                    
                                    let str = "<tr class='data'><td>"+productDetails.Title+"</td> <td>"+productDetails.Descriptions+"</td><td><button type='button' class='btn btn-dark btnView' data-toggle='modal' data-target='#ViewModel' data-courseId=" + productDetails.CourseID + ">View</button></td></tr>";
                                    $(".ProdTable").append(str);
                    
                                }
                            }, error: (err) => {
                                alert(err)
                                console.log(err);
                            }
                        });
                    
                    let currentId;
                    let currentRow;
                    //-------------- To display the details in dialouge box
                    $(document).on("click", ".btnView", (event) => {
                                
                                //target property return the element that triggrered the event.
                                $("#message").html("");
                                $(".productIDInput").css('display','contents');
                                $(".inp").prop('disabled',"true");
                                // $(".inp").setpropibute()
                                $(".inp").css('border','none');
                                $("#btn-Insert").css('display','none');
                                $("#btn-Delete").css('display','block');
                                $("#btn-Edit").css('display','block');
                                $("#btn-Update").css('display','block');
                                $("#course-image").css('display','block');
                                let courseId = $(event.target).attr("data-courseId");
                                currentId = courseId;
                                currentRow = $(event.target).parent().parent();
                                
                                $.ajax({
                                    type: "GET", url: "http://localhost:53057/api/Courses?ID=" + courseId,
                                     success: (response) => {
                                        // @ts-ignore
                                        $("#ViewModel").modal();
                                        $("#ip-courseId").val(response.CourseID);
                                        $("#ip-courseTitle").val(response.Title);
                                        $("#ip-courseDescription").val(response.Descriptions);
                                        $("#ip-courseFee").val(response.Fee);
                                        $("#ip-courseImg").val(response.Img); 
                                        $("#ip-courseCategory").val(response.Category);
                                        $("#ip-courseContent").val(response.Content);
                                        $("#course-image").html("<img src="+response.Img+" alt='Course Image'  width='300px' height='auto'>")  
                                    },
                                    error: (err) => {
                                        alert(err)
                                        
                                    }
                                });
                            });
                    //---------- To add and Update the data
                            // $("#btn-Edit").click(function(){
                                editBtn.addEventListener("click",()=>{
                                $("#ip-courseTitle").prop('disabled',false);
                                $("#ip-courseDescription").prop('disabled',false);
                                $("#ip-courseFee").prop('disabled',false);
                                $("#ip-courseImg").prop('disabled',false);
                                $("#ip-courseCategory").prop('disabled',false);
                                $("#ip-courseContent").prop('disabled', false);
                                $(".inp").css('border','1px solid rgba(174, 173, 173, 0.614)');
                                $("#message").html("You can edit now.");
                    
                            });
                     
                            // $("#btn-Update").click(function(){
                                updateBtn.addEventListener("click",()=>{
                                let courseId = $("#ip-courseId").val();
                                let courseTitle = $("#ip-courseTitle").val();
                                let courseDescription = $("#ip-courseDescription").val();
                                let courseFee = $("#ip-courseFee").val();
                                let courseContent = $("#ip-courseContent").val();
                                let courseCategory = $("#ip-courseCategory").val();
                                let courseImg =  $("#ip-courseImg").val();
                                $.ajax({
                                    type:"PUT", url: "http://localhost:53057/api/Courses", data:{"CourseID": courseId,"Title": courseTitle,"Descriptions": courseDescription,"Content": courseContent,"Fee": courseFee,"Category":courseCategory,"Img": courseImg}, success:()=>{
                                        
                                        $("#course-image").html("<img src="+courseImg+" alt='Course Image'  width='300px' height='auto'>");
                                        $("#message").html("Data Updated Successfully");
                                        $(".inp").prop('disabled',true);
                                    }, error:(err)=>{alert(err);}
                                });
                    
                            });
                    
                    //-------------- To delete the product  
                            // $("#btn-Delete").click(()=>{
                                deletBtn.addEventListener("click",()=>{
                                $.ajax({
                                    type:"DELETE", url:"http://localhost:53057/api/Courses?ID=" + currentId, success:(response)=>{
                                        $("#message").html("Course Deleted Successfully !");
                                        currentRow.remove();
                                    },
                                    error:(err)=>{
                                        alert(err);
                                    }
                                });
                            });
                    
                            // $("#btn-Insert").click(function(){
                            addBtn.addEventListener("click",()=>{
                                $(".inp").val("");
                                $(".productIDInput").css('display','none');
                                $("#ip-courseTitle").prop('disabled',false);
                                $("#ip-courseDescription").prop('disabled',false);
                                $("#ip-courseFee").prop('disabled',false);
                                $("#ip-courseImg").prop('disabled',false);
                                $("#ip-courseCategory").prop('disabled',false);
                                $("#ip-courseContent").prop('disabled', false);
                                $("#btn-Insert").css('display','block')
                                $("#btn-Delete").css('display','none');
                                $("#btn-Edit").css('display','none');
                                $("#btn-Update").css('display','none');
                                $("#course-image").css('display','none');
                                $("#message").css('display','none');
                                $(".inp").css('border','1px solid rgba(174, 173, 173, 0.614)');
                                // @ts-ignore
                                $("#ViewModel").modal();
                            });
                    //---------- Inserting New Product
                            // $("#btn-Insert1").click(function(){
                            insertBtn.addEventListener("click",()=>{
                                
                                $("#message").css('display','block');
                                let courseTitle = $("#ip-courseTitle").val();
                                let courseDescription = $("#ip-courseDescription").val();
                                let courseContent = $("#ip-courseContent").val();
                                let courseFee = $("#ip-courseFee").val();
                                let courseCategory = $("#ip-courseCategory").val();
                                let courseImg =  $("#ip-courseImg").val();
                                if(courseTitle == "" || courseFee== "" || courseDescription == "" || courseCategory == "" || courseImg == "" || courseContent == ""){
                                    alert("Please Enter Valid details")
                                    return;
                                }else{
                                    $.ajax({
                                        type:"POST", url: "http://localhost:53057/api/Courses", data:{"Title": courseTitle,"Descriptions": courseDescription,"Content": courseContent,"Fee": courseFee,"Category":courseCategory,"Img": courseImg}, success:()=>{
                                            
                                            $("#course-image").css('display','block');
                                            $("#course-image").html("<img src="+courseImg+" alt='Course Image'  width='300px' height='auto'>")
                                            $("#message").html("Course Added Successfully");
                                            $(".inp").prop('disabled',true);
                                            
                                        }, error:(err)=>{alert(err);}
                                    });
                                }
                                
                            });
                    });
              }  
                    
        }
    }
}

let coursesObj: any = new Instructor.Typescript.Courses();

coursesObj.course();