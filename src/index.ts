import express from "express";
import userRoute from "./routes/user";
import loginRoute from "./routes/login";
import tweetRoute from "./routes/tweet";
import likeRoute from "./routes/like";
import commentRoute from "./routes/comment";
import cookieparser from "cookie-parser";

const app=express();
const PORT=4444;
app.use(express.json());
app.use(cookieparser());
// app.use(express.urlencoded({extended:true}));
app.set("view engine","hbs");

app.get("/",(req,res)=>{
    res.render("home");
})

//routes
app.use("/user",userRoute);
app.use("/login",loginRoute);
app.use("/tweet",tweetRoute);
app.use("/likes",likeRoute);
app.use("/comment",commentRoute);
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
