import React, {useState} from 'react';
import c from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { ProfileDescription } from "./ProfileDescription";
import ProfileDescriptionReduxForm from "./ProfileDescriptionForm";


export const ProfileInfo = props => {

  let [editMode, setEditMode] = useState(false);

  if(!props.profile){
    return <Preloader />
  }

  const default_photo_url = 'https://images.shoutwiki.com/ytp/thumb/9/97/%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg/300px-%D0%A0%D0%B8%D0%BA%D0%B0%D1%80%D0%B4%D0%BE_%D0%9C%D0%B8%D0%BB%D0%BE%D1%81.jpg';
  const background_photo_url ='https://therightsofnature.org/wp-content/uploads/2018/01/turkey-3048299_1920-1366x550.jpg';
  let photo = props.profile.photos.large;
  photo = !photo ? default_photo_url : photo;

  const onProfilePhotoSelected = e => {
    if(e.target.files.length){
      props.savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
        () => { setEditMode(false) }
    )
  }

  return (
    <div>
      <div className={c.background_container}>
         <img className={c.backPic} src={background_photo_url} alt='background'/>
      </div>
      <div className={c.descriptionBlock}>
        <div className={c.userpic}>
          <img src={photo} alt='user' />
          {props.isOwner && <input onChange={onProfilePhotoSelected} className={c.choosePhotoButton} type='file'/>}
        </div>
        <div  className={c.textInfoBlock}>
          <div>
            <h2>{props.profile.fullName}</h2>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
          </div>
          <div className={c.line}></div> {/*почему не отображает тег hr загадка*/}
          {editMode ?
              <ProfileDescriptionReduxForm onSubmit={onSubmit} profile={props.profile} initialValues={props.profile} /> :
              <ProfileDescription profile={props.profile} isOwner={props.isOwner}
                                  activateEditMode={() => setEditMode(true)}/> }
        </div>
      </div>
    </div>
  );
}

