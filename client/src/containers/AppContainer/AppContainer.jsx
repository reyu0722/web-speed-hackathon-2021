import { h, Fragment } from 'preact';
import { useState, useCallback, useEffect } from 'preact/hooks';
import { Link, Route, Switch, useLocation } from "wouter-preact"
import {Suspense, lazy} from "preact/compat"

import { AppPage } from '../../components/application/AppPage';
import { fetchJSON } from '../../utils/fetchers';

const AuthModalContainer  = lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = lazy(() => import('../NewPostModalContainer'));
const NotFoundContainer = lazy(() => import('../NotFoundContainer'));
const PostContainer = lazy(() => import('../PostContainer'));
const TermContainer = lazy(() => import('../TermContainer'));
const TimelineContainer = lazy(() => import('../TimelineContainer'));
const UserProfileContainer = lazy(() => import('../UserProfileContainer'));

/*
import AuthModalContainer from '../AuthModalContainer'
import NewPostModalContainer from '../NewPostModalContainer'
import NotFoundContainer from '../NotFoundContainer'
import PostContainer from '../PostContainer'
import TermContainer from '../TermContainer'
import TimelineContainer from '../TimelineContainer'
import UserProfileContainer from '../UserProfileContainer'
*/

/** @type {React.VFC} */
const AppContainer = () => {
  const [ pathname ] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    fetchJSON("api/v1/me").then(res => setActiveUser(res))
  }, []);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);


  return (
    <>
      <Suspense fallback={ <Loading /> }>
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
      </Suspense>
    </>
  );
};

const Loading = () => {
  document.title = "読込中 - CAwitter"
  return null
}

export { AppContainer };
