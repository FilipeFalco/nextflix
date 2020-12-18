import connect from "../../../utils/database";

export default async (req, res) => {
  /**
   *  Método GET
   *  Mostra usuário
   **/
  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        const { email } = req.query;
        // Caso email não exista
        if (!email) {
          res
            .status(400)
            .json({ error: "Missing user e-mail on request body" });
          return
        }

        const { db } = await connect();

        const response = await db.collection("user").findOne({ email });

        if (!response) {
          res.status(400).json({ error: "User not found" });
          return
        }
        res.status(200).json(response);
        break
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    //Caso não haja metodo correto, exibe erro
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
