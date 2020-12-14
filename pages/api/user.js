import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";

export default async (req, res) => {

  // Detecção do método que esta sendo utilizado
  // Permitir somente POST
  // Só conecta se for o método correto { POST }
  if (req.method === "POST") {
    const { name, email, date_birth} = req.body;

    // Caso a requisição não possua a variavel { name } correta, mostra mensagem de erro e não realiza o registro
    if(!name || !email || !date_birth) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
    }
    
    const { db } = await connect();

    const response = await db.collection("user").insertOne({
      name, 
      email, 
      date_birth
    });

    res.status(200).json(response.ops[0]);
  } else {
      // Caso não seja o método correto, exibe erro
    res.status(400).json({ error: "Wrong request method" })
  }
};
