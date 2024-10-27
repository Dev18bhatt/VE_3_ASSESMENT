const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userModel = require('./models/user_model');
const tasksModel = require('./models/task_model');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();  // Load environment variables

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using the URL from .env
mongoose.connect(process.env.MONGODB_URL,

)
    .then(() => {
        console.log("Database connected...");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Server is Up And Running");
});


// api end point for register user.

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    // if (!username || !email || !password) {
    //     return res.status(400).json({ message: "Necessary fields can't be empty" });
    // }

    try {
        // Check if user already exists
        const alreadyExist = await userModel.findOne({ email });
        if (alreadyExist) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Save the user with hashed password
        const createUser = await userModel.create({
            username,
            email,
            password: hash
        });

        res.status(201).json({ message: "Registered Successfully..." });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration failed. Please try again later." });
    }
});


// api end point for login.
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const findUser = await userModel.findOne({ username: username });

        if (!findUser) {
            return res.status(404).send({ message: "User not found" });
        }

        // Check if the password matches
        const doesExist = await bcrypt.compare(password, findUser.password);

        if (!doesExist) {
            return res.status(400).send({ message: "Incorrect password" });
        }

        // Generate a JWT token with the username
        const token = jwt.sign({ username: findUser.username }, process.env.JWT_SECRET);
        res.status(200).send({ message: "Login Successful", token: token });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send({ message: "Something went wrong..." });
    }
});
function middlewares(req, res, next) {
    if (req.headers.authorization !== undefined) {
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "shhh", (err, data) => {
            if (!err) {
                console.log(data); // Now data will include the username

                req.user = data;
                console.log("going inside the caller function...");
                next();
            } else {
                res.status(403).send({ message: "Invalid Token" });
            }
        });
    } else {
        res.send({ message: "Please send a token" });
    }
}



// all the end point below are related to task create , update and delete. based on id.

app.post("/addTask", middlewares, async (req, res) => {
    try {
        const { title, description, deadline, created_by, status } = req.body;

        if (!title || !description || !deadline || !created_by || !status) {
            return res.status(400).send({ message: "Fields can't be empty..." });
        }

        const createTask = await tasksModel.create({
            title,
            description,
            deadline,
            created_by,
            status
        });

        res.status(201).send({ message: "Task has been successfully created." });

    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


// api end point to fetch all the task.

app.get("/getAllTask", middlewares, async (req, res) => {
    try {
        const allTask = await tasksModel.find();
        if (allTask.length == 0) {
            res.send({ message: "No task is created yet..." });
        }
        else {
            res.status(201).send({ message: "Task Fetched Successfully...", allTask });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error..." });
    }
})
app.get("/getTask/:id", middlewares, async (req, res) => {
    try {
        console.log(req.user.username);
        const task = await tasksModel.findById({
            _id: req.params.id,
        });
        if (task == null) {
            return res.status(404).send({ message: "Cannot find the task" });
        }
        else {
            res.status(201).send({ message: "Task fetched Successfully", task });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
);
app.put("/updateTask/:id", middlewares, async (req, res) => {
    const updateTaskData = req.body.task;

    // Check if task data is provided in the request body
    if (!updateTaskData) {
        return res.status(400).send({ message: "Please provide valid task data in the request body." });
    }

    try {
        // Find the task by ID and verify it belongs to the user
        const currentTask = await tasksModel.findOne({
            _id: req.params.id,

        });

        if (!currentTask) {
            return res.status(404).send({ message: "Task not found or access is forbidden." });
        }

        // Update fields if they are provided in the request
        if (updateTaskData.title != null) currentTask.title = updateTaskData.title;
        if (updateTaskData.description != null) currentTask.description = updateTaskData.description;
        if (updateTaskData.status != null) currentTask.status = updateTaskData.status;
        if (updateTaskData.deadline != null) currentTask.deadline = updateTaskData.deadline;

        // Save the updated task
        await currentTask.save();

        // Send a response with the updated task
        res.status(200).send({ message: "Task updated successfully.", task: currentTask });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// delete end point... 

app.delete("/deleteTask/:id", middlewares, async (req, res) => {
    try {
        // Find and delete the task by ID, ensuring it belongs to the user
        const deletedTask = await tasksModel.findOneAndDelete({
            _id: req.params.id,

        });

        // If no task is found, return 404
        if (!deletedTask) {
            return res.status(404).send({ message: "No task found or access is forbidden." });
        }

        // If the task is deleted, send a success response
        res.status(200).send({ message: "Task deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// Use the PORT from environment variables or default to 8000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
