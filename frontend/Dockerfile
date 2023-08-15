# Use an official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app/

# Copy everything
COPY . .

# Delete the existing node_modules directory
RUN rm -rf node_modules

# Synchronize package.json and package-lock.json
RUN npm install --package-lock-only

# Install the dependencies
RUN npm install

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
