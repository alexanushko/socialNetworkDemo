import React from 'react';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';


export let Users = ({totalUsersCount,pageSize,currentPage,onPageChanged,
  users,followingInProgress,followThunkCreator,unfollowThunkCreator}) => {

  return <div>
      <Paginator 
        totalItemsCount={totalUsersCount}
        pageSize={pageSize} 
        currentPage={currentPage} 
        onPageChanged={onPageChanged}
      />
      {
        users.map(user => <User key={user.id} user={user} followingInProgress={followingInProgress} 
          unfollowThunkCreator={unfollowThunkCreator} followThunkCreator={followThunkCreator}/>
        )
      }
  </div>
}