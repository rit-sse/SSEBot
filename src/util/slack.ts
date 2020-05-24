/**
 * Format given messages as a bulleted list
 */
export function asList(messages) {
    let result = '';
    for (const message of messages) {
        result += `• ${message}\n`
    }
    return result;
}
