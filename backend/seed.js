const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const SubCategory = require('./models/SubCategory');

const data = {
  Science: ['Space', 'Biology', 'Chemistry', 'Physics'],
  History: ['Ancient Egypt', 'World War II', 'The Renaissance', 'The French Revolution'],
  Technology: ['Artificial Intelligence', 'Cybersecurity', 'Web Development'],
  Math: ['Algebra', 'Geometry', 'Statistics']
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Category.deleteMany({});
  await SubCategory.deleteMany({});
  console.log('Cleared existing data');

  for (const [categoryName, subs] of Object.entries(data)) {
    const category = await Category.create({ name: categoryName });
    for (const subName of subs) {
      await SubCategory.create({ name: subName, category_id: category._id });
    }
    console.log(`Added: ${categoryName} with ${subs.length} subcategories`);
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
