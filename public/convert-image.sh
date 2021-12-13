#!/bin/bash

mkdir ./images/avif
mkdir ./images/profiles/avif

for file in `\find ./images -maxdepth 1 -type f`; do
	name=`basename $file .jpg`
	convert -geometry 640x ./images/${name}.jpg ./images/avif/${name}.avif
done

for file in `\find ./images/profiles -maxdepth 1 -type f`; do
	name=`basename $file .jpg`
	convert -geometry 640x ./images/profiles/${name}.jpg ./images/profiles/avif/${name}.avif
done