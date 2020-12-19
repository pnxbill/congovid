const { Informe } = require("../models/Informe");

const resolvers = {
  Query: {
    getInformes: (parent, args) => {
      return Informe.find({})
        .sort("dia")
        .exec(function (err, docs) {
          return docs.sort((a, b) => {
            const fixDate = (d) => {
              let arr = d.split("/");
              [arr[0], arr[1]] = [arr[1], arr[0]];
              return new Date(arr.join("/"));
            };
            return fixDate(b.dia) - fixDate(a.dia);
          });
        });
    },

    getInforme: (parent, args) => {
      return Informe.findOne({ dia: args.dia });
    },
  },
  Mutation: {
    addInforme: (parent, args) => {
      let informe = new Informe({
        dia: args.dia,
        confirmados: args.confirmados,
        recuperados: args.recuperados,
        monitoramento: args.monitoramento,
        obto_investigacao: args.obto_investigacao,
        obto_descartado: args.obto_descartado,
        obto_confirmado: args.obto_confirmado,
        href: args.href,
      });
      return informe.save();
    },
    updateInforme: (parent, args) => {
      if (!args.id) return;
      return Movie.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            dia: args.dia,
            confirmados: args.confirmados,
            recuperados: args.recuperados,
            monitoramento: args.monitoramento,
            obto_investigacao: args.obto_investigacao,
            obto_descartado: args.obto_descartado,
            obto_confirmado: args.obto_confirmado,
            href: args.href,
          },
        },
        { new: true },
        (err, Movie) => {
          if (err) {
            console.log("Ocorreu um erro ao atualizar o informe");
          }
        }
      );
    },
  },
};

module.exports = { resolvers };
