const ClientModel = require("../Models/ClientsModel.js");

const validatingBody = async (req) => {
  const { nome, email, telefone, endereco, cpf } = req.body;

  if ((!nome || !email || !telefone, !endereco, !cpf)) {
    const error = new Error("Todos os campos são obrigatórios.");
    error.code = 400;
    throw error;
  }

  if (
    typeof nome !== "string" ||
    typeof email !== "string" ||
    typeof endereco !== "string"
  ) {
    const error = new Error("nome, e-mail ou endereço não são uma string.");
    error.code = 400;
    throw error;
  }

  if (!Number(telefone) || !Number(cpf)) {
    const error = new Error("Telefone ou cpf devem ser somente números.");
    error.code = 400;
    throw error;
  }

  const clients = await ClientModel.find();

  if (!email.includes("@") || !email.includes(".")) {
    const error = new Error("O e-mail não está num formato aceitável.");
    error.code = 400;
    throw error;
  }

  if (`${cpf}`.length !== 11) {
    const error = new Error("Cpf não tem o tamanho correto.");
    error.code = 400;
    throw error;
  }

  const checkingUniqueEmail = clients.filter(
    (client) => client.email === email
  );
  if (checkingUniqueEmail) {
    const error = new Error("Um usuário com esse email já foi cadastrado.");
    error.code = 400;
    throw error;
  }
  const checkingUniqueCpf = clients.filter((client) => client.cpf === cpf);
  if (checkingUniqueCpf) {
    const error = new Error("Um usuário com esse cpf já foi cadastrado.");
    error.code = 400;
    throw error;
  }

  if (`${telefone}`.length < 8 || `${telefone}`.length > 9) {
    const error = new Error("Telefone não tem o tamanho correto.");
    error.code = 400;
    throw error;
  }
};

class ClientController {
  async store(req, res) {
    try {
      await validatingBody(req);

      const client = await ClientModel.create(req.body);

      return res.status(201).json(client);
    } catch (error) {
      if (error.message && error.code)
        return res.status(error.code).json({ message: error.message });
      if (error.message.includes("required"))
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios." });
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async show(req, res) {
    try {
      const clients = await ClientModel.find();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async index(req, res) {
    const { id } = req.params;

    try {
      const client = await ClientModel.findById(id);
      if (!client) {
        throw { message: "Cast to ObjectId" };
      }
      return res.status(200).json(client);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId"))
        return res.status(404).json({ message: "Cliente não encontrado" });

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    try {
      const client = await ClientModel.findById(id);
      if (!client) {
        throw { message: "Cast to ObjectId" };
      }

      await validatingBody(req);
      await ClientModel.findByIdAndUpdate(id, req.body);

      return res.status(200).json(client);
    } catch (error) {
      if (error.message.includes("Cast to ObjectId"))
        return res.status(404).json({ message: "Cliente não encontrado" });
      if (error.message && error.code)
        return res.status(error.code).json({ message: error.message });
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
  async destroy(req, res) {
    const { id } = req.params;
    try {
      await ClientModel.findByIdAndDelete(id);
      return res.status(200).send();
    } catch (error) {
      if (error.message.includes("Cast to ObjectId")) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}

module.exports = new ClientController();
