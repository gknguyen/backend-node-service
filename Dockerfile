########
# BUILD
########

FROM node:22-alpine AS build

WORKDIR /home/src/app

COPY . .

RUN npm ci --ignore-scripts
RUN npm run build
RUN npm prune --production

#############
# RUN
#############

FROM node:22-alpine AS production

WORKDIR /home/src/app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git

COPY --from=build /home/src/app/node_modules ./node_modules
COPY --from=build /home/src/app/package.json ./package.json
COPY --from=build /home/src/app/dist ./dist
COPY --from=build /home/src/app/config ./config

CMD [ "node", "dist/main" ]
