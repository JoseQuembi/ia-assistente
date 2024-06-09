const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../db');
const router = express.Router();
const isAuthenticated = require('../middleware/authMiddleware');

// Exemplo de rota protegida
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', { user: req.session.user });
});

router.get('/login', (req, res) => {
    res.render('login', {
        errors: [],
        email: ''
    });
});

router.post('/login', [
    body('email').isEmail().withMessage('Por favor, insira um email válido.'),
    body('password').not().isEmpty().withMessage('Por favor, insira a sua senha.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('login', {
            errors: errors.array(),
            email: req.body.email
        });
    }

    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).render('login', {
                errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                email
            });
        }

        if (results.length === 0) {
            return res.status(401).render('login', {
                errors: [{ msg: 'Email ou senha incorretos.' }],
                email
            });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Bcrypt error:', err);
                return res.status(500).render('login', {
                    errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                    email
                });
            }

            if (!isMatch) {
                return res.status(401).render('login', {
                    errors: [{ msg: 'Email ou senha incorretos.' }],
                    email
                });
            }

            req.session.user = user;
            req.flash('success_msg', 'Você está logado!');
            res.redirect('/');
        });
    });
});

router.get('/cadastro', (req, res) => {
    res.render('register', {
        errors: [],
        username: '',
        email: ''
    });
});

router.post('/register', [
    body('username').not().isEmpty().withMessage('Por favor, insira um nome de usuário.'),
    body('email').isEmail().withMessage('Por favor, insira um email válido.'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', {
            errors: errors.array(),
            username: req.body.username,
            email: req.body.email
        });
    }

    const { username, email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).render('register', {
                errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                username,
                email
            });
        }

        if (results.length > 0) {
            return res.status(401).render('register', {
                errors: [{ msg: 'O email já está registrado.' }],
                username,
                email
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Bcrypt salt error:', err);
                return res.status(500).render('register', {
                    errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                    username,
                    email
                });
            }

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.error('Bcrypt hash error:', err);
                    return res.status(500).render('register', {
                        errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                        username,
                        email
                    });
                }

                const newUser = { username, email, password: hash };

                db.query('INSERT INTO users SET ?', newUser, (err, result) => {
                    if (err) {
                        console.error('Database insert error:', err);
                        return res.status(500).render('register', {
                            errors: [{ msg: 'Erro no servidor. Tente novamente mais tarde.' }],
                            username,
                            email
                        });
                    }

                    req.flash('success_msg', 'Você está registrado e pode fazer login.');
                    res.redirect('/login');
                });
            });
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

module.exports = router;
