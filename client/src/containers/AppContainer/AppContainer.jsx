import React from 'react';
import { Link, Route, Switch, useLocation } from "wouter"

import { AppPage } from '../../components/application/AppPage';
import { fetchJSON } from '../../utils/fetchers';

/*
const AuthModalContainer  = React.lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = React.lazy(() => import('../NewPostModalContainer'));
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));
const PostContainer = React.lazy(() => import('../PostContainer'));
const TermContainer = React.lazy(() => import('../TermContainer'));
const TimelineContainer = React.lazy(() => import('../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'));
*/

import AuthModalContainer from '../AuthModalContainer'
import NewPostModalContainer from '../NewPostModalContainer'
import NotFoundContainer from '../NotFoundContainer'
import PostContainer from '../PostContainer'
import TermContainer from '../TermContainer'
import TimelineContainer from '../TimelineContainer'
import UserProfileContainer from '../UserProfileContainer'

/** @type {React.VFC} */
const AppContainer = () => {
  const [ pathname ] = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);

  React.useEffect(() => {
    fetchJSON("api/v1/me").then(res => setActiveUser(res))
  }, []);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);


  return (
    <>

        <AppPage
          activeUser={activeUser}
          onRequestOpenAuthModal={handleRequestOpenAuthModal}
          onRequestOpenPostModal={handleRequestOpenPostModal}
        >
          <Switch>
            <Route component={TimelineContainer} path="/" />
            <Route component={UserProfileContainer} path="/users/:username" />
            <Route component={PostContainer} path="/posts/:postId" />
            <Route component={TermContainer} path="/terms" />
            <Route component={NotFoundContainer} path="/:all" />
          </Switch>
        </AppPage>

        {modalType === 'auth' ? (
          <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
        ) : null}
        {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </>
  );
};

const Loading = () => {
  document.title = "読込中 - CAwitter"
  return null
}

export { AppContainer };
