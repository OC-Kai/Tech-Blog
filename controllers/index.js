//import routes
const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const commentRoutes = require("./api/commentRoutes");
const userRoutes = require("./api/userRoutes");
const blogpostRoutes = require("./api/blogpostRoutes");


//assign routes
router.use("/", homeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/users", userRoutes);
router.use("/api/posts", blogpostRoutes);

module.exports = router;