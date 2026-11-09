# ---- stage 1: build the jar ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -q dependency:go-offline           # cached layer: re-runs only when pom.xml changes
COPY src ./src
RUN mvn -q -DskipTests package

# ---- stage 2: split the jar into layers (dependencies change less often than our code) ----
FROM eclipse-temurin:17-jre AS layers
WORKDIR /layers
COPY --from=build /src/target/greeting-api-1.0.0.jar app.jar
RUN java -Djarmode=tools -jar app.jar extract --layers --launcher --destination extracted

# ---- stage 3: small runtime image, non-root ----
FROM eclipse-temurin:17-jre
WORKDIR /app
RUN useradd --uid 10001 --no-create-home appuser
COPY --from=layers /layers/extracted/dependencies/ ./
COPY --from=layers /layers/extracted/spring-boot-loader/ ./
COPY --from=layers /layers/extracted/snapshot-dependencies/ ./
COPY --from=layers /layers/extracted/application/ ./
USER 10001
EXPOSE 8080
# Size the heap from the container memory limit, not from the host's RAM.
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError"
# Exec form: java is PID 1 and receives SIGTERM directly (needed for graceful shutdown).
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
