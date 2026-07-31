/**
 * Extract a user-facing message from an Axios error / API Response body.
 * Prefer field-level validation messages in `data` when present.
 */
export function getApiErrorMessage(error, fallback = 'Something went wrong') {
    const body = error?.response?.data;

    if (!body) {
        return error?.message || fallback;
    }

    const fieldErrors = body.data;
    if (fieldErrors && typeof fieldErrors === 'object' && !Array.isArray(fieldErrors)) {
        const messages = Object.values(fieldErrors).filter(Boolean);
        if (messages.length > 0) {
            return messages.join('. ');
        }
    }

    if (typeof body.data === 'string' && body.data.trim()) {
        return body.data;
    }

    return body.message || error?.message || fallback;
}
