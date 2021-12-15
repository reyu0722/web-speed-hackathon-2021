import { h } from 'preact';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ({ timeline }) => {
  return (
    <section>
      {timeline.map((post, idx) => {
        return <TimelineItem key={post.id} post={post} lazy={idx > 2} />;
      })}
    </section>
  );
};

export { Timeline };
