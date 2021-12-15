import { h } from 'preact';

import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */

/** @type {React.VFC<Props>} */
const SoundArea = ({ sound, lazy }) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer sound={sound} lazy={lazy} />
    </div>
  );
};

export { SoundArea };
