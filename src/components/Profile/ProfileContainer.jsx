import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {
    setUserProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    saveProfilePhotoThunkCreator,
    saveProfileThunkCreator
} from '../../redux/profileReducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        // userId = !userId ? 2 : userId;
        this.props.setUserProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        const pr = this.props;
        return (
            <Profile {...pr} isOwner={!pr.match.params.userId} profile={pr.profile} status={pr.status}
                     updateStatus={pr.updateStatusThunkCreator} savePhoto={pr.saveProfilePhotoThunkCreator}
                     saveProfile={pr.saveProfileThunkCreator}/>
        );
    }
}

let mapStateToProps = state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {
        setUserProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        saveProfilePhotoThunkCreator,
        saveProfileThunkCreator
    }),
    withAuthRedirect,
    withRouter
)(ProfileContainer);


