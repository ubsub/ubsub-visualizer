#!/bin/bash
set -e

IMAGE=zix99/ubsub-visualizer


npm run clean
npm version patch
npm run build

VERSION=$(cat package.json | jq -r ".version")
docker build -t $IMAGE:$VERSION -t $IMAGE:latest .
docker push $IMAGE
