/**
 * In-memory mock database shape: each key is a collection (table) name;
 * each value is an array of row records loaded from the source JSON file.
 */
export type JsonData = Record<string, unknown[]>;
