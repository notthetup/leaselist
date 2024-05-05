export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const url = `http://${config.serverHost}/rest/system/identity`;
    const headers = {
        'Authorization': `Basic ${config.serverAuth}`,
        'Content-Type': 'application/json',
    };
    return await fetch(url, { headers }).then(response => response.json());
})