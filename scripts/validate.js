const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(process.cwd(), 'plugins.json');

try {
    console.log('🔍 正在读取并处理 plugins.json...');
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    if (!json.plugins || !Array.isArray(json.plugins)) {
        throw new Error('缺少顶层的 "plugins" 数组。');
    }

    const uniqueIds = new Set();
    const validStatuses = ['active', 'warning', 'banned'];
    const requiredFields = ['name', 'description', 'version', 'license', 'author', 'download_url', 'hash_sha256', 'status'];

    for (let i = 0; i < json.plugins.length; i++) {
        const plugin = json.plugins[i];
        const prefix = `[插件 #${i + 1}]`;

        for (const field of requiredFields) {
            if (plugin[field] === undefined || plugin[field] === null) {
                throw new Error(`${prefix} 缺少必填字段: "${field}"`);
            }
        }

        if (!plugin.id) {
            let repoSlug = 'unknown-repo';
            if (plugin.repo_url) {
                const parts = plugin.repo_url.replace(/\/$/, '').split('/');
                repoSlug = parts[parts.length - 1].toLowerCase();
            }
            const authorSlug = plugin.author.name.toLowerCase().replace(/\s+/g, '-');
            plugin.id = `${authorSlug}-${repoSlug}`.replace(/[^a-z0-9-]/g, '');
            console.log(`✨ 自动为 ${plugin.name} 生成了 ID: ${plugin.id}`);
        }

        if (uniqueIds.has(plugin.id)) {
            throw new Error(`${prefix} ID 重复: "${plugin.id}"，请修改作者名或仓库名。`);
        }
        uniqueIds.add(plugin.id);

        const hashRegex = /^[a-fA-F0-9]{64}$/;
        if (!hashRegex.test(plugin.hash_sha256)) {
            throw new Error(`${prefix} 哈希格式错误，必须为 64 位。`);
        }
    }

    json.plugins.sort((a, b) => a.id.localeCompare(b.id));
    json.last_updated = new Date().toISOString();

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    console.log(`校验通过！共 ${json.plugins.length} 个插件，已自动排版并更新索引。`);

} catch (error) {
    console.error('校验失败:', error.message);
    process.exit(1);
}
