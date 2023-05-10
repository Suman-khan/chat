# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .

# port that the app will run on
EXPOSE 3001

# Run 
CMD ["npm", "start"]
