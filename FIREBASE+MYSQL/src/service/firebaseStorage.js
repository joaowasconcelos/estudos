import admin from "firebase-admin";
import serviceAccount from "../config/firebase_key.json" assert { type: 'json' };

const bucketName = "teste-firebase-b05a9.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();
  const imagem = req.file;
  const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();
  const file = bucket.file(nomeArquivo);
  const stream = file.createWriteStream({
    metadata: {
      contentType: imagem.mimetype,
    }
  });

  stream.on("error", (e) => {
    console.error(e);
  });
  stream.on("finish", async () => {
    // Tornar o arquivo público
    await file.makePublic();

    // Obter URL pública
    req.file.firebaseUrl = `https://storage.googleapis.com/${bucketName}/${nomeArquivo}`;
    next();
  });
  stream.end(imagem.buffer);
};

const listAllFiles = async () => {
  try {
    const [files] = await bucket.getFiles();
    const fileUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
    return fileUrls;
  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error('Error listing files');
  }
};

export { uploadImage, listAllFiles };
