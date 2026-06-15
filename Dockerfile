# Build React app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Install metrics server dependencies
FROM node:20-alpine AS server-deps
WORKDIR /server
COPY server/package.json ./
RUN npm install --production

# Production image
FROM nginx:alpine
RUN apk add --no-cache nodejs

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=server-deps /server/node_modules /server/node_modules
COPY server/index.js /server/index.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80 3001

CMD ["/entrypoint.sh"]
