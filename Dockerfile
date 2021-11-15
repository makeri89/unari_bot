FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY . .

RUN npm install &&\
    adduser -D appuser &&\
    chown appuser /usr/src/app

USER appuser

CMD ["npm", "start"]