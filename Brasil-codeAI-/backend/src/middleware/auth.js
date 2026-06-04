const ApiKey = require('../models/ApiKey');
const { assinaturaAtiva } = require('../services/subscription');

const authApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API Key obrigatória' });
  }

  const keyRecord = await ApiKey.findByKey(apiKey);
  if (!keyRecord) {
    return res.status(401).json({ error: 'API Key inválida' });
  }

  const ativa = await assinaturaAtiva(keyRecord.user_id);
  if (!ativa) {
    return res.status(403).json({ error: 'Assinatura expirada' });
  }

  req.userId = keyRecord.user_id;
  next();
};

module.exports = { authApiKey };
