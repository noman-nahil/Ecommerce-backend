const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Access Denied");

    /*token = token.split(" ")[1].trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return res.status(400).send("invalid");
    req.user = decoded;
    next();*/
    try {
        const decoded = jwt.verify(token.split(" ")[1].trim(), process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(400).send("Invalid token");
    }
}