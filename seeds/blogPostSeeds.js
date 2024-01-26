const {BlogPost} = require("../models");

const blogData = [
    {
        name: "Dedicated Wam? No, that's not a typo.",
        content: "Everyone should have at least 64 Gigabytes of dedicated Wam",
        createdOn: "July 1, 2023",
        user_id: 1
    },
    {
        name: "You wouldn't download a car. Now you can!",
        content: "Click the link to download your free car!",
        createdOn: "September 23, 2023",
        user_id: 3
    },
    {
        name: "New Year New PC",
        content: "Here's why you should upgrade your PC every year.",
        createdOn: "January 1, 2024",
        user_id: 2
    }
];

const blogSeeds = () => BlogPost.bulkCreate(blogData);

module.exports = blogSeeds;