import connect from "../../utils/database";

export default async (req, res) => {
  try {
    const { method } = req;
    /**
     *  Método POST
     **/
    switch (method) {
      case 'POST':
        const { name, email, date_birth, whitelist } = req.body;

        // Caso a requisição não possua a variável { name } correta, mostra mensagem de erro e não realiza o registro
        if (!name || !email || !date_birth) {
          res.status(400).json({ error: "Missing body parameter" });
          return;
        }

        // Conecta no Banco de Dados
        const { db } = await connect();

        const response = await db.collection("user").insertOne({
          name,
          email,
          date_birth,
          // É um array de objetos
          whitelist: whitelist || [],
        });

        res.status(200).json(response.ops[0]);
        break
      
      // Caso não seja um método aceito, retornar erro
      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    // Caso não seja o método correto, exibe erro
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
