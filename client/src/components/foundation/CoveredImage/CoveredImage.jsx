import { h } from 'preact';
/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src, horizontal, lazy }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        width={horizontal ? "16" : "8"}
        height="9"
        alt={alt}
        className="w-full h-full object-cover"
        lodaing={lazy ? "lazy" : "eager"}
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
