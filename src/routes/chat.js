const express = require('express');
const router = express.Router();
const { Chat, Message } = require('../models');

// Função auxiliar para lidar com erros
const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: 'Erro no servidor' });
};

// Listar todos os chats
router.get('/chats', async (req, res) => {
  try {
    const chats = await Chat.findAll();
    const chatWithLastMessage = await Promise.all(chats.map(async chat => {
      const lastMessage = await Message.findOne({ where: { chatId: chat.id }, order: [['timestamp', 'DESC']] });
      return {
        ...chat.toJSON(),
        lastMessage: lastMessage ? lastMessage.content : 'Nenhuma mensagem ainda'
      };
    }));
    res.render('chats', { chats: chatWithLastMessage });
  } catch (err) {
    handleError(err, res);
  }
});

// Criar novo chat
router.post('/chats/create', async (req, res) => {
  try {
    // Validar os dados recebidos antes de criar o chat
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'O nome do chat é obrigatório' });
    }

    const newChat = await Chat.create({ name });
    req.flash('success_msg', 'Chat criado com sucesso');
    res.redirect('/chats');
  } catch (err) {
    handleError(err, res);
  }
});

// Ver mensagens de um chat específico
router.get('/chats/:slug', async (req, res) => {
  try {
    // Use a chave correta para pesquisar o chat
    const chat = await Chat.findOne({ where: { slug: req.params.slug } });
    if (!chat) return res.status(404).json({ error: 'Chat não encontrado' });

    const messages = await Message.findAll({ where: { chatId: chat.id }, order: [['timestamp', 'ASC']] });
    res.render('chat', { chat, messages });
  } catch (err) {
    handleError(err, res);
  }
});

// Enviar nova mensagem
router.post('/chats/:slug/messages', async (req, res) => {
  try {
    const chat = await Chat.findOne({ where: { slug: req.params.slug } });
    if (!chat) return res.status(404).json({ error: 'Chat não encontrado' });

    const sender = req.session.user ? req.session.user.email : 'Anônimo';
    const message = await Message.create({ chatId: chat.id, sender, content: req.body.content });

    // Retorna a mensagem recém-criada em caso de sucesso
    res.status(201).json(message);
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
