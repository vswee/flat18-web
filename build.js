const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');

// Directories
const sourceDir = path.join(__dirname, 'source');
const distDir = path.join(__dirname, 'dist');
const baseUrl = process.env.BASE_URL || 'https://flat18.co.uk';

// Default language for the website
const defaultLang = 'en';  // English as the default and only language

// Function to create the dist directory if it doesn't exist
function createDistDirectory() {
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
        console.log('dist directory created successfully.');
    }
}

// Function to add lang attribute if not present
function addLangAttribute(content, lang) {
    if (!content.includes(' lang=')) {
        return content.replace('<html', `<html lang="${lang}"`);
    }
    return content;
}

// Function to optimise HTML content
function optimiseHtml(content) {
    return minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
    });
}

// Function to copy files from source to dist directory, renaming if necessary
function copySourceToDist(src, dest) {
    const files = fs.readdirSync(src);

    files.forEach(file => {
        let fullSrcPath = path.join(src, file);
        let fullDestPath = path.join(dest, file);

        // Check if the file name contains "webflow"
        if (file.includes('webflow')) {
            const newFileName = file.replace(/webflow/g, 'f18-built-component');
            fullDestPath = path.join(dest, newFileName);
            console.log(`Renaming file: ${file} to ${newFileName}`);
        }

        if (fs.statSync(fullSrcPath).isDirectory()) {
            // Create directory in the destination if it doesn't exist
            if (!fs.existsSync(fullDestPath)) {
                fs.mkdirSync(fullDestPath);
            }
            // Recursively copy the directory
            copySourceToDist(fullSrcPath, fullDestPath);
        } else {
            // Copy non-HTML files directly
            if (path.extname(fullSrcPath) !== '.html') {
                fs.copyFileSync(fullSrcPath, fullDestPath);
                console.log(`Copied file: ${fullSrcPath} to ${fullDestPath}`);
            } else {
                // Read the HTML file content
                let content = fs.readFileSync(fullSrcPath, 'utf-8');
                
                // Build canonical URL (without .html extension)
                let canonicalUrl = fullDestPath.replace(distDir, '').replace('.html', '');
                canonicalUrl = `${baseUrl}${canonicalUrl}`;

                // Add canonical and lang attributes
                content = addLangAttribute(content, defaultLang);
                content = content.replace(/webflow/g, 'f18-built-component');
                content = optimiseHtml(content);

                // Write the optimised HTML content to the destination
                fs.writeFileSync(fullDestPath, content);
                console.log(`Copied and optimised HTML file: ${fullSrcPath} to ${fullDestPath}`);
            }
        }
    });
}

// Function to generate sitemap.xml
function generateSitemap(directoryPath) {
    let urls = [];

    function findHtmlFiles(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                findHtmlFiles(fullPath);
            } else if (path.extname(file) === '.html') {
                // Skip .html extension in URLs for sitemap
                let relativePath = path.relative(directoryPath, fullPath).replace('.html', '');
                urls.push(`${baseUrl}/${relativePath.replace(/\\/g, '/')}`);
            }
        });
    }

    findHtmlFiles(directoryPath);

    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach(url => {
        sitemapContent += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
    });
    sitemapContent += `</urlset>`;

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
    console.log('sitemap.xml generated successfully in dist directory.');
}

// Function to generate robots.txt
function generateRobotsTxt() {
    const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`;
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
    console.log('robots.txt generated successfully in dist directory.');
}

// Main function to perform all tasks
function build() {
    try {
        createDistDirectory();
        copySourceToDist(sourceDir, distDir);
        generateSitemap(distDir);  // Ensure sitemap is generated for the dist directory
        generateRobotsTxt();
        console.log('Build completed successfully.');
    } catch (err) {
        console.error('Build failed:', err);
    }
}

build();