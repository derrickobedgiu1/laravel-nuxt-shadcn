/**
 * Inputs inside an Inertia <Form> are uncontrolled, so Nuxt UI resets their
 * DOM value on every re-render. This keeps the live value across a re-render.
 */
export function usePreserveInputValue(
    getInput: () => HTMLInputElement | null | undefined,
) {
    let saved: string | null = null;

    return {
        save: () => {
            saved = getInput()?.value ?? null;
        },
        restore: () => {
            const input = getInput();

            if (input && saved !== null && input.value !== saved) {
                input.value = saved;
            }

            saved = null;
        },
    };
}
