FROM node:10.16-alpine
RUN npm install -g ubsub-oidc-proxy@0.1.8

WORKDIR /app
ADD dist/ dist/

CMD ubsub-oidc-proxy --backend.static=dist/