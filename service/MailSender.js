
const transporter =require("../configs/Mailer.js");

const sendMail= async ({emailTo,emailFrom,link,fileName,size})=>{
    await transporter.sendMail({
        from:emailFrom,
        to:emailTo,
        subject:"Your file is ready to download!",
        html:`<strong style="color:blue; font-size:100px">Hi this is automated mail from link: ${link}</strong>`
    })
}
module.exports=sendMail;