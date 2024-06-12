const config = require("../../config");
const util = require("util");
const { DataTypes } = require("sequelize");

const GeminiDB = config.DATABASE.define("Geminis", {
  chatid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  history: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
  },
});

const SaveGemini = async (chatid, parts) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gemini = await GeminiDB.findOne({ where: { chatid } });
      if (!gemini) {
        await GeminiDB.create({ chatid, history: parts });
      }
      let part = gemini.history;
      part.push(parts);
      return await gemini.update({ chatid, history: part }).then(resolve);
    } catch (e) {
      console.log(util.format(e));
    }
  });
};

const GetGemini = async (chatid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const gemini = await GeminiDB.findOne({ where: { chatid } });
      if (!gemini) return resolve([]);
    } catch (e) {
      console.log(util.format(e));
      return resolve([]);
    }
  });
};

module.exports = { SaveGemini, GetGemini };
