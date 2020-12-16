import connect from "../../utils/database";

export default async (req, res) => {
  /**
  *  Método POST 
  **/ 
  if (req.method === "POST") {
    const { name, email, date_birth, whitelist } = req.body;

    // Caso a requisição não possua a variável { name } correta, mostra mensagem de erro e não realiza o registro

    if (!name || !email || !date_birth) {
      res.status(400).json({ error: "Missing body parameter" });
      return;
    }

    // Conecta no Banco de Dados
    const { db } = await connect();
    
    // Busca pelo e-mail
    const emailAlreadyRegistered = await db
      .collection('users')
      .findOne({ email })

    // Valida se o e-mail já esta registrado
    if(emailAlreadyRegistered) {
      const response = await db.collection("user").insertOne({
        name,
        email,
        date_birth,
        // É um array de objetos
        whitelist: whitelist || [],
      });

      res.status(200).json(response.ops[0]);
    } else {
      res.status(400).json({error: "E-mail already exist"})
    }
      
    /**
     *  Método GET 
     **/ 
    } else if (req.method === "GET") {
      const { email } = req.body;

      // Caso email não exista
      if (!email) {
        res.status(400).json({ error: "Missing user e-mail on request body" });
        return;
      }

      const { db } = await connect();

      const response = await db
        .collection("user")
        .findOne({ email });

      if (!response) {
        res.status(400).json({ error: "User not found" });
        return;
      }
      res.status(200).json(response);
    } else {
    // Caso não seja o método correto, exibe erro
    res.status(400).json({ error: "Wrong request method" });
  }
};
