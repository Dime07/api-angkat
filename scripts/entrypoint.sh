#!/bin/bash

# Jalankan migrasi Prisma
bunx prisma migrate dev

# Jalankan aplikasi utama
exec "$@"