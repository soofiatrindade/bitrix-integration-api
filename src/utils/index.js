import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'config.json');

let config = {};

export function loadConfig () {
  if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  return config;
  } else {
    console.warn('[AVISO] Arquivo config.json não encontrado.');
  }
}

export function setConfig (id, hook) {
  if (fs.existsSync(configPath)) {
    config.user_id = id;
    config.web_hook = hook;

    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
    return loadConfig();
  } else {
    console.warn('[AVISO] Arquivo config.json não encontrado.');
  }
}
