import React, { useState } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const validJson = JSON.parse(jsonInput);
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validJson),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Invalid JSON input");
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">
        Frontend Task for Bajaj Finserv!!
      </h1>
      <textarea
        className="border border-gray-300 p-4 w-1/2 mt-8"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter Your JSON"
      />
      <button
        className="bg-red-300 text-2xl text-white px-12 py-2 m-4 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div className="mt-4">
        <select
          multiple
          onChange={handleOptionChange}
          className="border text-xl p-2"
        >
          <option
            className="border text-xl p-2 m-2 hover:bg-red-100"
            value="numbers"
          >
            Numbers
          </option>
          <option
            className="border text-xl p-2  m-2 hover:bg-red-100"
            value="alphabets"
          >
            Alphabets
          </option>
          <option
            className="border text-xl p-2 m-2 hover:bg-red-100"
            value="highest_lowercase_alphabet"
          >
            Highest Lowercase Alphabet
          </option>
        </select>
      </div>
      {error && <p className="text-red-700">{error}</p>}
      {response && (
        <div className="mt-4">
          {selectedOptions.includes("numbers") && (
            <p>Numbers: {response.numbers.join(", ")}</p>
          )}
          {selectedOptions.includes("alphabets") && (
            <p>Alphabets: {response.alphabets.join(", ")}</p>
          )}
          {selectedOptions.includes("highest_lowercase_alphabet") && (
            <p>
              Highest Lowercase Alphabet:{" "}
              {response.highest_lowercase_alphabet.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
