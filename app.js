const express = require("express");
const { connectToMongoDb } = require("./config/connection");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoutes= require("./routes/userRoutes");
const uploadImageRoutes = require("./routes/uploadImageRoutes");
const homePageRoutes = require("./routes/homePageRoutes");
const likeRoutes = require("./routes/likesRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const reportRoutes = require("./routes/reportRoutes")
// const upload = require("./middlewares/multer");

dotenv.config();

const app = express();

const PORT = process.env.PORT||8000; 

// DbConnection
connectToMongoDb(process.env.MONGO_URL)
.then(()=>console.log("MongoDb connected"))
.catch((err)=> console.log(`connection failed err : ${err}`));

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/user", userRoutes);
app.use("/images", uploadImageRoutes)
app.use("/home", homePageRoutes)
app.use("/likes", likeRoutes)
app.use("/chat", messageRoutes)
app.use("/report", reportRoutes)


//Server
app.listen(PORT, ()=> console.log(`server started at PORT: ${PORT}`));























