# Use Node 22.x as the base image
FROM node:22

WORKDIR /app

RUN mkdir -m 777 Music-Discovery-Web-page

COPY package*.json ./

RUN npm install

COPY . /app/Music-Discovery-Web-page

WORKDIR /app/Music-Discovery-Web-page

EXPOSE 8563

RUN npm run build

CMD ["npm", "run", "dev"]