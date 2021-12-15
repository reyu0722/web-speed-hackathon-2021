import React from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];

  const observerRef = new React.useRef(null);

  React.useEffect(() => {
    if (!observerRef) return

    const handler = ([change]) => {
      if (change.isIntersecting) {
        if (latestItem !== undefined) {
          fetchMore();
        }
      }
    };

    const observer = new IntersectionObserver(handler)
    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [latestItem, fetchMore, observerRef]);

  return <>{children}<div ref={observerRef} className="w-full h-1"></div></>;
};

export { InfiniteScroll };
