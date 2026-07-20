const fs = require('fs');
const cp = require('child_process');

const content = fs.readFileSync('deploy.sh', 'utf8');
const base64Content = Buffer.from(content).toString('base64');

const sshCommand = `echo "${base64Content}" | base64 -d > ~/deploy.sh && echo "1414" | sudo -S mv ~/deploy.sh /var/www/waveworld/deploy.sh && echo "1414" | sudo -S chmod +x /var/www/waveworld/deploy.sh`;

cp.execSync(`node C:\\Users\\DEEP_DESKTOP\\.gemini\\antigravity-ide\\brain\\f73809d0-841e-4b95-83d8-4dfeb7571062\\scratch\\ssh_tool\\ssh_run.js "${sshCommand.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
