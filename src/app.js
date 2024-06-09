require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db');

const app = express();

const homeRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

const sessionStore = new MySQLStore({
    /* Configure as opções do MySQLStore aqui */
}, db);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: true // Defina como true se estiver usando HTTPS na produção
    }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user;
    next();
});

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/', chatRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Rodando o Nexa Code`);
    console.log(`Abra no navegador: http://127.0.0.1:${PORT}`);
});
