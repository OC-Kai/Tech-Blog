//listing all dependencies
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const path = require("path");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//initialize Express.js
const app = express();
const PORT = process.env.PORT || 3001;

//set up session
const sess = {
  secret: "my secret not yours",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

//set up helpers
const hbs = exphbs.create({ helpers });

//set up handlebars.js
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set up static files
app.use(express.static(path.join(__dirname, "public")));

//set up routes
app.use(routes);

//sync sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
