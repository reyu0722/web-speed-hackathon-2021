import { h } from 'preact';
import { useRoute } from 'wouter-preact';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import NotFoundContainer from '../NotFoundContainer';

/** @type {React.VFC} */
const PostContainer = () => {
  const [match, params] = useRoute("/posts/:postId")
  const { postId } = params;

  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  if (isLoadingPost) {
    document.title = "読込中 - CAwitter"
    return null
  }

  if (post === null) {
    return <NotFoundContainer />;
  }

  document.title = `${post.user.name} さんのつぶやき - CAwitter`

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export default PostContainer;
