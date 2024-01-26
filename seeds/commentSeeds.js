const {Comment} = require("../models");

const commentData = [
    {
        text: "Uwu",
        createdOn: "July 2, 2023",
        user_id: 2,
        blogPost_id: 1
    },
    {
        text: "lol that's funny",
        createdOn: "July 4, 2023",
        user_id: 3,
        blogPost_id: 1
    },
    {
        text: "yay a free car!",
        createdOn: "December 3, 2023",
        user_id: 1,
        blogPost_id: 2
    },
    {
        text: "Guys it's a virus",
        createdOn: "December 4, 2023",
        user_id: 1,
        blogPost_id: 2
    },
    {
        text: "Don't listen to this guy",
        createdOn: "January 5, 2024",
        user_id: 3,
        blogPost_id: 3
    }
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;