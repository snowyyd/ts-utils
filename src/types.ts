import type { Static, TSchema } from '@sinclair/typebox';
import type { TypeCheck } from '@sinclair/typebox/compiler';

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

/**
 * Helper type for extracting the `TSchema` type from a `TypeCheck<TSchema>` instance,
 * as used in the `@sinclair/typebox` ecosystem.
 *
 * This type is useful when working with compiled schemas (e.g. via `TypeCompiler.Compile`)
 * and you need to access the original schema type.
 *
 * @template T - A `TypeCheck<TSchema>`.
 * @returns The extracted schema type (`TSchema`) or `never` if `T` is not a `TypeCheck`.
 */
export type UnwrapTypeCheck<T> = T extends TypeCheck<infer U> ? U : never;

/**
 * Helper type that resolves to the static TypeScript type of the schema
 * inside a `TypeCheck<TSchema>` instance from `@sinclair/typebox`.
 *
 * @example
 * ```
 * const user = Type.Object({ name: Type.String(), age: Type.Number() });
 * const check = TypeCompiler.Compile(T);
 * type User = StaticTypeCheck<typeof check>; // { name: string, age: number; }
 * ```
 *
 * @template T - A `TypeCheck<TSchema>`.
 * @returns The static TypeScript type derived from the schema.
 */
export type StaticTypeCheck<T extends TypeCheck<TSchema>> = Static<UnwrapTypeCheck<T>>;
