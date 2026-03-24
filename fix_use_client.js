const fs = require('fs');
const files = [
    "pages/ConfirmPass/ConfirmPass.tsx",
    "pages/DormsForms/StudentHousing.tsx",
    "pages/home/Homepage.tsx",
    "pages/CompoundsOrDroms/CompOrDrom.tsx",
    "pages/DormsForms/Dorms.tsx",
    "pages/MapPage/MapDormPage.tsx",
    "pages/Administrators/Administrators.tsx"
];

for(const file of files) {
    const fullPath = 'f:\\ABDELRAHMAN\\Beitak\\Betaik-Front\\' + file.replace(/\//g, '\\');
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        fs.writeFileSync(fullPath, '"use client";\n' + content);
        console.log('Added use client to ' + file);
    }
}
console.log("Fix script completed.");
