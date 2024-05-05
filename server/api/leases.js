export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const url = `http://${config.serverHost}/rest/ip/dhcp-server/lease`;
    const headers = {
        'Authorization': `Basic ${config.serverAuth}`,
        'Content-Type': 'application/json',
    };
    return await fetch(url, { headers }).then(response => response.json());
})