// runQuery.js

const apiUrl = "http://localhost:5000/api/query"; // Update to the actual Python API endpoint
/**
 * Sends a query to the external API and fetches the response.
 *
 * @param {string} query - The user's input or question.
 * @param {object} [config={}] - Optional configuration for model generation.
 * @returns {Promise<string>} - The response from the model.
 */
async function run(query) {
  try {
    // Start chat session with query and config
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data.response; // The actual text response from the model
  } catch (error) {
    console.error("Failed to get response:", error);
    return "An error occurred. Please try again.";
  }
}

// Example usage:
// runQuery("What are common symptoms of PCOS?")
//   .then(response => console.log("Model's Response:", response))
//   .catch(console.error);

export default run;
