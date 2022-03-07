import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import TextField from "./textField";
import SelectField from "./common/form/selectField";
import RadioField from "./common/form/radioField";
import MultiSelectField from "./common/form/multiSelectField";
import { validatorConfig, validator } from "../utils/validator";

const UserEditForm = () => {
    const history = useHistory();
    const handleUsersRoute = () => {
        history.push("/users");
    };
    const params = useParams();
    const userId = params.userId;
    const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const optionsArray = (options) => {
        return !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id,
                color: options[optionName].color
            }))
            : options;
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        if (target && target?.name === "qualities") {
            const quals = target?.value.map((opt) => ({
                name: opt.label,
                _id: opt.value,
                color: opt.color
            }));
            setData((prevState) => ({ ...prevState, qualities: quals }));
        } else if (target && target?.name === "profession") {
            const key = Object.keys(professions).filter((k) => professions[k]._id === target.value);
            if (key) {
                setData((prevState) => ({ ...prevState, profession: { _id: target.value, name: professions[key].name } }));
            }
        } else if (target) {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        api.users.update(userId, data);
        handleUsersRoute();
    };

    return (
        data ? (
            <div className='d-flex col-md-6 offset-md-3 justify-content-center shadow p-4'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Редактирование</h3>
                        <TextField
                            label='Имя'
                            name='name'
                            type='text'
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label='Электронная почта'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <TextField
                            label='Пароль'
                            type='password'
                            name='password'
                            value={data.password ? data.password : ""}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <SelectField
                            label='Выбери свою профессию'
                            defaultOption='Choose...'
                            options={professions}
                            name='profession'
                            onChange={handleChange}
                            value={data.profession._id}
                            error={errors.profession}
                        />
                        <MultiSelectField
                            options={optionsArray(qualities)}
                            onChange={handleChange}
                            defaultValue={optionsArray({ ...data.qualities })}
                            name='qualities'
                            label='Выберите ваши качества'
                            error={errors.qualities}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name='sex'
                            onChange={handleChange}
                            label='Выберите ваш пол'
                        />
                        <button
                            className='btn btn-primary w-100 mx-auto'
                            onClick={handleSubmit}
                            disabled={!isValid}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        ) : (<div className='d-flex justify-content-center'>Загрузка данных о пользователе</div>)
    );
};

export default UserEditForm;