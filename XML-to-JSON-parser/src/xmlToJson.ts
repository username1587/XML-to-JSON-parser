import * as fs from 'fs';
import * as xml2js from 'xml2js';
import path from 'path';
import {
    IMAGE_KEY,
    JsonOutput,
    LISTING_TYPE_KEY,
    PRICE_RANGE_KEY,
    PriceRangeType,
    SPACE_M2_OPTION_KEY,
    SpaceM2OptionType,
    UNIQUE_ID_KEY
} from "./interfaces.js";
import {downloadImage, findProperty} from "./helpers.js";

async function xmlToJson(uniqueId: string) {
    const xmlPath = path.resolve(process.cwd(), `./input/${uniqueId}.xml`);
    const xml = fs.readFileSync(xmlPath, "utf-8");

    const parser = new xml2js.Parser();
    const xmlParsed = await parser.parseStringPromise(xml);

    const property = findProperty(xmlParsed, uniqueId)?.[0]

    if (!property) {
        throw new Error(`Property with ${UNIQUE_ID_KEY} "${uniqueId}" not found in the XML file.`);
    }

    const imageUrl = property[IMAGE_KEY][0];
    const imageLocalPath = `images/${uniqueId}`;
    await downloadImage(imageUrl, imageLocalPath)

    const jsonOutput: JsonOutput = {
        [UNIQUE_ID_KEY]: property[UNIQUE_ID_KEY],
        [SPACE_M2_OPTION_KEY]: property[SPACE_M2_OPTION_KEY][0] as SpaceM2OptionType,
        [PRICE_RANGE_KEY]: property[PRICE_RANGE_KEY][0] as PriceRangeType,
        [LISTING_TYPE_KEY]: property[LISTING_TYPE_KEY][0] === "For Sale" ? 1 : 2,
        [IMAGE_KEY]: imageLocalPath,
    };

    fs.writeFileSync(`output.json`, JSON.stringify(jsonOutput));
}

async function main() {
    const uniqueId = process?.argv?.[2];

    if (typeof uniqueId !== 'string') {
        throw new Error('Invalid argument.')
    }

    await xmlToJson(uniqueId);
    console.log(`Successfully converted XML to JSON for ${UNIQUE_ID_KEY} "${uniqueId}". Output written to "output.json".`);
}

main();
