/////////////////
const { User } = require('../model/User');

let Auth = (req, res, next) => {
  //인증처리용
  // brin token from cookies
  let token = req.cookies.x_auth;
  //token decode => find user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    //이미 user.js에서 토큰으로 사용자정보를 비교해서 맞는지를 확인했음. 맞으면 user가 있다.
    //req.token이랑 req.user에 정보를 넣어주는 이유는 server.js에서 req받았을때사용하기 위함
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { Auth };
