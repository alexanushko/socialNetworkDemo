import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator } from '../../redux/usersReducer';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsersData, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';




export class UsersAPIcomponent extends React.Component {

  componentDidMount(){
    const {currentPage, pageSize} = this.props;
    this.props.getUsersThunkCreator(currentPage, pageSize, false);
  }

  onPageChanged = pageNumber => {
    const {pageSize} = this.props;
    this.props.getUsersThunkCreator(pageNumber, pageSize, true);
  }

  render(){
    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             followingInProgress={this.props.followingInProgress}
             unfollowThunkCreator={this.props.unfollowThunkCreator}
             followThunkCreator={this.props.followThunkCreator}
      />
    </>
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsersData(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
};

const UsersContainer = compose(
  connect(mapStateToProps, {getUsersThunkCreator, unfollowThunkCreator, followThunkCreator})
)(UsersAPIcomponent);

export default UsersContainer;







// let mapDispatchToProps = (dispatch) => {
//   return { //вместо всей этой функции в конект пропихнули просто объект из action createrov 
    // follow: (userId) => {
    //   dispatch(followAC(userId))
    // },
    // unfollow: (userId) => {
    //   dispatch(unfollowAC(userId))
    // },
    // setUsers: (users) => {
    //   dispatch(setUsersAC(users))
    // },
    // setCurrentPage: (pageNumber) => {
    //   dispatch(setCurrentPageAC(pageNumber))
    // },
    // setTotalUsersCount: (totalUsersCount) => {
    //   dispatch(setTotalUsersCountAC(totalUsersCount))
    // },
    // toggleIsFetching: (isFetching) => {
    //   dispatch(toggleIsFetchingAC(isFetching))
//     }
//   }
// }