
import {Router} from "express"
import ProductController from "../controllers/product.mjs";
import {validateId,resolveProduct} from "../helpers/middlewares.mjs";

const router=Router();
const controller=new ProductController();

router.get("/products/:id",validateId,resolveProduct,controller.getProductById);//Aйдимен алу

router.get("/products",controller.getProducts);

router.post("/products",controller.addProduct);

router.put("/products/:id",validateId,resolveProduct,controller.putProduct);

router.delete("/products/:id",validateId,resolveProduct,controller.deleteProduct);

router.get("/products/category/:category", controller.getProductsByCategory)




export default router;