
const sequelize = require("../config/connection");
const seedBlogs = require("./blogPostSeeds");
const seedComments = require("./commentSeeds");
const seedUsers = require("./userSeeds");

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedUsers();

    await seedBlogs();

    await seedComments();

    process.exit(0)
};

seedAll();