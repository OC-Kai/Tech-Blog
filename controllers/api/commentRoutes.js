const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");

//get all comments
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "text", "user_id", "post_id", "createdOn"],
    includes: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) .then((commentData) => {
    res.json(commentData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get one comment by id
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "text", "user_id", "blogPost_id", "createdOn"],
        include: [
        {
            model: User,
            as: "user",
            attributes: ["username"]
        },
        ]
    }) .then((commentData) => {
        res.json(commentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a new comment
router.post("/", (req, res) => {
    Comment.create({
        text: req.body.text,
        user_id: req.session.user_id,
        blogPost_id: req.body.blogPost_id,
        createdOn: req.body.createdOn
    }) .then((commentData) => {
        res.json(commentData);
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a comment
router.put("/:id", (req, res) => {
    Comment.update(
      {
        text: req.body.text,
        createdOn: req.body.createdOn,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.json({ message: "Comment updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//delete a comment

router.delete("/", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }) .then(() => {
        res.json({message: "comment deleted successfully"});
    }) .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;