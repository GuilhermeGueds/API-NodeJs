FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

Expose 3333

CMD ["npm", "run", "dev"]