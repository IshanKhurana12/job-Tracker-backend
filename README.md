# 💼 Job Tracker API

A simple job tracking backend using **Express.js** and **MVC architecture**. This app allows users to sign up, log in, and manage their job applications.

---

## 🚀 Features

- User authentication (signup & login)
- Add, update, delete job applications
- Get a list of all job applications
- View a single job application

- Method	Route	Description
GET	  /	          Home or welcome route
POST	/signup   	Register a new user
POST	/login	    Authenticate user

Method	Route	Description
GET	    /application	            Get all job applications
GET	    /application/:id	        Get a single job application by ID
POST	  /application/add	        Add a new job application
PATCH	  /application/update/:id	  Update an existing application
DELETE	/application/delete/:id  	Delete a job application by ID

