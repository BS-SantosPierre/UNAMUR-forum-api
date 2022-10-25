const db = require('../models');

const categoryController = {
	getAll: async (req, res) => {
		const data = await db.Category.findAll({
			order: [['name', 'ASC']]
		});

		return res.status(200).json(data);
	},

	getById: async (req, res) => {
		const id = parseInt(req.params.id);

		const category = await db.Category.findOne({
			where: { id }
		});

		if (!category) {
			return res.status(404).json({ message: 'Category not found' });
		}

		return res.status(200).json(category);
	},

	add: async (req, res) => {
		try {
			const newCategory = await db.Category.create(req.validData);
			return res.status(201).json(newCategory);
		} catch (error) {
			console.log(error);
			return res.sendStatus(400);
		}
	},

	update: async (req, res) => {
		const id = parseInt(req.params.id);
		const data = req.validData;

		const resultUpdate = await db.Category.update(data, {
			where: { id },
			returning: true
		});

		if (resultUpdate[0] !== 1) {
			return res.status(404).json({ message: 'Category not found' });
		}

		return res.status(200).json(resultUpdate[1]);
	},

	delete: async (req, res) => {
		const id = parseInt(req.params.id);

		const nbRow = await db.Category.destroy({
			where: { id }
		});

		if (nbRow !== 1) {
			return res.status(404).json({ message: 'Category not found' });
		}

		return res.sendStatus(204); // Not content
	}
};

module.exports = categoryController;
