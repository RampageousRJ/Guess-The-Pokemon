# Stage 1: Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]