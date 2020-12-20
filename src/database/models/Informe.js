const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const informeSchema = new Schema(
  {
    dia: {
      type: Date,
      required: true,
    },
    confirmados: {
      type: Number,
      required: true,
    },
    recuperados: {
      type: Number,
      required: true,
    },
    monitoramento: {
      type: Number,
      required: true,
    },
    obto_investigacao: {
      type: Number,
      required: true,
    },
    obto_descartado: {
      type: Number,
      required: true,
    },
    obto_confirmado: {
      type: Number,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Informe = mongoose.model("Informe", informeSchema);
module.exports = { Informe, informeSchema };
