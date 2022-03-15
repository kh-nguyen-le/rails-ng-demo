FROM node:16

WORKDIR /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json package.json

RUN npm i

RUN ngcc

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
