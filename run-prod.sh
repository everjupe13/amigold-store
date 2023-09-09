#!/bin/sh

docker build -t amigold-animals .
docker run -d --rm -p 3000:3000 --name amigold-animals-container amigold-animals
