import { h } from 'preact';
import { useEffect } from 'preact/hooks';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {() => void} onRequestCloseModal
 */

/** @type {React.VFC<Props>} */
const Modal = ({ children, onRequestCloseModal }) => {
  // overflow: hidden を付与して、スクロールできないようにする
  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);



  // Escape キーを入力すると、モーダルを閉じる
  useEffect(() => {
    const handler = (ev) => {
      if (ev.key === 'Escape') {
        onRequestCloseModal();
      }
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [onRequestCloseModal]);

  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute bottom-0 left-0 right-0 top-0" onClick={onRequestCloseModal}></div>
      <div className="flex flex-col items-center justify-center px-2 w-full h-4/6">
        <div className="relative px-2 py-8 w-full max-w-md max-h-full bg-white rounded">
          <div className="relative w-full max-h-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
