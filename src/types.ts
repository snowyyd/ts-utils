/**
 * Object.values() at type level
 */
export type ValuesOf<T> = T[keyof T];

/**
 * Get all keys where the values are of type TCondition
 */
export type KeysOfType<TObj, TCondition> = ValuesOf<{
	[K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

/**
 * Declare the generic as nullable
 */
export type Nullable<T> = T | null;
