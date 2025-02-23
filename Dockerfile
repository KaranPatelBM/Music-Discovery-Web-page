# Use Node 22.x as the base image
FROM node:22

WORKDIR /app/Music-Discovery-Web-page

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "test"]