FROM node:16 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /api
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json ./
# Copy app files
COPY . .
# Expose port
EXPOSE 8080
# Start the app
CMD ["/bin/sh", "tools/entrypoint.sh"]