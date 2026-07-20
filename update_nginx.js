const fs = require('fs');
const cp = require('child_process');

const wavewordContent = fs.readFileSync('nginx_waveword.conf', 'utf8');
const waveworldContent = fs.readFileSync('nginx_waveworld.conf', 'utf8');

const wavewordB64 = Buffer.from(wavewordContent).toString('base64');
const waveworldB64 = Buffer.from(waveworldContent).toString('base64');

const sshCommand = `echo "${wavewordB64}" | base64 -d > ~/nginx_waveword.conf && echo "${waveworldB64}" | base64 -d > ~/nginx_waveworld.conf && echo "1414" | sudo -S mv ~/nginx_waveword.conf /etc/nginx/sites-available/waveword && echo "1414" | sudo -S mv ~/nginx_waveworld.conf /etc/nginx/sites-available/waveworld && echo "1414" | sudo -S nginx -t && echo "1414" | sudo -S systemctl reload nginx`;

cp.execSync(`node C:\\Users\\DEEP_DESKTOP\\.gemini\\antigravity-ide\\brain\\f73809d0-841e-4b95-83d8-4dfeb7571062\\scratch\\ssh_tool\\ssh_run.js "${sshCommand.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
