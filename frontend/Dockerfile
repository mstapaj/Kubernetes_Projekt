FROM node:alpine as build-stage

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn run build

FROM nginx:alpine

COPY --from=build-stage /opt/app/build /usr/share/nginx/html
