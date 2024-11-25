// In pages/api/search.js:
import axios from 'axios';

export default async function handler(req, res) {
  // Debugging line: Log the API key to confirm it's loaded
  console.log('API Key:', process.env.NEXT_PUBLIC_RAPIDAPI_KEY);

  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    params: {
      query: req.query.keyword,
      diet: req.query.diet,
      excludeIngredients: req.query.exclude,
      number: '20',
      offset: '0',
    },
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY, // Correct way to access the key
    },
  };

  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'An error occurred while fetching recipes.' });
  }
}
