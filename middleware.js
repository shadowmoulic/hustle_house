// Vercel Middleware for Subdomain Routing
// This script maps sayak.kgphustlehouse.com to kgphustlehouse.com/talent/sayak

export default function middleware(req) {
    const url = new URL(req.url);
    const hostname = req.headers.get("host");

    // Define the main domain
    const rootDomain = "kgphustlehouse.com";

    // Check if we are on a subdomain
    const isSubdomain = hostname.includes(`.${rootDomain}`) || (hostname.includes(`.localhost`) && hostname.split('.').length > 1);

    // 1. Handle Subdomain Routing (e.g., arnavshukla.kgphustlehouse.com)
    if (isSubdomain) {
        const subdomain = hostname.split('.')[0];
        
        // Block common system subdomains
        if (subdomain !== 'www' && subdomain !== 'app' && subdomain !== 'admin') {
            // Rewrite to the specific static talent folder
            return Response.rewrite(new URL(`/talent/${subdomain}/index.html`, req.url));
        }
    }

    // 2. Default behavior (path-based routing) is handled by vercel.json
}
