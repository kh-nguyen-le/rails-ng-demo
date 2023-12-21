FROM node:20-alpine as build

WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm i

COPY . /app/frontend/

RUN ng build --configuration production

FROM nginx:1-alpine

COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html

EXPOSE 80