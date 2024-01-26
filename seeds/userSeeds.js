const {User} = require("../models");

const userData = [
    {
        username: "PrisonMike",
        password: "best_password"
    },
    {
        username: "MichaelScott",
        password: "best_password2"
    },    
    {
        username: "Larry",
        password: "best_password3"
    }
];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;