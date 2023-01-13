const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ClientSchema = new Schema({
  id: ObjectId,
  nome: { type: String, required: true },
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  telefone: { type: Number, required: true },
  cep: { type: Number, require: true },
  logradouro: { type: String, required: true },
  complemento: String,
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
});

const ClientModel = mongoose.model("clients", ClientSchema);

module.exports = ClientModel;
