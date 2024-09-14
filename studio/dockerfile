# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
# This includes all files and directories needed to build and run the Next.js app
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 3001

# Step 8: Define the command to run the application
CMD ["npm", "run", "start"]
