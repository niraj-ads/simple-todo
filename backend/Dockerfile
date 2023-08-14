# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first, for efficient caching
COPY package*.json ./

# Synchronize package.json and package-lock.json
RUN npm install --package-lock-only

# Delete the existing node_modules directory
RUN rm -rf node_modules

# Install the dependencies
RUN npm install

# Copy the source code
COPY ./src ./src

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
