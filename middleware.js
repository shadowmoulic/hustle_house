// Vercel Middleware for Subdomain Routing
// This script maps sayak.kgphustlehouse.com to kgphustlehouse.com/talent/sayak

export default function middleware(req) {
    const url = new URL(req.url);
    const hostname = req.headers.get("host");

    // Define the main domain
    const rootDomain = "kgphustlehouse.com";
    const devDomain = "localhost:3000"; // For local testing

    // Check if we are on a subdomain
    const isSubdomain = hostname.includes(`.${rootDomain}`) || (hostname.includes(`.localhost`) && hostname.split('.').length > 1);

    // 1. Handle Subdomain Routing (sayak.kgphustlehouse.com)
    if (isSubdomain) {
        const subdomain = hostname.split('.')[0];

        // Ignore common subdomains
        if (subdomain === "www" || subdomain === "app") {
            return;
        }

        // Bypass rewrites for files/assets
        if (url.pathname.includes('.')) {
            return;
        }

        // Rewrite to the dynamic talent profile page
        return Response.rewrite(new URL(`/talent/profile.html`, req.url));
    }

    // 2. Path-based Routing is now handled by vercel.json for better reliability
    // Only subdomain routing remains here
}
