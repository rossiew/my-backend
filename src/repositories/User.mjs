

import pool from "../database.mjs";
import {hashPassword} from "../helpers/hash.mjs"

class UserRepository {
    static async getUsers() {
        const response = await pool.query("SELECT * FROM users");
        return response.rows;
    }

    static async getUserById(id) {
        const response = await pool.query("SELECT * FROM users WHERE id = $1", [
            id
        ]);
        if (!response.rows.length) {
            throw new Error(`User with id ${id} not found`);
        }
        return response.rows[0];
    }

    static async getUserByEmail(email) {
        const response = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);
        if (!response.rows.length) {
            throw new Error(`User with email ${email} not found`);
        }
        return response.rows[0];
    }

    static async addUser(user) {
        const hash = await hashPassword(user.password);
        const response = await pool.query(
            "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) returning *",
            [user.fullname, user.email, hash]
        );
        if (!response.rows.length) {
            return null;
        }
        return response.rows[0];
    }

    static async updateUserFullname(user, fullname) {
        const response = await pool.query(
            "UPDATE users SET fullname = $1 WHERE id = $2 returning *",
            [fullname, user.id]
        );
        return response.rows[0];
    }

    static async updateUserPassword(user, email) {
        const response = await pool.query(
            "UPDATE users SET password = $1 WHERE email = $2 returning *",
            [user.password, email]
        );
        return response.rows[0];
    }

    static async deleteUser(id) {
        const response = await pool.query("DELETE FROM users WHERE id = $1 returning *", [id]);
        return response.rows[0];
    }
}

export default UserRepository;