# HTTP CODES User Doc

## 1. Go to http://localhost:3000

### a. When User gets the homepage

![image](https://github.com/user-attachments/assets/c7080346-dd93-49c6-9337-4d0c17e218c2)

### Check your network tab for http status code

![image](https://github.com/user-attachments/assets/d9d3d761-5381-4369-95c8-5b9d1d145cc2)

**Status code 200 Ok**

### b. When User gets Internal Server Error Page

![image](https://github.com/user-attachments/assets/2b6f947c-a97a-4af9-873a-54a55876a8e0)

### Check your network tab for http status code.  

![image](https://github.com/user-attachments/assets/4eec7235-ad15-4500-a9b8-94bb8e08f190)

**Status code 500 Internal Server Error**

### c. When User gets Service Unavailable Error Page

![image](https://github.com/user-attachments/assets/812806c0-f5a6-4104-9791-48d2b05e449f)


### Check your network tab for http status code. 

![image](https://github.com/user-attachments/assets/71e3ddbe-e069-43aa-96f6-d630c6158eae)

**Status code 500 Internal Server Error**

## 2. Go to http://localhost:3000/task

User gets redirected to http://localhost:3000/tasks  

### a. When user is not logged in

![image](https://github.com/user-attachments/assets/2ce85591-1e47-4a5a-a862-a0dd55513f8a)

### Check your network tab for http status code.  

![image](https://github.com/user-attachments/assets/474987d6-7499-4f57-86f7-8f091196ab8b)  

**Status code 307 Temporary Redirect**

![image](https://github.com/user-attachments/assets/9a41f040-edad-4f83-a063-7a5c1321f439)

**Status code 401 Unauthorized**

### b. When user is logged in

![image](https://github.com/user-attachments/assets/a99a63d9-318a-40f3-a2e8-71d47e999d93)

### Check your network tab for http status codes.

![image](https://github.com/user-attachments/assets/3bf00775-0d3d-477f-8771-d7e3554a58a1)

**Status code 307 Temporary Redirect**

![image](https://github.com/user-attachments/assets/ab8e0a69-b845-42a9-80ee-d7513b6ca6ee)

**Status code 200 OK**

## 3. Go to http://localhost:3000/login 

User gets the login page.

![image](https://github.com/user-attachments/assets/0f09fcb7-8bd6-45cd-b743-1c995a8f0a75)
  
Enter this values in the corresponding Input fields.   
email - user@example.com    
password - user123     

Click on Login button.    
User gets redirected to homepage ( http://localhost:3000)  

![image](https://github.com/user-attachments/assets/4668203d-b003-4816-b809-e399ca127268)

### Check your network tab for http status codes.

![image](https://github.com/user-attachments/assets/96383756-e0c0-496b-a35f-bb216714edfc)

**Status Code 302 Found**

## 4. Go to http://localhost:3000/admin

User is forbidden to access this page.   
User need to login as admin to access this page.

![image](https://github.com/user-attachments/assets/0577cbde-2fcf-47e1-a3c4-1cfda8a8f035)

### Check your network tab for http status codes

![image](https://github.com/user-attachments/assets/1f578ea4-8ed2-434b-8d36-6c7ee183eb25)

**Status Code 403 Forbidden**

## 5. Go to http://localhost:3000/login

Now User login as admin.  
Enter this values in the corresponding Input fields.      
email - admin@example.com       
password - admin123

Now Go to  to http://localhost:3000/admin.  
No Forbidden error is shown.
![image](https://github.com/user-attachments/assets/ee57495c-f75a-46ad-b0cd-ba9c87849233)

### Check your network tab for http status codes


## 6. Go to http://localhost:3000/tasks?taskId=3

User gets tasks page but with task with taskId 3.  
![image](https://github.com/user-attachments/assets/29081989-15d2-40c7-bcb4-d4d59e2cadfb)   

But when user enters taskId smaller than 1 or greater than 3.
User gets Bad request Error.
![image](https://github.com/user-attachments/assets/d47f635d-c646-4877-8a3e-28cd73a206e9)

### Check your network tab for http status codes

![image](https://github.com/user-attachments/assets/4b16f065-f084-44b7-9f25-17192cc7a4ba)

**Status Code 400 Bad Request**

## 7. Go To http://localhost:3000/logout
User gets the logout page.  
User clicks on logout button to logout.  

![image](https://github.com/user-attachments/assets/e4da3779-1234-4af8-9641-029530da40c2)

## 8. Go To http://localhost:3000/something

User gets Not Found Error Page.  
when use tries to get a page which does not exist on server.

![image](https://github.com/user-attachments/assets/b303e0eb-3f9b-423f-9286-4908246eec02)


### Check your network tab for http status codes

![image](https://github.com/user-attachments/assets/6dea314d-3b41-473f-b251-47fdd0b2bf7e)

