/**
 * Object.values() at type level.
 */
export type ValuesOf<T> = T[keyof T];

/**
 * Get all keys where the values are of type TCondition.
 */
export type KeysOfType<TObj, TCondition> = ValuesOf<{
	[K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

/**
 * Declare the generic as nullable.
 */
export type Nullable<T> = T | null;

/**
 * Declare the generic as nullable or undefined.
 */
export type OptionalNullable<T> = T | null | undefined;

/**
 * Utility type that simplifies the displayed type in editor tooltips by
 * flattening intersections and improving readability.
 *
 * Also known as Id, Compute, or Unwrap in some libraries.
 * @see {@link https://www.totaltypescript.com/concepts/the-prettify-helper}
 *
 * @template T - The type to prettify.
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
