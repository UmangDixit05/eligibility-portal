const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.userRole)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    }
}

export default authorizeRoles;