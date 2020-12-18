const { gql } = require('apollo-server-express');
const { Informe } = require('../models/Informe');

const typeDefs = gql`
  type Informe {
    id: ID!
    dia: String!
    confirmados: Float!
    recuperados: Float!
    monitoramento: Float!
    obto_investigacao: Float!
    obto_descartado: Float!
    obto_confirmado: Float!
    href: String!
  }
  type Query {
    getInformes: [Informe]
    getInforme(dia: String): Informe
  }
  type Mutation {
    addInforme(input: InformeInput): Informe
    updateInforme(input: InformeInput): Informe
    deleteInforme(id: ID!): Informe
  }

  input InformeInput {
    dia: String!
    confirmados: Float!
    recuperados: Float!
    monitoramento: Float!
    obto_investigacao: Float!
    obto_descartado: Float!
    obto_confirmado: Float!
    href: String!
  }
`;

module.exports = { typeDefs };