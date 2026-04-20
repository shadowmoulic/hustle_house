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

    if (isSubdomain) {
        const subdomain = hostname.split('.')[0];

        // Ignore common subdomains
        if (subdomain === "www" || subdomain === "app") {
            return;
        }

        // Rewrite to the talent profile page
        // sayak.kgphustlehouse.com/ -> kgphustlehouse.com/talent/sayak
        // sayak.kgphustlehouse.com/portfolio -> kgphustlehouse.com/talent/sayak/portfolio
        return Response.rewrite(new URL(`/talent/${subdomain}${url.pathname}`, req.url));
    }
}
