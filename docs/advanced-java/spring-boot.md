---
title: Spring & Spring Boot
sidebar_position: 3
description: IoC and dependency injection, beans and scopes, Spring Boot auto-configuration, building a REST API, validation, exception handling, profiles and testing.
---

## Why Spring?

- **IoC (Inversion of Control):** you don't `new` your dependencies — the Spring **container** creates objects (**beans**) and wires them together.
- **DI (Dependency Injection):** the way IoC hands dependencies to a class (constructor, setter or field).
- **Spring Boot** = Spring + sensible defaults: auto-configuration, an embedded Tomcat, starter dependencies and production features (Actuator). `java -jar app.jar` and you're running.

## Beans and injection

```java
@Service
public class OrderService {
    private final OrderRepository repo;
    private final PaymentClient payments;

    // Constructor injection — preferred: fields can be final, easy to test, no @Autowired needed
    public OrderService(OrderRepository repo, PaymentClient payments) {
        this.repo = repo;
        this.payments = payments;
    }
}
```

| Stereotype | Layer |
|---|---|
| `@Component` | generic bean |
| `@Service` | business logic |
| `@Repository` | data access (also translates DB exceptions) |
| `@Controller` / `@RestController` | web layer |
| `@Configuration` + `@Bean` | beans you build yourself (third-party classes) |

**Two beans of the same type?** Mark one `@Primary`, or pick with `@Qualifier("name")`.

### Bean scopes

| Scope | One instance per |
|---|---|
| `singleton` (default) | container |
| `prototype` | every injection / `getBean()` |
| `request` / `session` | HTTP request / session |

### Bean lifecycle

Instantiate → inject dependencies → `@PostConstruct` → **in use** → `@PreDestroy` → destroyed.

## How auto-configuration works

`@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`.

Auto-configuration classes are guarded by conditions — e.g. *"if `DataSource` is on the classpath and no `DataSource` bean exists, create a HikariCP pool from `spring.datasource.*`"*. Your own beans always win. Run with `--debug` to see the condition report.

## A REST API

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    @GetMapping
    public List<ProductDto> list(@RequestParam(defaultValue = "0") int page) {
        return service.list(page);
    }

    @GetMapping("/{id}")
    public ProductDto one(@PathVariable Long id) {
        return service.get(id);           // throws NotFoundException if missing
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto create(@Valid @RequestBody CreateProduct body) {
        return service.create(body);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}

public record CreateProduct(
    @NotBlank String name,
    @Positive BigDecimal price) {}
```

### Global error handling

```java
@RestControllerAdvice
public class ApiErrors {
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ProblemDetail notFound(NotFoundException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail invalid(MethodArgumentNotValidException e) {
        var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setProperty("errors", e.getFieldErrors().stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (a, b) -> a)));
        return pd;
    }
}
```

## Layered structure

```
src/main/java/com/shop
├── ShopApplication.java
├── product
│   ├── ProductController.java   ← HTTP, DTOs, validation
│   ├── ProductService.java      ← business rules, @Transactional
│   ├── ProductRepository.java   ← Spring Data JPA
│   └── Product.java             ← @Entity
└── common/ApiErrors.java
```

Package **by feature**, not by layer — related code stays together.

## Configuration

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shop
    username: app
    password: ${DB_PASSWORD}          # from an environment variable
  jpa:
    hibernate.ddl-auto: validate       # use Flyway/Liquibase for schema changes
server:
  port: 8080
app:
  tax-rate: 0.18
```

```java
@ConfigurationProperties(prefix = "app")
public record AppProps(BigDecimal taxRate) {}
```

**Profiles:** `application-dev.yml`, `application-prod.yml`; activate with `SPRING_PROFILES_ACTIVE=prod`. Beans can be limited with `@Profile("dev")`.

## Transactions

```java
@Transactional                       // commit on success, rollback on RuntimeException
public void placeOrder(...) { ... }

@Transactional(readOnly = true)      // hint for reads
```

Gotchas:
- Works through a **proxy** — calling a `@Transactional` method from another method in the **same class** skips the transaction.
- Checked exceptions **don't** roll back unless you add `rollbackFor = Exception.class`.

## Security (JWT API) in brief

```java
@Bean
SecurityFilterChain api(HttpSecurity http) throws Exception {
    return http
        .csrf(c -> c.disable())                                  // stateless API
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(a -> a
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
            .anyRequest().authenticated())
        .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
        .build();
}
```

Store passwords with `BCryptPasswordEncoder`, never plain text.

## Testing

```java
@WebMvcTest(ProductController.class)        // only the web layer
class ProductControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean ProductService service;

    @Test void returns404() throws Exception {
        when(service.get(9L)).thenThrow(new NotFoundException("no product 9"));
        mvc.perform(get("/api/products/9")).andExpect(status().isNotFound());
    }
}
```

- `@DataJpaTest` — repositories against an in-memory/Testcontainers DB.
- `@SpringBootTest` — the whole app; slowest, use sparingly.

## Useful starters

`spring-boot-starter-web`, `-data-jpa`, `-validation`, `-security`, `-actuator` (`/actuator/health`), `-test`, plus `flyway-core`, `lombok`, `springdoc-openapi` (Swagger UI).

## Interview quick answers

- **`@Component` vs `@Bean`?** `@Component` marks your class for scanning; `@Bean` is a factory method for objects you can't annotate.
- **`@Controller` vs `@RestController`?** The latter adds `@ResponseBody` — return values become JSON.
- **Field vs constructor injection?** Constructor: immutable, required deps are explicit, testable without Spring.
- **What is the N+1 problem?** See [JPA & Hibernate](./jpa-hibernate.md#the-n1-problem).
