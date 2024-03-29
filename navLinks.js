const routes = [
    { href: "/tweets", title: "Home |" },
    { href: "/logout", title: " Logout"},
];

const authRoutes = [
    { href: "/tweets", title: "Home |" },
    { href: "/register", title: " Register |" },
    { href: "/login", title: " Login" },
];

let navLinks = function hello(req, res, next) {
    if(req.session.currentProfile) {
        res.locals.routes = routes;
    } else {
        res.locals.routes = authRoutes;
    }
    next();
};

module.exports = navLinks;