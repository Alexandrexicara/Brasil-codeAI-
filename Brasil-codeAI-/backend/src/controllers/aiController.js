const pool = require('../database/db');

const aiController = {
  async chatCompletions(req, res) {
    const { prompt } = req.body;

    await pool.query(
      'INSERT INTO usage_logs (user_id, endpoint) VALUES ($1, $2)',
      [req.userId, '/v1/chat/completions']
    );

    const respostaIA = 'Resposta simulada';

    res.json({
      response: respostaIA
    });
  }
};

module.exports = aiController;
