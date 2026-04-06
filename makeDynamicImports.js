const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

// Configuration for imports that should NOT be made dynamic
const EXCLUDE_PATTERNS = [
    /^next\//,
    /^react$/,
    /^react-dom$/,
    /^zustand$/,
    /^axios$/,
    /^zod$/,
    /^date-fns$/,
    /^clsx$/,
    /\.module\.css$/,
    /ui\//,
    /components\/reui\//,
    /components\/providers\//,
];

// Imports that should use ssr: true (safer)
const SSR_SAFE_PATTERNS = [
    /forms\//,
    /Filters\//,
    /cards\//,
];

// Imports that should be dynamic (ssr: false)
const DYNAMIC_PATTERNS = [
    /graph\//,
    /patterns\//,
    /University\//,
];

function shouldExcludeDynamic(importPath) {
    return EXCLUDE_PATTERNS.some(pattern => pattern.test(importPath));
}

function getSSRConfig(importPath) {
    if (DYNAMIC_PATTERNS.some(pattern => pattern.test(importPath))) {
        return '{ ssr: false }';
    }
    if (SSR_SAFE_PATTERNS.some(pattern => pattern.test(importPath))) {
        return '{ ssr: true, loading: () => <div>Loading...</div> }';
    }
    return '{ ssr: true }';
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('page.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(appDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // find default imports of capitalized components
    const importRegex = /^import\s+([A-Z][a-zA-Z0-9_]*)\s+from\s+['"]([^'"]+)['"]/gm;
    const importsToDynamic = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
        if (shouldExcludeDynamic(match[2])) continue;

        // Only make heavy components dynamic
        if (match[2].includes('popupCards') || match[2].includes('graph') || match[2].includes('patterns')) {
            importsToDynamic.push({
                fullMatch: match[0],
                componentName: match[1],
                importPath: match[2]
            });
        }
    }

    if (importsToDynamic.length > 0) {
        let newContent = content;

        importsToDynamic.forEach(({ fullMatch, componentName, importPath }) => {
            const ssrConfig = getSSRConfig(importPath);
            const dynamicImportStatement = `const ${componentName} = dynamic(() => import('${importPath}'), ${ssrConfig});`;
            newContent = newContent.replace(fullMatch, dynamicImportStatement);
        });

        if (!newContent.includes('import dynamic from')) {
            newContent = `import dynamic from 'next/dynamic';\n` + newContent;
        }

        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
console.log('Done mapping dynamic imports!');
        }

fs.writeFileSync(file, newContent, 'utf8');
console.log(`Updated: ${file}`);
    }
});
console.log('Done mapping dynamic imports!');
