import os from 'os';
import { execSync } from 'child_process';

// Improved memory formatter with better precision
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Enhanced disk space checker with cross-platform support
const getDiskSpace = () => {
    try {
        if (os.platform() === 'win32') {
            const stdout = execSync('wmic logicaldisk get size,freespace,caption').toString();
            const lines = stdout.split('\n').filter(line => line.trim());
            if (lines.length < 2) return null;
            
            const drive = lines[1].trim().split(/\s+/);
            if (drive.length < 3) return null;
            
            const total = parseInt(drive[1]) / (1024*1024*1024);
            const free = parseInt(drive[2]) / (1024*1024*1024);
            return {
                size: total.toFixed(2) + 'GB',
                used: (total - free).toFixed(2) + 'GB',
                available: free.toFixed(2) + 'GB',
                usePercent: ((total - free) / total * 100).toFixed(2) + '%'
            };
        } else {
            const stdout = execSync('df -h').toString();
            const lines = stdout.split('\n').find(line => line.includes('/dev/'));
            if (!lines) return null;
            
            const parts = lines.split(/\s+/);
            if (parts.length < 5) return null;
            
            return {
                size: parts[1],
                used: parts[2],
                available: parts[3],
                usePercent: parts[4]
            };
        }
    } catch (error) {
        console.error('Error getting disk space:', error);
        return null;
    }
};

// CPU information formatter
const getCPUInfo = () => {
    try {
        const cpus = os.cpus();
        if (!cpus || !cpus.length) return null;
        
        return {
            model: cpus[0].model.split('@')[0].trim(),
            cores: cpus.length,
            speed: (cpus[0].speed / 1000).toFixed(2) + 'GHz'
        };
    } catch (error) {
        console.error('Error getting CPU info:', error);
        return null;
    }
};

const handler = async (m, { conn }) => {
    try {
        // System metrics
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const uptime = clockString(process.uptime() * 1000);
        const cpuInfo = getCPUInfo() || {};
        const nodeUsage = process.memoryUsage();
        const diskSpace = getDiskSpace();
        const loadAvg = os.loadavg().map(v => v.toFixed(2)).join(', ');

        // Build system status message
        let message = `🖥️ *SYSTEM STATUS*\n\n` +
            `⚙️ *Host:* ${os.hostname()}\n` +
            `📟 *Platform:* ${os.platform()} (${os.arch()})\n`;
            
        if (cpuInfo.model) {
            message += `💻 *CPU:* ${cpuInfo.model} (${cpuInfo.cores} cores @ ${cpuInfo.speed})\n`;
        }
        
        message += `📊 *Load Average:* ${loadAvg}\n\n` +
            `🧠 *Memory Usage:*\n` +
            `▸ Total: ${formatBytes(totalMem)}\n` +
            `▸ Used: ${formatBytes(usedMem)} (${(usedMem/totalMem*100).toFixed(2)}%)\n` +
            `▸ Free: ${formatBytes(freeMem)}\n` +
            `⏱️ *Uptime:* ${uptime}\n\n` +
            `🔧 *Node.js Memory:*\n` +
            `▸ RSS: ${formatBytes(nodeUsage.rss)}\n` +
            `▸ Heap Total: ${formatBytes(nodeUsage.heapTotal)}\n` +
            `▸ Heap Used: ${formatBytes(nodeUsage.heapUsed)}\n` +
            `▸ External: ${formatBytes(nodeUsage.external)}\n` +
            `▸ Buffers: ${formatBytes(nodeUsage.arrayBuffers)}\n\n`;
            
        if (diskSpace) {
            message += `💾 *Disk Space:*\n` +
                `▸ Total: ${diskSpace.size}\n` +
                `▸ Used: ${diskSpace.used} (${diskSpace.usePercent})\n` +
                `▸ Available: ${diskSpace.available}\n`;
        } else {
            message += '⚠️ Could not retrieve disk information\n';
        }

        await conn.reply(m.chat, message.trim(), m);
        
    } catch (error) {
        console.error('System status error:', error);
        await conn.reply(m.chat, 
            '❌ Failed to retrieve system information. Please try again later.', 
            m
        );
    }
};

handler.help = ['system', 'status'];
handler.tags = ['info', 'tools'];
handler.command = ['system', 'sysinfo'];
handler.register = true;

export default handler;

// Improved uptime formatter
function clockString(ms) {
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor(ms / 3600000) % 24;
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    return `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
}