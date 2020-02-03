require('dotenv').config({ path : './.env.dev' });
const router = require ('express').Router();
const actions = require('./controllers');
const passport = require('passport');
const cookieSession = require('cookie-session');
const getAll = require('./elasticControllers/search');
const cors = require('cors');
require('./controllers/passport');

router.use(
  cookieSession({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : ['supersecret'],
  }),
);

router.use(cors({origin : ['http://localhost:3000','http://localhost:3001','https://www.google.com'],credentials : true}));

router.use(passport.initialize());
router.use(passport.session());

function isUserAuthenticated (req,res,next) {
  console.log(req.session);

  if (req.user) {
    console.log(req.user);
    next();
  } else {
    res
      .status(401)
      .send('<html><body style="background:black;color:#20C20E;font-family:courier">🤖 Access denied</body></html>');
  }
}
router.get('/secret',isUserAuthenticated,(req,res) => {
  res.send('You have reached the secret route');
});

router.get(
  '/auth/google',
  passport.authenticate('google',{ scope : ['profile','email'] }),
);

const {CLIENT_URL} = process.env;

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req,res) => {
    console.log('user successfully connected');
    res.redirect(`${CLIENT_URL}/`);
  },
);
router.get('/auth/logout',(req,res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get('/me',isUserAuthenticated,(req,res) => {
  console.log(req.user);
  const { _id,picture,options } = req.user;
  res
    .status(200)
    .json({
      _id,
      picture,
      options,
    });
});

router.get('/nosearch',getAll);
router.get('/nosearch/:pageNum',getAll);
router.get('/search/:search',getAll);
router.get('/search/:search/:pageNum',getAll);
router.post('/',isUserAuthenticated,actions.insertUserVisit);

module.exports = router;