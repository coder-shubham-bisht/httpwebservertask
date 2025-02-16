const express = require("express");
const path = require("path");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
        title: '401 Unauthorized',
        status:'401 Unauthorized',
        message: 'You are not aunthenticated, you need to login',
      });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).render('index',{
            title: '401 Unauthorized',
            status:'401 Unauthorized',
            message: 'Invalid or expired token,You need to login ',
        });
      }
  
      // Add decoded user info to request
      req.user = decoded;
      next();
    });
  };

app.get("/profile",(req,res)=>{
    res.redirect(307,"/")
})
app.get('/', verifyToken,(req, res) => {
  
    // Return user profile
    res.status(200).render('index',{title:'My APP',status:'200 OK',message:`welcome ${req.user.email}`});
});

// Protected route (requires valid token)
app.get('/admin', verifyToken, (req, res) => {
    // Check if the user has permission (for example, only admins can access this route)
    if (req.user.role !== 'admin') {
      return res.status(403).render('index',{
        title:"403 Forbidden",
        status: '403 Forbidden',
        message: 'You do not have permission to access this page , login as admin to access this page.',
      });
    }
  
    // If the user is authorized, send the protected resource
    res.status(200).render('index',{
    title:'Admin',
    status:'200 Ok',
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
    res.status(404).render('index',{title:'404 Error',status:'404 NOT FOUND',message:"The Requested URl Does Not xist"})
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});