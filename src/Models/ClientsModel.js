const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClientSchema = new Schema({
  id: ObjectId,
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: Number, required: true },
  endereco: { type: String, required: true },
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
});

const ClientModel = mongoose.model("clients", ClientSchema);

module.exports = ClientModel;
