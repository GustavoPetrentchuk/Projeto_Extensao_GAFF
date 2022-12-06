//npm install express express-handlebars sequelize mysql2 express-session nodemon bcrypt body-parser bootstrap-icons
//Imports dos pacotes
const express =  require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");



//handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.json());
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")));



//middleware do controle de sessão
app.use(
    session({
      name: 'session',
      secret: '$#$FCVASE#$#%YGH@#',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )
  // flash messages
  app.use(flash());

app.get('/logout', function (req, res) {
    req.session.destroy()
    res.redirect('/login')
})
  

//rotas
const familiaRoutes = require('./routes/familiaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const verificaSessao = require("./helpers/sessao").verificaSessao;

app.use(bodyParser.urlencoded({extended: true}));
app.use('', familiaRoutes);
app.use('', usuarioRoutes);

app.listen(3000);