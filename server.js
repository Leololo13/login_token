const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { User } = require('./model/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Auth } = require('./middleware/auth');

require('dotenv').config();
//bodyparser 설정하기. client에서 오는 정보를 분석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//쿠키parser
app.use(cookieParser());
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('mongodb connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/signup.html');
});

////
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, data) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  //email과 db를 비교해서 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ LoginSuccess: false, message: 'Email not Found' });
    }

    //email이 있다면 비밀번호가 맞는지 확인하기
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ LoginSuccess: false, message: 'password wrong' });
      //비밀번호까지 맞다면 토큰을 만들어줌
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //token을 저장한다. 어디에??? 어디에나 할수잇다. 쿠키나.세션이나.로컬스토리지일수도잇고
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ LoginSuccess: true, userID: user._id });
      });
    });
  });
});

app.get('/api/users/auth', Auth, (req, res) => {
  //여기까지 middleware를 통과했따는 거는 일단 auth가 정상작동해서 통과햇다는 소리. 즉 사용자가 맞다
  res.status(200).json({
    //이걸 위해서 아까 auth.js에서 req.user에 정보를 넣음
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    id: req.user.id,
  });
});

app.listen(process.env.PORT, () => console.log('qq'));
