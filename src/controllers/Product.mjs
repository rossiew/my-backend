import CartRepository from "../repositories/Cart.mjs";
import ProductRepository from "../repositories/Product.mjs";


class ProductController {
    async getProducts(req, res) {
        const products = await ProductRepository.getProducts();

        if (req.user) {
            const cart = await CartRepository.getUserCart(req.user);
            products.forEach((product) => {
                const inCart = cart.some((item) => item.id == product.id);
                product.inCart = inCart;
            });
        }
        res.status(200).send(products)
    }


    async getProductById(req, res) {
        const id = req.params.id;
        const product = await ProductRepository.getProductById(id)
        if (req.user) {
            const cart = await CartRepository.getUserCart(req.user);
            const inCart = cart.some((item) => item.id == product.id);
            product.inCart = inCart;
        }
        res.status(200).send(product)
    }

    async getProductsByCategory(req, res) {
        const category = req.params.category;
        const products = await ProductRepository.getProductsByCategory(category)
        if (req.user) {
            const cart = await CartRepository.getUserCart(req.user);
            products.forEach((product) => {
                const inCart = cart.some((item) => item.id == product.id);
                product.inCart = inCart;
            });
        }
        res.status(200).send(products)
    }

    async addProduct(req, res) {
        const product=await ProductRepository.addProduct(req.body)
        res.status(201).send(product)
    }

    async putProduct(req, res) {
        const id = req.params.id
        const product= await ProductRepository.updateProduct(id,req.body)
        res.status(200).send(product)
    }

    async deleteProduct(req, res) {
        const id = req.params.id
        const product= await ProductRepository.deleteProduct(id)
        res.status(200).send(product)
    }
}

export default ProductController;
