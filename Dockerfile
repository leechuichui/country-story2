# Build front-end files
FROM node:latest AS panda-build
WORKDIR /panda-code
COPY . /panda-code
ARG NPM_AUTH_TOKEN
ARG BUILD_PROFILE_NAME=dev
ARG GIT_COMMIT_HASH

RUN echo $BUILD_PROFILE_NAME && yarn && yarn build

# Nginx based web server
FROM nginx:alpine
COPY --from=panda-build /panda-code/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx_proxy.conf /etc/nginx/nginx_proxy.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
