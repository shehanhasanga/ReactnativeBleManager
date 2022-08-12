export class AuthenticationError extends Error {
    constructor(...params: any) {
        super(...params);
        this.name = 'AuthenticationError';
    }
}


export const isJsonParseError = (error: any) => {
    return (
        typeof error.message === 'string' &&
        error.message.startsWith('JSON Parse error:')
    );
};



export const getMessageAlongWithGenericErrors = (
    error: any,
    defaultMessage: string = 'Unexpected Error Occurred.',
) => {
    if (error instanceof Object && !Array.isArray(error)) {
        if (error.message === 'Network request failed') {
            return 'Connection Error! Operation Couldn’t Be Completed.';
        } else if (isJsonParseError(error)) {
            return 'Route Not Found. Please Contact Your System Administrator.';
        } else if (
            error instanceof AuthenticationError
        ) {
            return error.message;
        }
    }
    return defaultMessage;
};
