const router = require("express").Router();
const sequelize = require("../config/connection");
const { BlogPost, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbBlogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "text", "user_id", "blogPost_id", "createdOn"],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard")
});

router.get("/login", (req, res) => {
  res.render("login")
});

router.get("/signup", (req, res) => {
  res.render("signup")
});

module.exports = router;
