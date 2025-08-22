const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./configs/mongodbConnection.js");
const app = express();
const port = process.env.PORT || 8081;
const sendMail= require("./service/MailSender.js")
const filesRouter= require("./routes/fileUploadRoute.js");
const ExpiryCron= require("./service/cronJob.js");

// Connect to MongoDB
connectDB();
ExpiryCron();

// Basic middleware
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to File sharing app");
});
let emailOptions={
    emailTo:"namangupta990@gmail.com",
    emailFrom:"gnemo605@gmail.com",
    link:"abcd",fileName:"abdc",size:1234
}

// app.get("/send",async (req,res)=>{
//     await sendMail(emailOptions);
// res.send("Mail sent successfully");
    
// })


app.use('/',filesRouter);

// // 404 handler
// app.use((req, res, next) => {
//     res.status(404).json({
//         error: {
//             message: 'Route not found'
//         }
//     });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//         error: {
//             message: err.message || 'Internal Server Error'
//         }
//     });
// });

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

