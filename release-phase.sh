#!/bin/bash
set -e

cd client

npm i

ng build --configuration=production