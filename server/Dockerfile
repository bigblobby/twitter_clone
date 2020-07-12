FROM ubuntu:eoan

# basic build tools
RUN apt-get update && apt-get install -y build-essential autoconf automake libtool nasm unzip wget git pkg-config curl

# nodejs and Yarn
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y nodejs yarn

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install knex -g

RUN yarn install

COPY . .

EXPOSE 8080
CMD [ "yarn", "dev" ]
