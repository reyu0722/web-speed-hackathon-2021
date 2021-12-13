mkdir movies

for file in `\find ./old-movies -maxdepth 1 -type f`; do
	name=`basename $file .gif`
	ffmpeg -f gif -i old-movies/${name}.gif -c vp9 -b:v 0 -crf 40 movies/${name}.webm
	echo ${name}
done