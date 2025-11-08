import User from '../models/user.js';
import Admin from '../models/admin.js';

const login = (req, res, next) => {
    let msg = req.session.err || "";
    req.session.err = "";
    let userName = req.session.user ? req.session.user.username : "";
    res.render('login', { user: userName, message: msg });
};

const logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login');
};


const auth = (req, res, next) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    };
    req.session.err = "";
    Admin.findOne({ where: { email: data.email } }).then(results => {
        if (!results) {
            User.findOne({ where: { email: data.email } }).then(results => {
                if (!results) {
                    req.session.err = 'Incorrect email or password.';
                    res.redirect('/login')
                }
                else if (data.password != results.password) {
                    req.session.err = 'Incorrect password.';
                    res.redirect('/login')
                }
                else {
                    req.session.user = results;
                    res.redirect('/index')
                }
            }).catch(err => {
                req.session.err = err;
                res.redirect('/login')
            });
        }
        else {
            if (data.password != results.password) {
                req.session.err = 'Incorrect password.';
                res.redirect('/login')
            }
            else {
                req.session.admin = results;
                res.redirect('/index')
            }
        }
    })
}


const register = async (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: data.password, // Note: This is not secure; use bcrypt if possible
        });

        // You can adjust the redirection or response as needed
        res.redirect('/login');
    } catch (err) {
        req.session.err = err.message || err;
        res.redirect('/register'); // Redirect to registration page on error
    }
};

export default { login, logout, auth, register };
