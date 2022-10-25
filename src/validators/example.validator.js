const yup = require('yup');

const exampleValidator = yup.object().shape({
	name: yup.string().required()
});
