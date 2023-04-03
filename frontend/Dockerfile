# Dockerfile for React client

# Build react client
FROM node:17-alpine

# Working directory be app
WORKDIR /app

COPY package*.json ./

###  Installing dependencies

RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]