# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json /app

# Update apt repo and install curl
RUN apt-get update && apt-get install -y curl

# Install any needed dependencies specified in package.json
RUN npm install

# Copy the rest of the application files to the container
COPY . /app

# Set the environment variable for the port
ENV PORT 3000

# Expose port 3000 for the container
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "run", "start"]

# Define a health check for the container
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1