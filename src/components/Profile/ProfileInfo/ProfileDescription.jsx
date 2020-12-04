import React from 'react';
import c from './ProfileDescription.module.css';

export const ProfileDescription = props => {

    const pr = props.profile;

    return (
        <div>
            {props.isOwner && <div><button onClick={props.activateEditMode}>edit</button></div>}
            <div>
                <b>Looking for a job:</b> {pr.lookingForAJob ? 'yes' : 'no'}
            </div>
            {pr.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {pr.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me:</b> {pr.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(pr.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={pr.contacts[key]}/>
            }) }
            </div>
        </div>
    );
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={c.contacts}><b>{contactTitle}:</b>{contactValue}</div>
}

