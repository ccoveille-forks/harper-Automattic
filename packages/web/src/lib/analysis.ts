import type { Lint, Span, Suggestion } from 'wasm';

export async function lintText(text: string): Promise<Lint[]> {
	console.time('lintText');

	const wasm = await import('wasm');

	let lints = wasm.lint(text);

	// We only want to show fixable errors.
	lints = lints.filter((lint) => lint.suggestion_count() > 0);

	console.timeEnd('lintText');

	return lints;
}

export async function applySuggestion(
	text: string,
	suggestion: Suggestion,
	span: Span
): Promise<string> {
	const wasm = await import('wasm');

	const applied = wasm.apply_suggestion(text, span, suggestion);
	return applied;
}
