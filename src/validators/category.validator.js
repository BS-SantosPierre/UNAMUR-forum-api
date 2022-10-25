const yup = require('yup');

const categoryValidator = yup.object().shape({
	name: yup.string().required().max(50).trim().strict()
});

module.exports = {
	categoryValidator
}
