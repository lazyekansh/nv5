export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { num } = req.query;

  if (!num) {
    return res.status(400).json({ error: "Missing required query parameter: num" });
  }

  try {
    const targetUrl = `http://api.subhxcosmo.in/api?key=suryansh&type=mobile&term=${num}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    if (data.results && data.results.result && data.results.result.results) {
      const cleanData = data.results.result.results;
      return res.status(200).json(cleanData);
    } else {
      return res.status(200).json({ message: "No data found", raw: data });
    }

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
