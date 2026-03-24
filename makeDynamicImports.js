const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
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
        if (match[2].startsWith('next') || match[2] === 'react' || match[2] === 'lucide-react' || match[2].includes('ui/')) continue;
        
        importsToDynamic.push({
            fullMatch: match[0],
            componentName: match[1],
            importPath: match[2]
        });
    }

    if (importsToDynamic.length > 0) {
        let newContent = content;
        
        importsToDynamic.forEach(({ fullMatch, componentName, importPath }) => {
            const dynamicImportStatement = `const ${componentName} = dynamic(() => import('${importPath}'), { ssr: false });`;
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
