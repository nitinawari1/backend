
require('dotenv').config(); // importing dotenv
const port1 = process.env.PORT //importing credincials from .env and storing in variables


const express = require('express')  //importing express
// import  express  from 'express';
const app = express()  // we storing express in variable now that variable have whole functionality of express
const port = 3000 //port for listing

//app.get('/', (req, res) => { ... }): This part defines a route handler for HTTP GET requests to the root URL ("/"). When a client makes a GET request to the root URL, Express.js will execute the callback function specified as the second argument. In this case, it sends the response "Hello World!" back to the client.


//Listening or handling get request at home directory on 3000 port and sending response  
app.get('/', (req, res) => {
  res.send('Hello World!')  // sending responce
})

app.get('/twitter' , (req, res)=>{
res.send('twitter page') //we can send diffent type of responce
})

app.get('/yt', (req, res) => {
         res.send("<h1>Hello World!</h1>")  // sending h1 tag also we can send lot things like cookies 
       })



//app.listen(port, () => { ... }): This part starts the Express application and makes it listen for incoming HTTP requests on the specified port. When the application starts listening on the port, the callback function specified as the second argument to app.listen() is executed. In this example, it logs a message to the console indicating that the application is listening on the specified port.



//starts the Express.js server and makes it listen for incoming HTTP requests on a specified port  
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


//using port from dotenv
app.listen(port1, () => {
  console.log(`Example app listening on port ${port1}`)
})