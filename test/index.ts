import { LogLevel, ProxyType, SsrProxy, SsrProxyConfig } from '../src';

const config: SsrProxyConfig = {
    port: 8089,
    hostname: '0.0.0.0',
    targetRoute: '79element.pl',
    log: { level: LogLevel.Debug },
    proxyOrder: [ProxyType.SsrProxy],
    isBot: (method, url, headers) => true,
    ssr: {
        // shouldUse: params => true,
        shouldUse: params => (/\.html$/.test(params.targetUrl) || !/\./.test(params.targetUrl.replace('79element.pl', ''))),
        browserConfig: {
            // headless: false,
            // devtools: true,
            args: [
                '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
                '--disable-web-security',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials'
            ]
        },
        allowedResources:  ['document', 'script', 'xhr', 'fetch', 'stylesheet'],
        waitUntil: 'networkidle2'
    },
    cache: {
        shouldUse: _ => false,
    }
};

const ssrProxy = new SsrProxy(config);

ssrProxy.start();