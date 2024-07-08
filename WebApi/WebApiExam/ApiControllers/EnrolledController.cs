using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiExam.Models;
using System.Web;

namespace WebApiExam.ApiControllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "SampleHeader")]
    public class EnrolledController : ApiController
    {
        public List<Enrolled> GetEnrollledCourses()
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                List<Enrolled> courseList = database.Enrolleds.ToList();
                return courseList;
            }
            catch (Exception)
            {

                throw;
            }

        }
        //Method to get Customer Detail by ID
        public Enrolled GetEnrolledCourses(int ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                Enrolled course = database.Enrolleds.Where(temp => temp.EnrolledID == ID).FirstOrDefault();
                return course;
            }
            catch (Exception)
            {

                throw;
            }

        }

        //Method to Insert Customer Details
        public void PostEnrolledCourse(Enrolled course)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                database.Enrolleds.Add(course);
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }
        //Method to update the customer details
        public void PutEnrolledCourse(Enrolled course)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingCourse = database.Enrolleds.Where(temp => temp.EnrolledID == course.EnrolledID).FirstOrDefault();
                //Updating the values
                existingCourse.UserID = course.UserID;
                existingCourse.Names = course.Names;
                existingCourse.CourseID = course.CourseID;
                existingCourse.Title = course.Title;
                existingCourse.Img = course.Img;
                existingCourse.Desriptions = course.Desriptions;
                existingCourse.Content = course.Content;
                existingCourse.Category = course.Category;
                existingCourse.Fee = course.Fee;
                existingCourse.Content = course.CourseStatus;
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }

        //MEthod to delete the customer deatils
        public void DeleteEnrolledCourse(long ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingCourse = database.Enrolleds.Where(temp => temp.EnrolledID == ID).FirstOrDefault();
                //Deleting the data
                database.Enrolleds.Remove(existingCourse);
                database.SaveChanges();
            }
            catch (Exception)
            {
                HttpContext.Current.Response.Write("Something went Wrong");
            }


        }
    }
}
