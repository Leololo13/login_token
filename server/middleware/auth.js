const { User } = require('../model/user');

let auth = (req, res, next) => {
  ///인증처리 하는곳
  //client에서 쿠키를 져온다. 즉 토큰을 가져온다.
  let token = req.cookies.accessToken;

  //토큰을 decode한다음에 user를 찾아서 지금user랑 비교
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    ////req.token, user를 해주면 server에서 사용이가능하다
    req.token = token;
    req.user = user;
    next();
  });
  //user.js에서 methods를 만들어서 하기
  //유저가 잇으면 인증ok
  //유저가 없으면 망
};

module.exports = { auth };
