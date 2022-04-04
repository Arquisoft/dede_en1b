FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/arquisoft/dede_en1b
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DB_URI="Database"
ENV DB_URI=$DB_URI

ARG DB_USER="User"
ENV DB_USER=$DB_USER

ARG DB_PASSWORD="Password"
ENV DB_PASSWORD=$DB_PASSWORD

ARG DB_NAME="Name"
ENV DB_NAME=$DB_NAME

ARG TOKEN_SECRET="Database"
ENV TOKEN_SECRET=$TOKEN_SECRET


CMD [ "npm", "start" ]
