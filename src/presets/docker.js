'use strict';

module.exports = {
  name: 'Docker',
  description: 'Docker and Docker Compose best practices for containerized applications',
  rules: `## Dockerfile Best Practices

- Use specific base image tags, never \`latest\`: \`FROM node:20-alpine\`, not \`FROM node\`.
- Use Alpine-based images when possible for smaller image sizes.
- Use multi-stage builds to keep production images small.
- Order Dockerfile instructions from least to most frequently changed for better layer caching.
- Copy dependency files first, install deps, then copy source code:
  \`COPY package*.json ./\` → \`RUN npm ci\` → \`COPY . .\`
- Use \`COPY\` instead of \`ADD\` unless you need tar extraction or URL fetching.
- Use .dockerignore to exclude node_modules, .git, .env, build artifacts, test files.
- Run as non-root user: \`RUN adduser -D appuser\` then \`USER appuser\`.
- Use \`HEALTHCHECK\` instruction for container health monitoring.
- Set \`WORKDIR\` early in the Dockerfile.
- Use \`ENV\` for build-time defaults, but prefer runtime environment variables.
- Minimize the number of layers: combine related RUN commands with \`&&\`.

## Multi-Stage Builds

- Stage 1 (builder): install dependencies, compile, build.
- Stage 2 (production): copy only built artifacts from builder stage.
- Name stages for clarity: \`FROM node:20-alpine AS builder\`
- Use \`--from=builder\` to copy artifacts: \`COPY --from=builder /app/dist ./dist\`
- For Node.js: build in stage 1, \`npm ci --production\` in stage 2.
- For Go: build in stage 1, copy single binary to scratch or alpine in stage 2.

## Docker Compose

- Use docker-compose.yml for development, docker-compose.prod.yml for production overrides.
- Define services with explicit container names and restart policies.
- Use \`depends_on\` with health checks for service startup ordering.
- Use named volumes for persistent data (databases, uploads).
- Use bind mounts for development source code (hot reload).
- Define networks explicitly. Don't rely on the default network.
- Use environment variables and .env files for configuration.
- Use profiles for optional services: \`profiles: ["debug"]\`

## Security

- Scan images for vulnerabilities: \`docker scout cves\`, Trivy, or Snyk.
- Never store secrets in Docker images or Dockerfiles.
- Use Docker secrets or environment variables for sensitive data.
- Pin dependency versions in Dockerfiles for reproducibility.
- Use read-only root filesystem: \`--read-only\` flag or \`read_only: true\` in compose.
- Drop unnecessary Linux capabilities: \`--cap-drop ALL --cap-add NET_BIND_SERVICE\`.
- Use non-root users for running applications.
- Scan regularly: new vulnerabilities are discovered constantly.

## Networking

- Expose only necessary ports. Don't publish all ports in production.
- Use internal networks for service-to-service communication.
- Use service names as hostnames in Docker networks: \`http://api:3000\`, not localhost.
- Use Traefik, Nginx, or Caddy as reverse proxy in front of application containers.
- Map container ports to specific host interfaces in production: \`127.0.0.1:3000:3000\`.

## Volume Management

- Use named volumes for database data, never bind mounts in production.
- Back up volumes regularly. Docker volumes are the most common source of data loss.
- Use \`tmpfs\` mounts for temporary data that shouldn't persist.
- Clean up unused volumes: \`docker volume prune\`.

## Logging & Monitoring

- Use Docker's json-file log driver with max-size and max-file options.
- Or use a centralized logging driver: fluentd, gelf, syslog.
- Use health checks for all services.
- Monitor with tools: cAdvisor, Prometheus, Grafana.
- Set resource limits: \`mem_limit\`, \`cpus\` in compose or --memory/--cpus in docker run.

## CI/CD

- Build images in CI, push to a registry (Docker Hub, GitHub Container Registry, ECR).
- Tag images with commit SHA and semantic version, not just latest.
- Use BuildKit for faster builds: \`DOCKER_BUILDKIT=1\`.
- Cache layers in CI: use --cache-from with registry images.
- Run security scans in CI pipeline before pushing images.
- Use immutable tags for production deployments.

## Development Workflow

- Use docker-compose watch or bind mounts for live code reloading.
- Use \`docker compose exec\` to run commands in running containers.
- Use \`docker compose logs -f service\` for log streaming.
- Keep development and production Dockerfiles aligned to avoid "works in dev" issues.
- Use devcontainers for consistent development environments.
`,
};
