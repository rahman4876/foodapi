const express = require('express');
const cors = require('cors');
const path = require('path');
const foodData = require('./data'); // Assuming your food data is in a separate data.js file

const app = express();
app.use(express.json());
app.use(cors());

// Serve static images from the "assets" folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API to fetch food details by partial name match (case-insensitive)
app.get('/api/food/:name', (req, res) => {
    const searchQuery = req.params.name.toLowerCase(); // Convert the search query to lowercase

    // Filter the foodData to include any item whose name contains the search query (case-insensitive)
    const filteredFood = foodData.filter(item =>
        item.name.toLowerCase().includes(searchQuery) // Partial match check
    );

    // If we found matching food items, return them
    if (filteredFood.length > 0) {
        res.json(filteredFood);
    } else {
        // If no matches found, send a "not found" message
        res.status(404).json({ message: 'Food not found' });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
