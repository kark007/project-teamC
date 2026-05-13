FROM node:20-slim

WORKDIR /app

# cache node modules by copying package.json and package-lock.json first
COPY package*.json ./
RUN npm install

# copy the rest of the files
COPY . .

# start the Vite development server on port 3000
# --host 0.0.0.0 is required to allow external access to the Docker container
CMD ["sh", "-c", "npm install && npm run dev -- --host 0.0.0.0 --port 3000"]