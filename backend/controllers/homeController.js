const path = require('path');
//Models inside the mongoDB database
const User = require('../models/usersModel.js');
const Task = require('../models/TaskModel.js');
const bcrypt = require('bcrypt');
const { format , parseISO } = require('date-fns')


module.exports =  {
    getLandingPage: async (req,res) => {
        try {
          res.sendFile(path.join(__dirname, '../../frontend/public/index.html'))
        } catch (error) {
          console.log(error.message);
          res.status(500).send({message: error.message})
        }
    },
    getHomePage: async (req, res) => {
      try {
        // Gets user information in req.user that is created once logged in or if they sign up
        const userId = req.session.user.id;

        // Fetch tasks for the logged-in user from the database
        const userTasks = await Task.find({ userId: userId });
        console.log(userId)
        const user = await User.findOne({ _id: userId });
        console.log(user)
        const fullName = user.fullName;

        // Function to get the current date in the format "MM/DD/YYYY"
        const getCurrentFormattedDate = () => {
          const currentDate = new Date();
          const month = String(currentDate.getMonth() + 1).padStart(2, '0');
          const day = String(currentDate.getDate()).padStart(2, '0');
          const year = currentDate.getFullYear();

          // Format the date as "MM/DD/YYYY"
          return `${month}/${day}/${year}`;
        };

        // Ensure that formattedDate is a string
        const formattedDate = getCurrentFormattedDate();


        res.render('home', { tasks: userTasks, formattedDate: formattedDate, fullName: fullName})
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getCreateTaskPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/createTask/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getLoginPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/logIn/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getSignUpFormPage: async (req, res) => {
      try {
        res.sendFile(path.join(__dirname, '../../frontend/public/signUpForm/index.html'));
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    getProfilePage: async (req,res) => {
      try {
        const successMessage = req.flash('success');
        const errorMessage = req.flash('error');
        res.render('profile', { successMessage, errorMessage })
      } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
      }
    },
    signUpUser: async (req,res) =>{
      try {
        //This destructure the body
        const formData = req.body;

        // Process the form data as needed
        console.log('Received form data:', formData);

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: formData.email });

        if (existingUser) {
          // Handle duplicate email entry
          res.status(400).send({ message: 'Email already in use' });
        }

        //Hash password before storing in database 
        const newUser = new User({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          // Hash the password
          password: await bcrypt.hash(formData.password, 10), // 10 is the number of salt rounds
        });

        // Process the form data as needed
        console.log('Data updated after hashing password:', newUser);

        // Save the user to the database
        await newUser.save();

        // Store user information in the session
        req.session.user = { id: newUser._id, email: newUser.email, fullName: newUser.fullName };

        // Redirect to the home page or send a success response
        res.redirect('/home'); 
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
    loginUser: async (req,res) => {
      try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store user information in the session
        const userInfo = { id: user._id, email: user.email, fullName: user.fullName };
        req.session.user = userInfo;
        req.user = userInfo;
        
        console.log(req.session.user);
    
        res.redirect('/home');
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
    createTask: async (req,res) => {
      try {
        // Another approach on how to destructure the body
        const { taskTitle, date, time, textArea } = req.body;
        console.log(req.body);
        
        // Gets user information in req.user that is created once logged in or if they sign up
        const userId = req.session.user.id;

        // Parse ISO 8601 formatted date and format it to MM/DD/YYYY
        const formattedDate = format(parseISO(date), 'MM/dd/yyyy');
        
        //Save the task data to the Task model in the database
        const task = new Task({
          taskTitle: taskTitle,
          date: formattedDate,
          time: time,
          description: textArea,
          userId: userId,
        });

        console.log(task)

        // Save the task to the database
        await task.save();

        // Redirect to the home page after successful task creation
        res.redirect('/home');
        
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message})
      }
    },
    getTaskByDate: async (req,res) =>{
      try {
        const userId = req.session.user.id;
        const date = req.query.date;

        // Fetch tasks for the logged-in user and the specified date
        const tasks = await Task.find({ userId: userId, date: date });

        res.json({ tasks: tasks });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    },
    logoutUser: async (req,res) => {
       // Destroy session or clear token
      req.session.destroy();

      // Redirect to the login page
      res.redirect('/')
    },
    updateUserProfile: async (req, res) => {
      try {
        const { fullName, phoneNumber, email, password } = req.body;
        console.log(req.body);
        console.log('Received PUT request to /updateUserProfile:', req.body);
        //Retrieves users id in session 
        const id = req.session.user.id;

        // Find the user by ID
        const user = await User.findByIdAndUpdate(
          id,
          {
             // Update user details
            fullName : fullName,
            phoneNumber : phoneNumber,
            email : email,
            password : await bcrypt.hash(password,10),
          },
        );

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Save the updated user
        await user.save();

        console.log(user)

        //These messages are temporarily stored in the session
        // Set a flash message
        req.flash('success', 'User profile updated successfully');
        // Inside updateUserProfile controller
        console.log('Flash success message:', req.flash('success'));

        //res.redirect('/profile')
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error updating user profile:', error);

        // Set an error flash message
        req.flash('error', `Failed to update user profile: ${error.message}`);

        console.log('Flash error message:', req.flash('error'));   

        res.status(500).json({ error: `Failed to update user profile: ${error.message}` });
      }
  },
}



