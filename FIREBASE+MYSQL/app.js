import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { uploadImage } from './src/service/firebaseStorage.js'; 
import {store,imagensRecebidas} from './src/Controller/postagemController.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }  // Limite de 1MB
});

app.post('/postagens', Multer.single('imagem'), uploadImage, store);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Nova rota para exibir todas as imagens
app.get('/images',imagensRecebidas);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
