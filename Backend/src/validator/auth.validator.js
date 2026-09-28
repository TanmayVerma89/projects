import { body, validationResult } from "express-validator";

const validateResult = (req, res, next) => {
    const erorrs = validationResult(req);

    if (erorrs.isEmpty()) return next();

    res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: erorrs.array().map(({ path, msg }) => ({
            field: path,
            message: msg,
        })),
    });
};

export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .isString()
        .withMessage("Password must be string")
        .bail()
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 to 128 characters long")
        .bail()
        .not()
        .matches(/\s/)
        .withMessage("Password cannot contain spaces"),

    validateResult,
];

export const registerValidator = [
    body("fullname")
        .trim()
        .notEmpty()
        .withMessage("fullname cannot be empty")
        .bail()
        .isString()
        .withMessage("fullName must be string")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("fullname must be between 3 and 30 characters long")
        .bail()
        .isAlpha()
        .withMessage("fullname may contain only alphabets"),

    body("password")
        .isString()
        .withMessage("Password must be string")
        .bail()
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 to 128 characters long")
        .bail()
        .not()
        .matches(/\s/)
        .withMessage("Password cannot contain spaces"),

   body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email format"),



    validateResult,
];
