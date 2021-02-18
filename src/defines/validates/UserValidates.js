import * as yup from 'yup';
import FormErrors from '../configs/FormErrors';
import Helper from '../Helper';
import UserApi from '../https/UserApi';

const isUsernameExist = async username => {
    if (username) {
        const data = await UserApi.findByUsername(username);
        return (data.status === 'succeeded');
    }
    return false;
}

// length
const isLengthValid = (value, length) => {
    if (value) {
        return (value.length >= length)
    }
    return false;
}

// contain special characters
const noSpecialCharacters = (value) => {
    if (value) {
        return (/^[a-zA-Z0-9]+$/.test(value));
    }
    return false;
}

const UserValidates = {
    username: function (username, setUsername, timeoutObj) {
        const label = 'Username';
        return yup
            .string()
            .required(Helper.format(FormErrors.required, label))
            .test('length', Helper.format(FormErrors.lengthGreater, label, 4), (value, context) => {
                return (isLengthValid(value, 4));
            })
            .test('specialCharacter', Helper.format(FormErrors.noSpecialCharacter, label), (value, context) => {
                return (noSpecialCharacters(value));
            })
            .test('usernameExist', Helper.format(FormErrors.unique, label), async (value, context) => {
                if (isLengthValid(value, 4) && noSpecialCharacters(value)) {
                    if (value !== username.value) {
                        clearTimeout(timeoutObj);
                        if (!value) return true;
                        return new Promise((resolve, reject) => {
                            timeoutObj = setTimeout(async () => {
                                const isExist = await isUsernameExist(value);
                                setUsername({ value, unique: !isExist });
                                resolve(!isExist);
                            }, 500);
                        });
                    }
                }
                return username.unique;
            });

    },
    password: function () {
        const label = 'Password';
        return yup
            .string()
            .required(Helper.format(FormErrors.required, label))
            .matches(/[a-zA-Z0-9]{3,}/, Helper.format(FormErrors.lengthGreater, label));
    },
    passwordConfirmation: function () {
        const label = 'Password confirmation';
        return yup
            .string()
            .required(Helper.format(FormErrors.required, label))
            .oneOf([yup.ref('password')], Helper.format(FormErrors.match, label));
    }
}

export default UserValidates;
