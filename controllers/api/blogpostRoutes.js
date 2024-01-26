const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");

//get all blogposts
router.get("/", (req, res) => {
BlogPost.findAll({
    attributes: ["id", "content", "user_id", "post_id", "createdOn"],
    includes: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) .then((blogPostData) => {
    res.json(blogPostData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get one blogpost by id
router.get("/:id", (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "content", "user_id", "blogPost_id", "createdOn"],
        include: [
        {
            model: User,
            as: "user",
            attributes: ["username"]
        },
        ]
    }) .then((blogPostData) => {
        res.json(blogPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a new blogpost
router.post("/", (req, res) => {
    BlogPost.create({
        content: req.body.content,
        user_id: req.session.user_id,
        blogPost_id: req.body.blogPost_id,
        createdOn: req.body.createdOn
    }) .then((blogPostData) => {
        res.json(blogPostData);
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a blogpost
router.put("/:id", (req, res) => {
    BlogPost.update(
      {
        content: req.body.content,
        createdOn: req.body.createdOn,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.json({ message: "Blog updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//delete a blogpost

router.delete("/", (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    }) .then(() => {
        res.json({message: "Post deleted successfully"});
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;