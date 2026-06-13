FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN mkdir -p /app/uploads && chmod 777 /app/uploads
EXPOSE 3001
CMD ["node", "server.js"]
