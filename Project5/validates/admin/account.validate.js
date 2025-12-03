const Joi = require('joi');

module.exports.registerAccountPagePost= async (req, res,next) => {
    const schema = Joi.object({
        fullname: Joi.string()
            .min(5)
            .max(50)
            .required()
            .messages({
                'string.empty': 'Full name is required',
                'string.min': 'Full name must be at least 5 characters long',
                'string.max': 'Full name must be less than 50 characters long'
            }),
        email: Joi.string()
            .email()
            .required()
            .min(8)
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
                'string.min': 'Email must be at least 8 characters long'
            }),
        password: Joi.string()
            .min(6)
            .custom((value, helpers) => {
              if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
                return helpers.error('password.lowercase');
              }
                return value;
            })
            .required()
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters long',
                'password.lowercase': 'Password must contain at least one letter and one number'
            }),

    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;

        res.json({
            code: "ValidationError",
            message: errorMessage
        });
        return;
    }

    next();
}

module.exports.loginAccountPagePost= async (req, res,next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
            }),
        password: Joi.string()
            .required()
            .messages({
                'string.empty': 'Password is required',
            }),
        rememberPass: Joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;

        res.json({
            code: "ValidationError",
            message: errorMessage
        });
        return;
    }

    next();
}

module.exports.forgotPasswordPagePost= async (req, res,next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
            })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;

        res.json({
            code: "ValidationError",
            message: errorMessage
        });
        return;
    }

    next();
}

module.exports.otpPasswordPagePost= async (req, res,next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
            })
        ,otp: Joi.string()
            .required()
            .messages({
                'string.empty': 'OTP is required',
            })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;

        res.json({
            code: "ValidationError",
            message: errorMessage
        });
        return;
    }

    next();
}

