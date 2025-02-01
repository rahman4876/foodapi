import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [food, setFood] = useState([]);
  const [error, setError] = useState("");

  const fetchFood = async () => {
    setError("");
    setFood([]);
    if (search.length === 0) {
      setError("Please enter a food name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/food/${search}`);
      if (!response.ok) {
        throw new Error("Food not found");
      }
      const data = await response.json();
      setFood(data);
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10">
      <h1 className="text-3xl font-bold text-white mb-6">Search for Your Favorite Food!</h1>

      {/* Updated form position */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          className="p-3 border-2 border-white rounded-lg w-64 text-black"
          placeholder="Enter food name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchFood}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition duration-300"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {food.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {food.map((item, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.name}</h2>
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="w-72 h-72 object-cover mx-auto rounded-lg mb-4"
              />
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <p className="text-lg font-bold text-gray-800">
                Price: <span className="text-green-600">{item.price}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
