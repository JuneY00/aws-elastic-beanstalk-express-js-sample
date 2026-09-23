# Use Node.js 16 as a base image 
FROM node:16-alpine

# working directory inside the image 
WORKDIR /app

#  copy dependency files package.json, package-lock.json
COPY package*.json ./

# Install only production dependencies 
RUN npm ci --omit=dev

# Copy actual app code into /app folder 
COPY app.js ./

# Use 8080 port 
EXPOSE 8080

# run application as node user instead root 
USER node

# when container starts, start app 
CMD ["node", "app.js"]