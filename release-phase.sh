#!/bin/bash
set -e

(cd client && npm i)

(cd client && ng build --configuration=production)