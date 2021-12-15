import React, { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { fetchJSON } from '../../utils/fetchers';

const AuthModalContainer  = React.lazy(() => import('../AuthModalContainer'));
const NewPostModalContainer = React.lazy(() => import('../NewPostModalContainer'));
const NotFoundContainer = React.lazy(() => import('../NotFoundContainer'));
const PostContainer = React.lazy(() => import('../PostContainer'));
const TermContainer = React.lazy(() => import('../TermContainer'));
const TimelineContainer = React.lazy(() => import('../TimelineContainer'));
const UserProfileContainer = React.lazy(() => import('../UserProfileContainer'));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
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
      <Suspense fallback={<Loading />}>
        <AppPage
          activeUser={activeUser}
          onRequestOpenAuthModal={handleRequestOpenAuthModal}
          onRequestOpenPostModal={handleRequestOpenPostModal}
        >
          <Routes>
            <Route element={<TimelineContainer />} path="/" />
            <Route element={<UserProfileContainer />} path="/users/:username" />
            <Route element={<PostContainer />} path="/posts/:postId" />
            <Route element={<TermContainer />} path="/terms" />
            <Route element={<NotFoundContainer />} path="*" />
          </Routes>
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
