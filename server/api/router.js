export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const url = `http://${config.serverHost}/rest/system/identity`;
    const headers = {
        'Authorization': `Basic ${config.serverAuth}`,
        'Content-Type': 'application/json',
    };
    let r = "";
    try {
        r = await fetch(url, { headers }).then(response => response.json());
    } catch (ex){
        console.warn(`Failed to fetch identity from $url :: $ex`);
    }
    return r;
})