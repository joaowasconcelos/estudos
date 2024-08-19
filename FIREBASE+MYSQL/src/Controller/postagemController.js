import {listAllFiles } from '../service/firebaseStorage.js'; 

const store = async (req, res) => {
    res.send('Postagem recebida', req.file);
}

const imagensRecebidas = async (req, res) => {
    try {
        const fileUrls = await listAllFiles();
        console.log(fileUrls)
        res.json(fileUrls);
    } catch (error) {
        res.status(500).send('Error fetching images');
    }
}

export { store, imagensRecebidas }
