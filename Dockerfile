# Build
FROM --platform=linux/arm64 node:20.11 AS build

WORKDIR /client
# ENV PATH ./node_modules/.bin/:$PATH

COPY package*.json ./
RUN npm ci --quiet

COPY . .



# For Local Development
FROM build AS dev

EXPOSE 3000
EXPOSE 24678

CMD ["npm", "run", "dev"]

# For testing
FROM build as test
EXPOSE 3000
EXPOSE 24678

CMD ["npm", "run", "test:ci"]