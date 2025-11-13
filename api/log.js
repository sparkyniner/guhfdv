import UAParser from 'ua-parser-js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // If we received userAgentData from client hints (platform/model/brands)
    if (data.platform || data.model || data.brands) {
      console.log('Client Hints Device Info:', data);
      return res.status(200).json({ status: 'received client hints device info' });
    }

    // Fallback: parse regular userAgent string with UAParser.js
    const userAgent = data.userAgent || req.headers['user-agent'] || '';

    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    const brand = device.vendor || 'Unknown';
    const model = device.model || 'Unknown';

    console.log('Parsed UserAgent Device Info:', {
      brand,
      model,
      os,
      browser,
      userAgent,
    });

    res.status(200).json({ brand, model, os, browser });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
