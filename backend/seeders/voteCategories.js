const { VoteCategory } = require('../models');

const seedVoteCategories = async () => {
	const categories = ['President', 'Governor', 'Senator', 'MP', 'MCA'];
	for (const name of categories) {
		await VoteCategory.create({ name });
	}
	console.log('Vote categories seeded!');
};

seedVoteCategories()
	.then(() => process.exit())
	.catch((err) => console.error(err));

