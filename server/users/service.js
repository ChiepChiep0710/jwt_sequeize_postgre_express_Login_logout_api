const { models } = require('../Database');
const postUser = async (body) => {
	try {
		const user = await models.users.create(body);

		return { user: user, status: 201 };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};
const userLogin = async (body) => {
	try {
		const { email, password } = body;
		const { user: user, error: error } = await models.users.findByCredentials(email, password);

		if (error) {
			throw new Error(error);
		}
		const token = await user.generateAuthToken();
		return { status: 201, user: user, token: token };
	} catch (error) {
		return { error: error.message, status: 400 };
	}
};

const userLogout = async (user) => {
	try {
		user.token = null;
		await user.save();
		return { message: ' logout success', status: 200 };
	} catch (error) {
		return { error: error.message, status: 500 };
	}
};
module.exports = {
	postUser,
	userLogin,
	userLogout,
};
