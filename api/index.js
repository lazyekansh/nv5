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

        const data = response.data;
        
        const cleanData = {
            developer: "lazyekansh",
            status: data.status,
            results: data.results || data
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cleanData);
    } catch (error) {
        res.status(500).json({ 
            error: "Proxy Error", 
            developer: "lazyekansh" 
        });
    }
};
