module.exports = {
    apps: [
        {
            name: 'ai-human',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            instances: 1,
            exec_mode: 'fork', // 单实例使用 fork 模式更稳定
            watch: false,
            env: {
                PORT: 8088,
                NODE_ENV: 'production',
                TZ: 'Asia/Shanghai',
                AUTH_URL: 'https://ai.laohuoji.link', // Auth.js 需要这个来生成正确的邮 件链接
            },
            env_production: {
                PORT: 8088,
                NODE_ENV: 'production',
                AUTH_URL: 'https://ai.laohuoji.link',
            },
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            error_file: 'logs/pm2/error.log',
            out_file: 'logs/pm2/out.log',
            merge_logs: true,
            max_memory_restart: '1G',
        },
    ],
}
