const secretConfig = require('../configurations/secret.config');

const authorize = () => {
  return (req, res, next) => {
    const userPass = req.body.pass.toString().toLowerCase();
    if (userPass === secretConfig.answer) return next();

    res.render('unauthorize');
  }
};

module.exports = { 
  authorize
};