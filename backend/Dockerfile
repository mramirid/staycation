FROM node:16-alpine

WORKDIR /app

COPY package.json .
RUN npm i --production

COPY bin/www.ts bin/
COPY controllers controllers/
COPY middlewares middlewares/
COPY models models/
COPY public/favicon.ico public/
COPY public/images/.gitignore public/images/
COPY routes routes/
COPY utils utils/
COPY views views/
COPY app.ts .
COPY tsconfig.json .

EXPOSE 3000
CMD [ "npm", "run", "start" ]
