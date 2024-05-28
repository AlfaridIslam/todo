import { sqlConnection, executeQuery } from "../db/connection";
import { QueryTypes } from "sequelize";

// Define the contacts schema
const todoSchema = `
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(255) NOT NULL,    
    user_id INT NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES taskmaster.users (user_id)
  )
`;

// Function to create the contacts table if it doesn't exist
const createTodoTable = async () => {
  try {
    await executeQuery(todoSchema, QueryTypes.RAW);
    console.log("Contacts table created successfully or already exists.");
  } catch (error) {
    console.error("Error creating contacts table:", error);
  }
};

// Function to add a new contact
const addTodo = async (todo: any, user_id: number) => {
  try {
    await executeQuery(
      "INSERT INTO todos (todo, user_id) VALUES (?, ?)",
      QueryTypes.INSERT,
      [todo, user_id]
    );
    console.log("Contact added successfully.");
  } catch (error) {
    console.error("Error adding contact:", error);
  }
};

// Export the functions
module.exports = { createTodoTable, addTodo };
