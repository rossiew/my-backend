import bcrypt from 'bcryptjs';

const saltRounds = 10;//күрделі болу үшін процесс


//хэш текстке айналдыру
export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

//обычный текстпен - хэш текст салыстыру үшін
export const comparePassword = async (plain, hashed) => bcrypt.compareSync(plain, hashed);




