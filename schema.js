// hamne required and bootstrap use krke  client validation (web ke form se aane vala data ) complete ker liya 
//server sider validation
// lekin ydi hm hoppsctioch se kai value enter kie bina hi req bhje to  req. accept ho rhii hai ise rokene ke liye ye file bnai h (for schema validation)
// and joi package install kia.(iska use npm site per joi package per dekhe )


// for model one
const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description :joi.string().required(),
        location : joi.string().required(),
        country: joi.string().required(),
        price : joi.number().required().min(0),
        image: joi.string().allow(" ",null),
    }).required()
})


// for reviews
module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating : joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()
})