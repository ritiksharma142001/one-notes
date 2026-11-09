package com.example.greeting;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Settings bound from application.yml / env vars.
 * In Kubernetes: greeting comes from a ConfigMap, dbPassword from a Secret.
 *
 * @param greeting        text returned by /hello (app.greeting, env APP_GREETING)
 * @param dbPassword      fake credential (app.db-password, env APP_DB_PASSWORD); never printed
 * @param startupDelayMs  sleep during startup to imitate a slow JVM app (shows why startupProbe exists)
 */
@ConfigurationProperties(prefix = "app")
public record AppProperties(String greeting, String dbPassword, long startupDelayMs) {
}
