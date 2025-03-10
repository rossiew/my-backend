//Бұл кодтың мақсаты – пайдаланушыларды қауіпсіз түрде аутентификациялау және олардың сессияларын басқару.
// Куки пайдаланушының браузерінде сақталып, сервер әрбір сұраныс кезінде пайдаланушыны тану үшін пайдаланылады.

import passport from "passport";
import { Strategy } from "passport-local";
import UserRepository from "../repositories/User.mjs";
import { comparePassword } from "./hash.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await UserRepository.getUserById(id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    } catch (err) {
        done(err, null)
    }
});


export default passport.use(
    new Strategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const findUser = await UserRepository.getUserByEmail(username);
            if (!findUser) throw new Error("User Not Found");
            if (!(await comparePassword(password, findUser.password)))
                throw new Error("Bad Credentials");
            done(null, findUser);
        } catch (err) {
            done(err, null)
        }
    })
);


//cookie-юзер браузерн сактайды 
