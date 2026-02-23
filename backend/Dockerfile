FROM node:22-slim

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT

EXPOSE ${PORT}

CMD ["npm", "start"]
