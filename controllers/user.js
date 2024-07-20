const User = require("../Models/user");

module.exports.renderSignUp = (req, res) => {
    res.render("./users/signUp.ejs");
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registerdUser = await User.register(newUser, password);
        req.login(registerdUser, (err) => {
            if (err) {
                next(err);
            }
            else {

                req.flash("success", "Welcome to airbnb");
                res.redirect("/listings");
            }
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup")
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("./users/login");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Login Successfull");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout Successfull");
        res.redirect("/listings");
    });
}