const fs = require('fs');
const cp = require('child_process');

const content = fs.readFileSync('setup_nginx.sh', 'utf8');
const base64Content = Buffer.from(content).toString('base64');

const sshCommand = `echo "${base64Content}" | base64 -d > ~/setup_nginx.sh && echo "1414" | sudo -S mv ~/setup_nginx.sh /var/www/waveworld/setup_nginx.sh && echo "1414" | sudo -S chmod +x /var/www/waveworld/setup_nginx.sh && cd /var/www/waveworld && echo "1414" | sudo -S ./setup_nginx.sh`;

cp.execSync(`node C:\\Users\\DEEP_DESKTOP\\.gemini\\antigravity-ide\\brain\\f73809d0-841e-4b95-83d8-4dfeb7571062\\scratch\\ssh_tool\\ssh_run.js "${sshCommand.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
