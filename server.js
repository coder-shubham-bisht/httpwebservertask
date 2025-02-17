const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

const SECRET_KEY = 'your-secret-key';

app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the directory where the views (EJS templates) are located
app.set('views', './views'); 
app.disable('etag');

// PostgreSQL Connection Configuration
const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});
// Static users (one normal user, one admin user)
const users = {
    'user@example.com': {
      password: 'user123', // Normal user
      role: 'user',
    },
    'admin@example.com': {
      password: 'admin123', // Admin user
      role: 'admin',
    },
};

const tasks= {
  'user@example.com':["usertask1","usertask2","usertask3"],
  'admin@example.com':["admintask1","admintask2","admintask3"]
}

let isMaintenance = process.env.MAINTAINANCE || false; // Toggle this to simulate maintenance mode

// Middleware to simulate 503 Service Unavailable
app.use((req, res, next) => {
    if (isMaintenance) {
        res.set("Retry-After", "60"); // Advise clients to retry after 60 seconds
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"); // Prevent caching
        return res.status(503).render("index", {
            title: 'Service Unavailable',
            heading:'Service Unavailable',
            message: 'Our service is temporarily unavailable due to maintenance. Please try again later.'
        });
    }
    next();
});


// Middleware to check PostgreSQL connection
app.use(async (req, res, next) => {
  try {
      const client = await pool.connect(); // Try to connect to PostgreSQL
      client.release(); // Release connection
      next(); // Proceed if successful
  } catch (error) {
      console.error("Database Connection Error:", error.message);
      return res.status(500).render('index',{
        title: 'Internal Server Error',
        heading:'Internal Server Error',
        message: 'Internal Server Error. Please try again later.'

      });
  }
});

// Endpoint for login (authenticate user and set cookie)
app.post('/login', (req, res) => {
    const email = req.body.email;  // Access form data using req.body
    const password = req.body.password;
  
    // Check if user exists and password matches
    if (!email || !password) {
      return res.status(400).json({
        title: 'Bad Request',
        message: 'Email and password are required.',
      });
    }
  
    const user = users[email];
    if (!user || user.password !== password) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid email or password.',
      });
    }
  
    // Create JWT token (expires in 1 hour)
    const token = jwt.sign({ email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  
    // Set token in cookie
    res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
  
    res.redirect(302,"/");
  });
  // Middleware to verify token from cookies
const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token']; // Get token from cookies
  
    if (!token) {
      return res.status(401).render('index',{
        title: 'Unauthorized',
        heading:'Unauthorized',
        message: 'You are not aunthenticated, you need to login. Go to /login',
      });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).render('index',{
            title: 'Unauthorized',
            heading:'Unauthorized',
            message: 'Invalid or expired token,You need to login. Go to /login ',
        });
      }
  
      // Add decoded user info to request
      req.user = decoded;
      next();
    });
  };


app.get("/task",(req,res)=>{
    res.redirect(307,"/tasks")
})
app.get("/tasks",verifyToken,(req,res)=>{

  const taskId=req.query.taskId || 1
  if(!taskId || isNaN(taskId)|| taskId <1){
    return res.status(400).render('index',{title:'BAD REQUEST',heading:'BAD REQUEST',message:'Invalid Task Id in request'})
  }
  const task = tasks[req.user.email][taskId-1]
  if(!task){
   return  res.status(400).render('index',{title:'BAD REQUEST',heading:'BAD REQUEST',message:'Invalid Task Id in request'})
  }
        res.status(200).render('tasks',{title:'Tasks',task:`you are redirected from /task to /tasks : ${req.user.email} with ${task}`})
})
app.get('/',(req, res) => {
    // Return Home Page
    res.status(200).render('index',{title:'HomePage',heading:'HomePage',message:`This is a Webserver showing commonly used Http status codes`});
});

// Protected route (requires valid token)
app.get('/admin', verifyToken, (req, res) => {
    // Check if the user has permission (for example, only admins can access this route)
    if (req.user.role !== 'admin') {
      return res.status(403).render('index',{
        title:"Forbidden",
        heading: 'Forbidden',
        message: 'You do not have permission to access this page, login as admin to access this page. Go to /login',
      });
    }
  
    // If the user is authorized, send the protected resource
    res.status(200).render('index',{
    title:'Admin',
    heading:'Admin Page',
    message: `Welcome to the protected resource! ${req.user.email}`,
      
    });
});


app.get("/login",(req,res)=>{
    res.status(200).render('login')

})
app.get("/logout",(req,res)=>{
    res.status(200).render('logout')

})
app.post('/logout', (req, res) => {
    res.clearCookie('auth_token').redirect(302,'/login');
  });


app.use("*",(req,res)=>{
    res.status(404).render('index',{title:'NOT FOUND',heading:'NOT FOUND',message:"The Requested URL Does Not exist"})
})
app.listen(PORT, () => {
  if(isMaintenance){
    console.log(`Server is running on http://localhost:${PORT} but it is under maintainance` );

  }else{
    console.log(`Server is running on http://localhost:${PORT}`);

  }
});