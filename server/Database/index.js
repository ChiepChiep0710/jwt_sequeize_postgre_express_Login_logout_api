const { Sequelize } = require('sequelize');
const envConfig = require('./config');
const env = process.env.NODE_ENV || 'development';
const config = envConfig[env];
const sequelize = new Sequelize(config.url, config);
const modelDefiners = [require('../users/users.model')];
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}
sequelize.sync({ force: false }).then(() => {
	console.log(`Database & tables created!`);
});

module.exports = sequelize;
