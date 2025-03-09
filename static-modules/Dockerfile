FROM ubuntu:latest
LABEL authors="user"

ENTRYPOINT ["top", "-b"]

# Node.js image kullan
FROM node:18

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Tüm kodları konteynere kopyala
COPY . .

# React uygulamasını başlat
CMD ["npm", "start"]

# Uygulamayı 3000 portunda çalıştır
EXPOSE 3000