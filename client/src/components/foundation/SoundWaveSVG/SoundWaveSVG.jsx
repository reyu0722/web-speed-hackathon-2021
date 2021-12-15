import { h } from 'preact';
import { getSoundSvgPath } from '../../../utils/get_path';

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundId }) => {

  return (
    <img className="w-full h-full" src={getSoundSvgPath(soundId)} />
  );
};

export { SoundWaveSVG };
