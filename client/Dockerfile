FROM node:20-alpine as build

WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN ng build --configuration production

COPY /app/frontend/dist/frontend /app/public

FROM nginx:1-alpine

COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html

EXPOSE 80