import axios from 'axios';
import * as utils from '../utils/index.js';

const config = utils.loadConfig();
const bitrix = axios.create({
  baseURL: `${config.bitrix_hook_url}/${config.user_id}/${config.web_hook}/`,
});

export async function getDealById(id) {
  try {
    console.log('=> Buscando na API Bitrix: ' + 'crm.deal.get', { params: { id } })
    const res = await bitrix.get('crm.deal.get', { params: { id } });
    return res.data.result;
  } catch (error) {
    const log = error.response?.data || error.message
    throw new Error('Erro ao buscar deal do Bitrix: ' + log?.error_description || '' );
  }
}