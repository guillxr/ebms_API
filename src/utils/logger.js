const log = (message, level = 'info') => {
    const levels = ['verbose', 'info', 'warn', 'error'];

    const currentLevel = levels.indexOf(config.logging);
    const messageLevel = levels.indexOf(level);

    if (currentLevel === -1 || messageLevel === -1) {
        console.warn(`[WARN] Unknown logging level used: ${config.logging} or ${level}`);
        return;
    }

    if (messageLevel >= currentLevel) {
        console.log(`[${level.toUpperCase()}] ${message}`);
    }
};

module.exports = log;