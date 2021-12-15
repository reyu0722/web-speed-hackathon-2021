import { h, Fragment } from 'preact';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  document.title = ページが見つかりません - CAwitter
  return (
    <>
      <NotFoundPage />
    </>
  );
};

export default NotFoundContainer;
