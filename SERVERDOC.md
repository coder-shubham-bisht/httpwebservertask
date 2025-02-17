# HTTP CODES SERVER DOCS

## Prequisite
1. Nodejs installed on your OS
2. bash installed
3. Project code stored on local system.
4. open your terminal and go to the directory where project code is stored. 
   
## 1. Start the webserver  
**execute the below commnads**

$ bash startdb.sh   
**output**    
![image](https://github.com/user-attachments/assets/d0b83228-4dcc-45db-88a6-7c324dda5866)

$ node server.js  
**output**  
![image](https://github.com/user-attachments/assets/722229f8-252e-4d68-ac06-37f623678b2e)


## 2. To start the server in maintainace mode
this will give users Service Unavailable Error with status code 503.  
firt we need stop the server if previously started.  
**execute the below command**   
ignore this commnad if previously executed.  
$ bash startdb.sh   
use this command to start the sever.
$ MAINTAINANCE=true node server.js  
**output**  
![image](https://github.com/user-attachments/assets/ef447165-564f-4ab7-b9bd-9c446d06a033)

## 3. To produce a Internal Serve error
You need follow first  Instruction to start the server.   
**execute the below command in the terminal**     
$ bash stopdb.sh  
**Ouptut**  
![image](https://github.com/user-attachments/assets/32d268b2-79ae-4729-8c14-b4453e8389bc)

to remove this error    
**execute the below command**   
$ bash startsb.sh

