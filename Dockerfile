FROM node:18

WORKDIR /app

# kopiujemy only package.json do cache’owej instalacji
COPY package*.json ./
RUN npm install

# teraz kopiujemy resztę kodu
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
