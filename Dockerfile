# For Local Development
FROM --platform=linux/arm64 node:20.11 AS dev

WORKDIR /client
ENV PATH ./node_modules/.bin/:$PATH

COPY package*.json ./
RUN echo removing node modules
RUN rm -rf node_modules
RUN echo installing dependencies
RUN npm ci --quiet

COPY . .

EXPOSE 3000
EXPOSE 24678

CMD ["npm", "run", "dev"]