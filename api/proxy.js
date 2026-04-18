export default async function handler(req, res) {
  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract query parameters passed to your Vercel proxy
  // Example: /api/proxy?key=suryansh&type=mobile&term=9876543210
  const { key, type, term } = req.query;

  if (!key || !type || !term) {
    return res.status(400).json({ error: "Missing required query parameters (key, type, term)" });
  }

  try {
    // Construct the target URL
    const targetUrl = `http://api.subhxcosmo.in/api?key=${key}&type=${type}&term=${term}`;

    // Fetch data from the external API
    const response = await fetch(targetUrl);
    const data = await response.json();

    // Navigate the JSON tree to extract ONLY the final "results" array.
    // This strips out "success", "owner", "status", "count", and "search_time".
    if (data.results && data.results.result && data.results.result.results) {
      const cleanData = data.results.result.results;
      
      // Return the cleaned array
      return res.status(200).json(cleanData);
    } else {
      // Fallback in case the target API structure changes or returns an error
      return res.status(200).json({ message: "No data found or unexpected response structure", raw: data });
    }

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ error: "Failed to fetch data from target API" });
  }
}
