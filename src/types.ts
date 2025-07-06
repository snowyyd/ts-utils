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
 * Creates a discriminated union type from a mapping of keys to object types.
 *
 * Given a string key (the discriminator) and a record of variants, this utility produces
 * a union where each object in the union includes a unique discriminator field set to its key.
 *
 * @see {@link https://github.com/sindresorhus/type-fest/blob/5067e25fd52be47a7acd73edb22d05ff2ebf6d45/source/tagged-union.d.ts#L46|type-fest package}
 * @see {@link https://www.youtube.com/shorts/_Wb8VF-M4go|YouTube Short by Matt Pocock}
 *
 * @template TagKey - The name of the property to use as the discriminator (e.g., "type", "kind").
 * @template T - A record where each key corresponds to a union variant and the value is the object shape for that variant.
 *
 * @example
 * ```
 * type T = TaggedUnion<'type', {
 *   error: { message: string };
 *   success: { data: Record<string, unknown> };
 *   loading: Record<string, never>;
 * }>;
 * ```
 */
export type TaggedUnion<
	TagKey extends string,
	T extends Record<string, Record<string, unknown>>,
> = {
	[K in keyof T]: Prettify<Record<TagKey, K> & T[K]>
}[keyof T];

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
