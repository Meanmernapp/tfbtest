# Use Node.js base image

FROM node:20.12-alpine3.18
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force
RUN npm install -g vite
RUN NODE_ENV=development npm i
# Install Vite globally

# Add node_modules/.bin to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Expose ports
EXPOSE 5173

# Set the command to run your Node.js app
CMD ["npm", "run", "dev"]
