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
import cors from "cors";

//passport және local-strategy: аутентификация үшін.

const app = express();  // express: сервер жасауға арналған фреймворк.

app.use(express.json());//: чтобы приложение могло принимать и обрабатывать JSON данные.
app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.send("Server is alive");
});

app.use(cors({ origin: true, credentials: true }));
//cors-это стандарт, позволяющий предоставлять веб-страницам доступ к объектам сторонних интернет-ресурсов.
//credentials: true - сервер адамды есінде сақтап қалу үшін

//session-бұл сервер мен клиент  арасында уақытша байланыс орнатуға арналған механизм.


app.use(session({
    store: new PgSession({
      pool: pool, //pool: подключение к базе данных PostgreSQL.
      tableName: "session", // ← Міндетті түрде!
    }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //// Сессияның өмір сүру уақыты (1 апта)
      secure: false, // HTTPS болса true ет
    },
  }));
  

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",AuthRouter)
app.use(cartRouter)
app.use(productRouter)
app.use(usersRouter)


const appStart = () => {
    try {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }

}
appStart();


