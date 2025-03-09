//Бұл код Node js арқылы Express қолдана отырып сервер жасайды

import express from "express";
import productRouter from './routes/product.mjs'
import usersRouter from './routes/user.mjs'
import session from "express-session";
import cartRouter from "./routes/cart.mjs"
import AuthRouter from "./routes/auth.mjs"
import pool from "./database.mjs";
import pgSimpleSession from "connect-pg-simple";
const PgSession = pgSimpleSession(session);
import "./helpers/local-strategy.mjs"
import passport from "passport";
import todo from "./routes/todo.mjs"
import cors from "cors";

//passport және local-strategy: аутентификация үшін.

const app = express();  // express: сервер жасауға арналған фреймворк.

app.use(express.json());//: чтобы приложение могло принимать и обрабатывать JSON данные.


app.use(cors({ origin: true, credentials: true }));
//cors-это стандарт, позволяющий предоставлять веб-страницам доступ к объектам сторонних интернет-ресурсов.
//credentials: true - сервер адамды есінде сақтап қалу үшін
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7  //// Сессияның өмір сүру уақыты (1 апта)
    },
    store: new PgSession({
        pool: pool,  //pool: подключение к базе данных PostgreSQL.
        tableName: "session",
    })
}));
//session-бұл сервер мен клиент  арасында уақытша байланыс орнатуға арналған механизм.


app.use(passport.initialize());
app.use(passport.session());
app.use(todo)
app.use("/auth",AuthRouter)
app.use(cartRouter)
app.use(productRouter)
app.use(usersRouter)


const appStart = () => {
    try {
        app.listen(8000, () => {
            console.log(`Server running on port 8000`);
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }

}
appStart();


