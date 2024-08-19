import { ref, set } from "firebase/database";

// Função para escrever dados de um usuário
function writeUserData(userId, name, email, database) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
  })
  .then(() => {
    console.log("Dados enviados com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao enviar os dados: ", error);
  });
}

export default writeUserData;
