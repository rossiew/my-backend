import pool from "../database.mjs";

class ProductRepository {
    static async getProducts() {
        const response = await pool.query('SELECT * FROM forProducts');
        return response.rows;
    }

    static async getProductById(id) {
        const response = await pool.query('SELECT * FROM  forProducts WHERE  id =$1', [id]);
        return response.rows[0]
    }

    static async getProductsByCategory(category) {
        const response = await pool.query('SELECT * FROM  forProducts WHERE  category = $1', [category]);
        return response.rows
    }

    static async addProduct(product) {
        const { title,images,category,description,price,stock } = product;
        const response = await pool.query("INSERT INTO forProducts(title,images,category,description,price,stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ", [title,images,category,description,price,stock]);
        return response.rows[0];
    }

    static async updateProduct(id, product) {
        const { title,images,category,description,price,stock } = product;
        const response = await pool.query("UPDATE forProducts  SET title=$1,images=$2,category=$3,description=$4,price=$5,stock=$6 WHERE id =$7 RETURNING * ", [title,images,category,description,price,stock ,id]);
        return response.rows[0]
    }

    static async deleteProduct(id) {
        const response = await pool.query("DELETE FROM forProducts WHERE id =$1 RETURNING * ", [id]);
        if (!response.rows.length) {
            throw new Error(`Products with id ${id} not found `)
        }
        return response.rows[0];
    }
}

export default ProductRepository;
