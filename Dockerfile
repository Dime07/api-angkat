FROM oven/bun

WORKDIR /app

COPY . .

ARG DATABASE_URL
ARG JWT_SECRET

ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

RUN bun install

RUN bunx prisma generate

# Set permission untuk menjalankan skrip
RUN chmod +x ./scripts/entrypoint.sh

# Set entrypoint
ENTRYPOINT ["./scripts/entrypoint.sh"]

CMD ["bun", "dev"]

EXPOSE 3002