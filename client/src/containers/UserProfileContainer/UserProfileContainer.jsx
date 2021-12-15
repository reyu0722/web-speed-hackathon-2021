import React from 'react';
import { useParams } from 'react-router-dom';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import NotFoundContainer from '../NotFoundContainer';

/** @type {React.VFC} */
const UserProfileContainer = () => {
  const { username } = useParams();

  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON);

  if (isLoadingUser) {
    document.title = "読込中 - CAwitter"
    return null
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  document.title = `${user.name} さんのタイムライン - CAwitter`
  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <UserProfilePage timeline={posts} user={user} />
    </InfiniteScroll>
  );
};

export default UserProfileContainer;
