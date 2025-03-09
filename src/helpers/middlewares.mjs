//Бұл код Express.js қолданбасындағы маршруттар үшін аралық функциялар (middlewares) жасайды.

import ProductRepository from "../repositories/Product.mjs";

export function validateId(req,res,next){
    const session_id = req.params.id;
    console.log(session_id);
    const id=req.params.id;
    const parsedId=parseInt(id);
    if(isNaN(parsedId)){
        return res.status(400).send("Invalid id")
    }
    next();
}

//validateId: Бірінші аралық функция ретінде id мәнінің жарамдылығын тексереді.
// resolveProduct: Екінші аралық функция ретінде өнімнің бар-жоғын тексереді.
// Егер екі аралық функция да сәтті өтсе, соңғы функция өнімді қайтарады немесе басқа әрекеттерді орындайды.







export async function resolveProduct(req,res,next){
    const id=req.params.id;
    const product=await ProductRepository.getProductById(id);
    if(!product){
        return res.status(404).send("Product not found")
    }
    next();
}