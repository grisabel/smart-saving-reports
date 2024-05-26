## BUILDER ##
FROM node:18.19.1-alpine3.19 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

## APP ##
FROM nginx:1.25.4-alpine3.18
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
