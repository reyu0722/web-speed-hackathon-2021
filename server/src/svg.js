import fs from "fs/promises"
import path from "path"
import { PUBLIC_PATH } from './paths';
import { makeSoundWaveSVG } from './utils/sound_svg';

const jsonPath = path.resolve(__dirname, '../seeds/sounds.json')

async function main() {
	const json = await fs.readFile(jsonPath)

	JSON.parse(json).forEach(async ({ id }) => {
		const soundPath = path.resolve(PUBLIC_PATH, `./sounds/${id}.mp3`)
		const data = await fs.readFile(soundPath)

		const svg = await makeSoundWaveSVG(data);
		const svgPath = path.resolve(PUBLIC_PATH, `./sounds/${id}.svg`);
		await fs.writeFile(svgPath, svg);
	})
}

main()