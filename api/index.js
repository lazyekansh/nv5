const axios = require('axios');

module.exports = async (req, res) => {
    const { type, term } = req.query;

    if (!type || !term) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.get(`http://api.subhxcosmo.in/api`, {
            params: {
                key: 'suryansh',
                type: type,
                term: term
            }
        });

        const rawData = response.data;
        
        const output = {
            developer: "lazyekansh",
            results: rawData.results?.result?.results || []
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(output);
    } catch (error) {
        res.status(500).json({ 
            error: "Proxy Error", 
            developer: "lazyekansh" 
        });
    }
};
