
CREATE TABLE SignUp (
    UserID INT PRIMARY KEY IDENTITY(1,1),
	Names VARCHAR(50),
    Passwords VARCHAR(50),
    Email VARCHAR(55) UNIQUE,
    UserType VARCHAR(255) ,
);
create table Courses(
CourseID int primary key identity(1001,1),
Title varchar(100) not null,
Img varchar(500) not null,
Descriptions varchar(500) not null,
Content varchar(100),
Category varchar(100),
Fee int not null,
)

create table Enrolled(
EnrolledID int primary key identity(10001,1),
UserID int references SignUp(UserID),
Names varchar(50),
CourseID int references Courses(CourseID),
Title varchar(100),
Img varchar(500),
Desriptions varchar(500),
Content varchar(100),
Category varchar(100),
Fee int,
CourseStatus varchar(100)
)

select * from SignUp

select * from Courses

select * from Enrolled

update Courses set Img='..\Images\Webdevelopment.png' where CourseID = 1002

update SignUp set Email='vikas@gmail.com' where UserID=1

delete Enrolled where EnrolledID = 10013
insert into SignUp values('vikas','123','abc@gmail.com','admin')

insert into Courses values('Java BootCamp','C:\Users\irfan.shaikh\Downloads\Microsoft.SkypeApp_kzf8qxf38zg5c!App\All\TypeScript\TypeScript\Images\JavaBootcamp.png','blablablaba','hahahhaha','Coding',12000)

insert into Enrolled values(1,'vikas',1001,'Introduction to C Programming','Image.jpg','blablabblabla','hahahhahhahah','Technical',12000,'Enrolled')
