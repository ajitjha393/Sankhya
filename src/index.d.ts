export type sankhyaConfig<I, O> = {
  [K in keyof O]: (i: I, o: O) => O[K]
}

interface sankhyaTransformer<I, O> {
  (input: I): O
  lazy: (input: I) => O
}

declare function sankhya<I = Record<string, any>, O = Record<string, any>>(
  config: sankhyaConfig<I, O>,
): sankhyaTransformer<I, O>

export default sankhya
