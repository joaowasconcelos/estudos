
import bcrypt from "bcrypt"
import obterConexaoDoPool from "../config/db_config.js"

async function cadastroLogin(login,password) {
    console.log(login,password)
    const bd = await obterConexaoDoPool()
    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const insert = await bd.query(`INSERT INTO LOGIN(LOGIN,PASSWORD) VALUE(?,?);`,
            [login,passwordHash]);
        console.log(insert);

    } finally {
        bd.release();  
    }
}

async function verificaLogin(login, password) {
    const bd = await obterConexaoDoPool();
    try {

        const user = await bd.query(`SELECT ID,PASSWORD,LOGIN FROM LOGIN WHERE LOGIN = ?;`, [login]);
        const userv = user[0][0]
        const passwordHash = userv.PASSWORD;
        const isMatch = await bcrypt.compare(password, passwordHash);
        if (isMatch) {
            return userv;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return false;
    } finally {
        bd.release();  
    }
}

async function SelectLogin() {
    const bd = await obterConexaoDoPool();
    try {
        const user = await bd.query(`SELECT * FROM LOGIN ;`);
        const userv = user[0]
        return userv
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return false;
    } finally {
        bd.release();  
    }
}

export default {cadastroLogin,verificaLogin,SelectLogin}
