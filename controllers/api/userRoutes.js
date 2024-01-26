const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


//get all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: {exclude: ["password"]},
    }) .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get user by id
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: {exclude: ["password"]},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: BlogPost,
                attributes: ["id", "content", "createdOn", "blogPost_id", "user_id"]
            },
            {
                model: Comment,
                attributes: ["id", "text", "createdOn", "blogPost_id", "user_id"],
                include: {
                    model: BlogPost,
                    attributes: ["name"]
                }
            }
        ]
    }) .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create new user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }) .then((userData) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
        });
    });
});

//login user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
          username: req.body.username,
        },
      })
        .then((userData) => {
          if (!userData || userData.checkPassword(req.body.password)) {
            res.status(400).json({ message: "Invalid Username/Incorrect Password" });
            return;
          }
    
          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: "Login Successful!" });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
});

//logout user
router.post("/logout", withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.json({message: "Successfully logged out!"})
        req.session.destroy(() => {
          res.status(204).end();
        });
      };
});

//delete user
router.delete("/", withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }) .then((userData) => {
        res.json({message: "User deleted successfully"})
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})



module.exports = router;