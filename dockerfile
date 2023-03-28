# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /swiftago

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV NODE_ENV development
ENV PORT 5000
ENV MONGO_URI mongodb+srv://saisumanthss:Saisumanthss.9@swiftagoprod.1vadfnw.mongodb.net/swiftagoprod?retryWrites=true&w=majority
ENV JWT_SECRET swiftagoswiftly

# Expose port 5000 for the Node.js application
EXPOSE 5000

# Start the Node.js application
CMD ["npm", "start"]
# hello everyone