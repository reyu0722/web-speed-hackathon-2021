mkdir sounds

for file in `\find ./old-sounds -maxdepth 1 -type f`; do
	name=`basename $file .mp3`
	ffmpeg -f mp3 -i old-sounds/${name}.mp3 -acodec libmp3lame -b:a 128k sounds/${name}.mp3
	echo ${name}
done