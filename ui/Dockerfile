FROM node:14.2.0-alpine as ui

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-datepicker --save
RUN npm install --save echarts-for-react
RUN npm install --save echarts
COPY . ./

CMD ["npm", "start"]
RUN npm run build

FROM nginx:stable-alpine
COPY --from=ui /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
