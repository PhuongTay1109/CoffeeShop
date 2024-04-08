/*eslint-disable */

import { validationEmail, validationPassword } from "./ValidationConstraints"

export const validateInput = (inputId: any, inputValue: any) => {
    if (inputId === "email") {
        return validationEmail(inputId, inputValue);
    }
    else if (inputId === "password") {
        return validationPassword(inputId, inputValue);
    }
}