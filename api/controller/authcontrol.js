import db from "../index.js"
//import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const getuser = async (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM USER WHERE USER_ID = ?`;
  
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.status(500).json({ error: "An error occurred while fetching the user." });
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json(data[0]);
    });
  };
  

export const createuser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
       // const hashedPassd = await bcrypt.hash(password, 10);

        // Parameterized query to prevent SQL injection
        const q = `INSERT INTO USER (username, email, password) VALUES ( ?, ?, ?)`;

        // Execute the query
        db.query(q, [username, email, password], (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log("User has been created successfully")
            return res.status(201).json({ message: "User has been created successfully" });
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ error: "An error occurred while creating the user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fetch the user from the database
        const q = 'SELECT * FROM USER WHERE username = ?';
        db.query(q, [username], async (err, data) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: "Database error" });
            }
            if (data.length === 0) {
                console.log('User not found:', username);
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const user = data[0];
            console.log('User found:', user);
            if (password !== user.password) {
                console.log('Password mismatch for user:', username);
                return res.status(401).json({ message: "Invalid username or password" });
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: user.user_id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            // Set the JWT token as a cookie
            res.cookie('token', token, {
                httpOnly: true,
               // secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hour
            });
            console.log("Login successful");
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
  };