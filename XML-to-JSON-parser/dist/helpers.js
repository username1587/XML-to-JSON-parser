import axios from "axios";
import fs from "fs";
export function findProperty(xml, propertyName) {
    for (const key in xml) {
        if (key === propertyName) {
            return xml[key];
        }
        else if (typeof xml[key] === 'object') {
            const value = findProperty(xml[key], propertyName);
            if (value !== null) {
                return value;
            }
        }
    }
    return null;
}
export async function downloadImage(imageUrl, filePath) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const extension = new URL(imageUrl).pathname.split(".").pop();
        fs.writeFileSync(`${filePath}.${extension}`, response.data);
        console.log(`Image saved at ${filePath}.`);
    }
    catch (error) {
        throw new Error(`Error downloading image: ${error.message}`);
    }
}
//# sourceMappingURL=helpers.js.map