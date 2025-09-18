# Stage 1: Build
FROM oven/bun:1 as builder

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy source code
COPY . .

# Generate Prisma client (engine will be built inside container)
RUN bunx prisma generate

# Stage 2: Run
FROM oven/bun:1-slim

WORKDIR /app

# Install OpenSSL (needed by Prisma at runtime)
RUN apt-get update -y && apt-get install -y openssl libssl1.1 || apt-get install -y libssl3 && rm -rf /var/lib/apt/lists/*

# Copy deps & build output
COPY --from=builder /app ./

EXPOSE 3000

CMD ["bun", "run", "dev"]
