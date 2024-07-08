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
    public class CoursesController : ApiController
    {
        public List<Cours> GetCourses()
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                List<Cours> courseList = database.Courses.ToList();
                return courseList;
            }
            catch (Exception)
            {

                throw;
            }

        }
        //Method to get Customer Detail by ID
        public Cours GetCourses(int ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                Cours course = database.Courses.Where(temp => temp.CourseID == ID).FirstOrDefault();
                return course;
            }
            catch (Exception)
            {

                throw;
            }

        }
       
        //Method to Insert Customer Details
        public void PostCourse(Cours course)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                database.Courses.Add(course);
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }
        //Method to update the customer details
        public void PutCourse(Cours course)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingCourse = database.Courses.Where(temp => temp.CourseID == course.CourseID).FirstOrDefault();
                //Updating the values
                existingCourse.Title = course.Title;
                existingCourse.Img = course.Img;
                existingCourse.Descriptions = course.Descriptions;
                existingCourse.Content = course.Content;
                existingCourse.Category = course.Category;
                existingCourse.Fee = course.Fee;
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }

        //MEthod to delete the customer deatils
        public void DeleteCourse(long ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingCourse = database.Courses.Where(temp => temp.CourseID == ID).FirstOrDefault();
                //Deleting the data
                database.Courses.Remove(existingCourse);
                database.SaveChanges();
            }
            catch (Exception)
            {
                HttpContext.Current.Response.Write("Something went Wrong");
            }


        }
    }
}
