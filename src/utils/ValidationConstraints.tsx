/* eslint-disable*/

import { validate } from "validate.js";

export const validationString = (id: any, value: any) => {
    const constraints: any = {
        presence: {
            allowEmpty: false
        }
    }

    if (value !== "") {
        constraints.format = {
            pattern: ".+",
            flags: "i",
            message: "Value can't be blank."
        }
    }

    const validationResult = validate({[id]: value}, {[id]: constraints});
    return validationResult && validationResult[id];
}


export const validationEmail = (id: any, value: any) => {
    const constraints: any = {
        presence: {
            allowEmpty: false
        }
    }

    if (value !== "") {
        constraints.email = true
    }

    const validationResult = validate({[id]: value}, {[id]: constraints});
    return validationResult && validationResult[id];
}

export const validationPassword = (id: any, value: any) => {
    const constraints: any = {
        presence: {
            allowEmpty: false
        }
    }

    if (value !== "") {
        constraints.length = {
            minimum: 6,
            message: "must be at least 6 characters and contain alpha and numeric characters"
        };

        constraints.format = {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message: "must be at least 6 characters and contain alpha and numeric characters"
        };
    }

    const validationResult = validate({[id]: value}, {[id]: constraints});
    return validationResult && validationResult[id];
}