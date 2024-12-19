import db from "../index.js"


export const addpost = async (req, res) => {
  try {
    // Destructure request body
    const { title, address, price, desc, beds, bath, area, school, bus, rest, type, property } = req.body;

    // Step 1: Query to get the user_id from the username
    const getUserIdQuery = "SELECT user_id FROM user WHERE username = ?";
    const username= localStorage.getItem("username")
    db.query(getUserIdQuery, [username], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      
      // If no user found, return an error
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userId = result[0].user_id;

      // Step 2: Insert the post into the PROPERTY table with the obtained user_id
      const insertPostQuery = "INSERT INTO PROPERTY (title, address, price, description, beds, bathroom, area, school, bus_stop,restaurant, owner,type, property) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(insertPostQuery, [title, address, price, desc, beds, bath, area, school, bus, rest, userId,type, property], (err, data) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          console.log("Post has been created successfully");
          return res.status(201).json({ message: "Post has been created successfully" });
        }
      });
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ error: "An error occurred while creating the post" });
  }
};


export const getAllPosts = async (req, res) => {
    try {
      const q = "SELECT * FROM PROPERTY";
      db.query(q, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).json(data);
        }
      });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching the posts" });
    }
  };


  export const getSinglePost = async (req, res) => {
    try {
      const { id } = req.params;
      const q = "SELECT * FROM PROPERTY WHERE property_id = ?";
      db.query(q, [id], (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        
        if (data.length === 0) {
          return res.status(404).json({ message: "Post not found" });
        } else {
          return res.status(200).json(data[0]);
        }
      });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching the post" });
    }
  };
  
  
