#!/bin/bash

mkdir ./images/avif
mkdir ./images/profiles/avif

for file in `\find ./old-images -maxdepth 1 -type f`; do
	npx @squoosh/cli --resize '{"enabled":true,"width":640}' --avif '{}' --output-dir ./newimages $file
done

for file in `\find ./old-images/profiles -maxdepth 1 -type f`; do
	npx @squoosh/cli --resize '{"enabled":true,"width":640}' --avif '{}' --output-dir ./newimages/profiles $file
done