export const validatorConfig = {
    name: {
        isRequired: {
            message: "Имя не должно быть пустым"
        }
    },
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения"
        },
        isEmail: {
            message: "Email введен некорректно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязателен для заполнения"
        },
        isCapitalSymbol: {
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        isContainDigit: {
            message: "Пароль должен содержать хотя бы одно число"
        },
        min: {
            message: "Пароль должен состоять минимум из 8 символов",
            value: 8
        }
    },
    profession: {
        isRequired: {
            message: "Обязательно выберите вашу профессию"
        }
    },
    licence: {
        isRequired: {
            message:
                "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
        }
    },
    qualities: {
        min: {
            message: "Нужно выбрать хотя бы одно качество",
            value: 1
        }
    }
};

export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired": {
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = typeof data === "string" && data.trim() === "";
            }
            break;
        }
        case "isEmail": {
            const emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "isContainDigit": {
            const digitRegExp = /\d+/g;
            statusValidate = !digitRegExp.test(data);
            break;
        }
        case "min": {
            console.log("validator min", data, data.length);
            statusValidate = (data.length < config.value);
            console.log("validator min status", statusValidate);
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
};
