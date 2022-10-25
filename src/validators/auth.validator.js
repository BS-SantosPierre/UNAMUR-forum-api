const yup = require('yup');

const pwdRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+/;
const pwdRegexMsg = 'Your password is too weak :o';

const registerValidator = yup.object().shape({
	pseudo: yup.string().trim().required().min(2).max(50),
	email: yup.string().trim().required().email().max(255),
	password: yup.string().required().min(8).max(64).matches(pwdRegex, pwdRegexMsg),
	isAdmin: yup.boolean().strict().default(false)
});

const loginValidator = yup.object().shape({
	identifier: yup.string().trim().required(),
	password: yup.string().required()
});

module.exports = {
	registerValidator,
	loginValidator
}
