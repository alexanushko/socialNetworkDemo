import React from 'react';
import c from './ProfileDescription.module.css';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/formsControls/FormsControls";
import style from "../../common/formsControls/FormsControls.module.css";

const ProfileDescriptionForm = ({handleSubmit, profile, error}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div><button>save</button></div>
            {error && <div className={style.formSymmaryError}>
                {error}
            </div>}
            <div>
                <b>Looking for a job:</b>
                {createField(null, 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {createField('About Me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={c.contacts}>
                    <b>{key}:</b>
                    {createField(key, 'contacts.' + key, [], Input)}
                </div>
            }) }
            </div>
        </form>
    );
}

const ProfileDescriptionReduxForm = reduxForm({form: 'edit-profile'})(ProfileDescriptionForm);

export default ProfileDescriptionReduxForm;



