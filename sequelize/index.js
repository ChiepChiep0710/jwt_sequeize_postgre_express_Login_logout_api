const {Sequelize} =require('sequelize')
const sequelize = new Sequelize(process.env.POSTGRES_URL)
const modelDefiners=[
  require('./models/users.model')
]
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

module.exports= sequelize;