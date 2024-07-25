From node:20-alpine
WORKDIR /app
copy package*.json .

RUN npm install

COPY . .

RUN npm run build


EXPOSE 4000

CMD ["npm", "start"]
