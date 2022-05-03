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
        if (routes[1].title !== " Profile |") {
        routes.splice(1, 0, {href: `/profiles/${req.session.currentProfile.id}`, title: " Profile |"})
        }
        res.locals.routes = routes;
    } else {
        res.locals.routes = authRoutes;
    }
    next();
};

module.exports = navLinks;