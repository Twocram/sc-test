# base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ARG CACHEBUST=${BUILD_DATE}

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
COPY . .

# build app
RUN yarn build

# start app
CMD [ "yarn", "dev" ]
