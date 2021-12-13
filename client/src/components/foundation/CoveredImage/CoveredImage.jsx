import React from 'react';


/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  /*
  const { data, isLoading } = useFetch(src, fetchBinary);

  const imageSize = React.useMemo(() => {
    return data !== null ? sizeOf(Buffer.from(data)) : null;
  }, [data]);

  const blobUrl = React.useMemo(() => {
    return data !== null ? URL.createObjectURL(new Blob([data])) : null;
  }, [data]);

  const [containerSize, setContainerSize] = React.useState({ height: 0, width: 0 });
  /** @type {React.RefCallback<HTMLDivElement>} */
  /*
  const callbackRef = React.useCallback((el) => {
    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  if (isLoading || data === null || blobUrl === null) {
    return null;
  }

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize?.height / imageSize?.width;
  */

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        alt={alt}
        className="w-full h-full object-cover"
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
