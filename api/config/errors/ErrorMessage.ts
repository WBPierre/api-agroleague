type ErrorMessage = {
    jwt?: {
        create?: string;
        expired?: string;
    };
    auth?: {
        invalidEmailOrPassword?: string;
        emailNotExist?: string;
        invalidResetCode?: string;
        invalidCurrentPassword?: string;
    };
    security?: {
        unauthorized?: string;
    };
    fields?: {
        isInt?: string;
        isBoolean?: string;
        isRequired?: string;
        betweenLength?: string;
        minLength?: string;
        maxLength?: string;
        isPhone?: string;
        isEmail?: string;
        invalidCharacters?: string;
    };
    users?: {
        unique?: string;
        email?: string;
        password?: string;
    };
    dev?: {
        typeError?: string;
        missingError?: string;
    };
}

export { ErrorMessage };