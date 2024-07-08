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
    public class SignUpController : ApiController
    {
        public List<SignUp> GetSignUp()
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                List<SignUp> signUpList = database.SignUps.ToList();
                return signUpList;
            }
            catch (Exception)
            {

                throw;
            }

        }
        //Method to get Customer Detail by ID
        public SignUp GetSignUp(int ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                SignUp signUp = database.SignUps.Where(temp => temp.UserID == ID).FirstOrDefault();
                return signUp;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public SignUp GetLogin(string email, string pass)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                SignUp signUp = database.SignUps.Where(temp => temp.Email == email && temp.Passwords == pass).FirstOrDefault();
                return signUp;
            }
            catch (Exception)
            {

                throw;
            }

        }
        //Method to Insert Customer Details
        public void PostSignUp(SignUp signUp)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                database.SignUps.Add(signUp);
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }
        //Method to update the customer details
        public void PutSignUp(SignUp signUp)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingSignUp = database.SignUps.Where(temp => temp.UserID == signUp.UserID).FirstOrDefault();
                //Updating the values
                existingSignUp.Names = signUp.Names;
                existingSignUp.Passwords = signUp.Passwords;
                //existingSignUp.MobileNo = signUp.MobileNo;
                existingSignUp.Email = signUp.Email;
                database.SaveChanges();
            }
            catch (Exception)
            {

                HttpContext.Current.Response.Write("Kindly Fill the details Properly");
            }

        }

        //MEthod to delete the customer deatils
        public void DeleteSignUp(long ID)
        {
            try
            {
                //Creating an object of DataBaseEntity
                TypescriptDataBaseEntities database = new TypescriptDataBaseEntities();
                var existingSignUp = database.SignUps.Where(temp => temp.UserID == ID).FirstOrDefault();
                //Deleting the data
                database.SignUps.Remove(existingSignUp);
                database.SaveChanges();
            }
            catch (Exception)
            {
                HttpContext.Current.Response.Write("Something went Wrong");
            }


        }
    }
}

