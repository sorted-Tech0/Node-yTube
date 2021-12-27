// writing protect route
//let flag = false;   // checking user loggedin or not
function protectRoute(req, res, next){
    if(req.cookies.isLoggedIn) {
        next();
    } else {
        return res.json({
            Message:"operation not allowed."
        })
    }
}

module.exports = protectRoute;