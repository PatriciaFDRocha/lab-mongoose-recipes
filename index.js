const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    newRecipe();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


async function newRecipe() {
  try {
    let recipe = await Recipe.create({ title: 'Muffin Man', cuisine: 'Baking', created: Date.now() });
    console.log(`Recipe ${recipe.title}`);

    recipe = await Recipe.insertMany(data);
    for(let i=0; i<recipe.length; i++) {
      console.log(`Recipe: ${recipe[i].title}`);
    };

    recipe = await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100});
    console.log('Updated - Success!!');

    recipe = await Recipe.deleteOne({title: "Carrot Cake"});
    console.log('Recipe Deleted - Success!!');

  } catch(error) {
    console.log(error);

  } finally {
    mongoose.connection.close();
  }
};

