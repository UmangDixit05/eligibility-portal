import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/students.routes.js'
import  displayStatusRoutes  from './routes/displayStatus.routes.js';
import { config } from './config/config.js';
import updateSubmissionsRoutes from './routes/updateSubmissions.routes.js';
import updateStudentRoutes from './routes/studentsUpdate.routes.js';
import authRoutes from './routes/authRoutes.js'


const app = express();


//MIDDLEWARES
app.use(express.json());
app.use(cors());


//ROUTES
app.use("/api/users", userRoutes);
app.use("/api", studentRoutes);
app.use('/api', displayStatusRoutes);
app.use('/api', updateSubmissionsRoutes);
app.use('/api', updateStudentRoutes);
app.use('/api', authRoutes);



app.get("/", (req, res) => {
    res.send("This is the backend ");
});


  //START THE SERVER
const PORT = config.port || 8080;

app.listen(PORT, () => {
    console.log("connected to backend");
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl
    });
});
