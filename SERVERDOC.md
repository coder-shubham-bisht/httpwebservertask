# HTTP CODES SERVER DOCS

## Prequisite
1. podman installed
2. bash installed
3. Project scripts , application image
4. open your terminal and go to directory where projects scripts are stored
   
## 1. Start the webserver and database server.
**execute the below commnads**

$ bash create-server-db.sh 
   
**output**    
![image](https://github.com/user-attachments/assets/eda3eb4a-18b6-4e5e-8484-59a4ec34ad51)

$ podman ps  
**output**  
![image](https://github.com/user-attachments/assets/0cfa036e-7bb0-4aa4-81d3-468b5b50758b)




## 2. To enable maintaintance mode in web server
this will give users Service Unavailable Error with status code 503.  
 
**execute the below command**   
$ bash ws-start-maintainance.sh 

## 3. To disable maintaintance mode in  web server
 
**execute the below command**   
$ bash ws-stop-maintainance.sh 

## 4. To enable Internal Server error in web server
this will give users Internal Server Error with status code 500. 
**execute the below command in the terminal**     
$ bash  ws-start-server-error.sh

## 5. To disable Internal Server error in web server
  
**execute the below command in the terminal**     
$ bash  ws-stop-server-error.sh



