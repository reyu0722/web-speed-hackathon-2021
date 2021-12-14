import {AudioContext} from "web-audio-api"

async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  const leftData = buffer.getChannelData(0)
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1)

  // 100 個の chunk に分ける
  const chunks = []
  leftData.forEach((left, idx) => { 
    const normalized = (Math.abs(left) + Math.abs(rightData[idx])) / 2
    if (idx % Math.ceil(leftData.length / 100) === 0) {
      chunks.push(0);
    }
    chunks[chunks.length - 1] += normalized;
  })
  // chunk ごとに平均を取る
  const peaks = chunks.map((chunk, idx) => {
    if (idx !== chunks.length - 1) {
      return chunk / Math.ceil(leftData.length / 100)
    } else {
      return chunk / ((leftData.length - 1) % Math.ceil(leftData.length / 100) + 1)
    }
  })
  // chunk の平均の中から最大値を取る
	const max = Math.max(...peaks);


  return { max, peaks };
}

export const makeSoundWaveSVG = async (soundData) => {
	const { max, peaks } = await calculate(soundData);

  return `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1">${peaks.map((peak, idx) => {
        const ratio = peak / max;
        return `<rect fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}"></rect>`
}).join("")}</svg>`
}