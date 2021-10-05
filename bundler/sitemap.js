/*

    Generate a sitemap

*/


// Get the required modules
const scan = require("./scan"),
    fs = require("fs"),
    path = require("path"),
    scanDirectory = path.join(__dirname, "builds", "web"),
    sitemapDirectory = path.join(scanDirectory, "sitemap.xml");

/*

<?xml version="1.0" encoding="UTF-8"?>
<urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    <!-- An example for a URL dataset -->
    <url>
        <loc>https://domain.net/...</loc>
        <lastmod>YYYY-MM-DD</lastmod>
        <changefreq>always/hourly/daily/weekly/monthly/yearly/never</changefreq>
        <priority>0.0-1.0</priority>
    </url>
  
</urlset>
*/

// Create a `sitemap.xml` file!
fs.writeFile(
    sitemapDirectory,
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`,
    function(error) {

        if (error) {

            throw new Error("Couldn't create a sitemap file!");

        } else {

            // Scan all the '/web' build directory and organise all html files into a sitemap
            scan.scanDirectory(path.join(scanDirectory, "pages"), ["index.html"], function(fileDirectory) {

                // Define the needed variables
                var fileWebsitePath,
                    pathPriority,
                    lastModification;

                // Get the page path relative to the website's URL
                fileWebsitePath = fileDirectory.replace(scanDirectory, "").replace("/pages/", "page/").replace("index.html", "");

                // Set the page priority
                pathPriority = fileWebsitePath.match(/\//g).length;
                if (pathPriority <= 2) {

                    pathPriority = "1.0";

                } else if (pathPriority == 3) {

                    pathPriority = "0.9";

                } else {

                    pathPriority = 0.9 - (pathPriority - 3) / 10;
                    pathPriority = (pathPriority < 0) ? 0 : pathPriority;
                    pathPriority = Math.round(10 * pathPriority) / 10;
                    pathPriority = (pathPriority == 0) ? "0.0" : String(pathPriority);

                }

                // Get the last modification date
                lastModification = fs.statSync(fileDirectory);
                lastModification = lastModification.mtime.toISOString().split('T')[0];


                // Add this file into the URL set
                fs.appendFile(sitemapDirectory,
                    `<url> <loc>%{{global:appInfo.url.website}}%/${fileWebsitePath}</loc> <lastmod>${lastModification}</lastmod> <changefreq>always</changefreq> <priority>${pathPriority}</priority> </url>`,
                    function(error) {

                        if (error) {

                            throw new Error("Couldn't create a sitemap file!");

                        }

                    });

                // Delete the used variables
                delete fileWebsitePath;

            });

            fs.appendFile(sitemapDirectory, `</urlset>`, function(error) {

                if (error) {

                    throw new Error("Couldn't create a sitemap file!");

                }

            });

        }

    }
);