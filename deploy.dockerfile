# Use a multi-stage build to build the React app
# Stage 1: Build the React app
FROM node:20 AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Set up the Flask app
FROM python:3.9

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY backend/ ./

# Copy the built React app to the Flask static folder
COPY --from=build /app/build /app/static

EXPOSE 5000

CMD ["python", "app.py"]
