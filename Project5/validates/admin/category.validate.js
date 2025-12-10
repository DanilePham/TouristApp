const Joi = require('joi');

module.exports.createPost= async (req, res,next) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                'string.empty': 'Category name is required',
            }),
        position: Joi.string().allow(''),
        parent: Joi.string().allow(''),
        avatar: Joi.string().allow(''),
        status: Joi.string().allow(''),
        description: Joi.string().allow(''), 
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;

        res.json({
            code: "error",
            message: errorMessage
        });
        return;
    }

    next();
}