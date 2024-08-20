# Use Node.js base image
FROM node:20.6.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install && npm cache clean --force

# Copy the rest of the app's source code
COPY . .
COPY .env ./
# Script to generate .env file
#RUN echo "$STAGING_ENV" > .env
# Expose ports
EXPOSE 6001


# Set the command to run your Node.js app
CMD ["npm", "start"]
