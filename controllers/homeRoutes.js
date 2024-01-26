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
// router.get("/blogPost/:id", withAuth, (req, res) => {

//     BlogPost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//         {
//           model: Comment,
//           include: [User],
//         },
//       ],
//     });

//     const blogPost = blogPostData.get({ plain: true });
//     console.log(blogPost);

//     res.render("blogPost", {
//       ...blogPost,
//       logged_in: req.session.logged_in,
//     });
//   } .catch ((err) => {
//     res.status(500).json(err);
//     res.redirect("/login");
//   });

// class Category {
//   constructor(name) {
//     this.name = name;
//     this.id = Math.floor(Math.random()) +2
//   }
// }

// router.get("/pathIWant", (req,res) => {
//  const dbData = await Model.findAll or findByPk

//  const serializedData = if array => dbData.map(get{plain: true})
//                         if object -> dbData.get({plain: true})

// res.render("name of view in views folder ONLY", {
//     serializedData,
//     req.session.loggedIn
// })

// })

// router.get("/", (req, res) => {
//   const categories = [new Category("electorinics"), new Category("furniture")];
//   console.log("==================USER DATA AT HOMEROUTES =============");
//   console.log(categories);
//   res.render("homepage", {
//     categories,
//   });
// });

// router.get("/category/:id", (req, res) => {
//   // const dbData = Model.findByPk(req.params.id)
//   const category = new Category("soaps");
//   res.render("singlePost", {
//     category,
//   });
// });

module.exports = router;
