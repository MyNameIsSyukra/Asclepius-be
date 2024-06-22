# Gunakan image Node.js versi 18.16.1 sebagai base image
FROM node:18.16.1

# Buat direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin kode sumber aplikasi ke dalam container
COPY . .

# Ekspos port yang akan digunakan oleh aplikasi
EXPOSE 8060

# Jalankan perintah untuk memulai aplikasi
CMD ["npm", "run", "start"]
