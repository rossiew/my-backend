import pool from "../config/db.js";

class UserController {
  async getUser(req, res) {
    try {
      const result = await pool.query("SELECT * FROM users");
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUsersById(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addUser(req, res) {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async putUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
