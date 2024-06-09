const getHome = (req, res) => {
    res.render('index', { title: 'Home' });
  };
  const getService = (req, res) => {
    res.render('servico', { title: 'Serviços' });
  };
  const getContacto = (req, res) => {
    res.render('contacto', { title: 'Contactos' });
  };
  const getProjeto = (req, res) => {
    res.render('projetos', { title: 'Projetos' });
  };
  const getSobre = (req, res) => {
    res.render('sobre', { title: 'Sobre Nós' });
  };
  const getConversa = (req, res) => {
    res.render('conversa', { title: 'Conversa' });
  };
  
  module.exports = {
    getHome, getService, getSobre, getContacto, getProjeto, getConversa,
  };
  