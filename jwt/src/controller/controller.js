import model from "../model/model.js";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";

dotenv.config();

const { cadastroLogin, verificaLogin,SelectLogin } = model;

const login = {
    createLogin: async (req, res) => {
        try {
            console.log(req.body)
            const { login, password } = req.body
            const insert = cadastroLogin(login, password)
            console.log(insert)
            return res.status(200).send("foi cobracai")

        } catch (error) {
            console.log(error)
        }
    },

    loginJWT: async (req, res) => {
        try {
            const secretKey = process.env.SECRET_KEY;
            if (!secretKey) {
                return res.status(500).send("Chave secreta não configurada.");
            }
            const { login, password } = req.body;
            const user = await verificaLogin(login, password);
            console.log(user)
    
            if (user) {
                const token = jwt.sign({ id: user.id, cpf: user.login }, secretKey, { expiresIn: '1h' });
                res.status(200).send("Autorizado")
            } else {
                res.status(401).send("Senha incorreta");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno do servidor");
        }
    },

    
    selectLogin: async (req, res) => {
        try {
            console.log("entrou aqui")
            const user = await SelectLogin();
            console.log(user)
            return res.json(user)
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro interno do servidor");
        }
    },

    
}

export default login;