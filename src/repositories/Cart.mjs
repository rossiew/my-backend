import pool from "../database.mjs";

class CartRepository {

    static async getUserCart(user) {
        const response = await pool.query("SELECT forProducts.*, quantity  FROM (forCartes INNER JOIN forProducts  ON forCartes.product_id = forProducts.id) WHERE user_id = $1 ", [user.id]);
        return response.rows
    }

    static async addProductsToCart(user, product, quantity = 1) {
        const response = await pool.query("INSERT INTO forCartes (user_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING * ", [user.id, product.id, quantity]);
        return response.rows[0];
    }

    static async updateProductQuantity(user, product, quantity) {
        if (quantity == 0) {
            return await CartRepository.deleteProductFromCart(user, product);
        }
        const response = await pool.query("UPDATE forCartes SET quantity =$1 WHERE user_id =$2  AND product_id=$3 RETURNING * ", [quantity, user.id, product.id]);
        return response.rows[0]
    }
    static async deleteProductFromCart(user, product) {
        const response = await pool.query("DELETE FROM forCartes WHERE user_id = $1  AND  product_id =$2 RETURNING * ", [user.id, product.id]);
        return response.rows[0]

    }

    static async clearCart(user) {
        const response = await pool.query("DELETE FROM forCartes WHERE user_id=$1  RETURNING * ", [user.id]);
        return response.rows[0];
    }
}

export default CartRepository;