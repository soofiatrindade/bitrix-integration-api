import * as bitrixService from '../services/bitrix.js';
import * as config from '../utils/index.js';

export async function getDealById(req, res) {
  const { id } = req.params;
  try {
    const deal = await bitrixService.getDealById(id);
    return res.json(deal);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// update config.json
export async function setUser(req, res) {
  try {
    const { id, hook } = req.params;
    console.log("=== controller setUser ===")
    config.setConfig(id, hook);
    
    
    // fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
    return res.json({ success: true, updated: {} });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
