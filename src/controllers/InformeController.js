const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const informes = await connection("informes").select("*");

    return res.json(informes);
  },

  async create(req, res) {
    await connection("ongs").insert({
      ...req.body,
      id: generateUniqueId()
    });

    return res.json({ id });
  }
};
