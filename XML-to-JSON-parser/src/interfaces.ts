export const UNIQUE_ID_KEY = "uniqueID";
export const SPACE_M2_OPTION_KEY = "space_m2_option";
export const PRICE_RANGE_KEY = "price_range";
export const LISTING_TYPE_KEY = "listing_type";
export const IMAGE_KEY = "image";
export type SpaceM2OptionType = "between_0_50" | "above_250" | "between_150_250" | "between_100_150" | "between_50_100";
export type PriceRangeType =
    "bellow_100000"
    | "between_100000_200000"
    | "between_200000_300000"
    | "between_300000_500000"
    | "above_500000";
type XMLListingType = 'For Sale' | 'Rent';
type JsonListingType = 1 | 2;

interface CommonProperties {
    [UNIQUE_ID_KEY]: string;
    [SPACE_M2_OPTION_KEY]: SpaceM2OptionType;
    [PRICE_RANGE_KEY]: PriceRangeType,
    [IMAGE_KEY]: string;
}

export interface JsonOutput extends CommonProperties {
    [LISTING_TYPE_KEY]: JsonListingType;
}

export interface XmlProperty extends CommonProperties {
    [LISTING_TYPE_KEY]: XMLListingType,
}

export interface Property {
    [key: string]: Property | string | XmlProperty;
}
