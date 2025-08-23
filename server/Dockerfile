
FROM node:18
# Force devDependencies install
ENV NODE_ENV=development

WORKDIR /app

# Install build tools for Alpine
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Ensure TypeScript is installed even if devDependencies are skipped
RUN npm install typescript

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies for production
RUN npm prune --production

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
