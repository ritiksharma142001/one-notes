---
format: md
---

# Spring & Spring Boot — Complete Topics Guide

---

## 1. Spring Core — IoC & Dependency Injection
> **Spring Framework**

### IoC Container `Core`
Spring manages object creation and lifecycle (Inversion of Control) — you define what you need, Spring wires it together.
- Key classes: `BeanFactory`, `ApplicationContext`, `ClassPathXmlApplicationContext`, `AnnotationConfigApplicationContext`
- **What to know:** Understand why IoC exists — it removes tight coupling between classes

### Dependency Injection `Core`
Three styles: constructor injection (recommended — immutable, testable), setter injection (optional deps), field injection (`@Autowired` on fields — convenient but harder to test).
- Key: `Constructor injection`, `Setter injection`, `Field injection`, `@Autowired`, `@Inject`
- **What to know:** Always prefer constructor injection in production code

### Bean Definition & Registration `Core`
Ways to register beans: `@Component` (auto-scan), `@Bean` in `@Configuration` class, XML config (legacy).
- Key: `@Component`, `@Bean`, `@Configuration`, `XML config`, `@Import`
- **What to know:** Know when to use `@Bean` vs `@Component`

### Bean Lifecycle `Core`
Instantiation → populate properties → `BeanNameAware` → `BeanFactoryAware` → `@PostConstruct` → `afterPropertiesSet` → init-method → use → `@PreDestroy` → destroy.
- Key: `@PostConstruct`, `@PreDestroy`, `InitializingBean`, `DisposableBean`, `BeanPostProcessor`, `init-method`
- **What to know:** Know the full lifecycle order for interviews and debugging

### Bean Scopes `Core`
Singleton (one per container — default), Prototype (new instance every time), Request (one per HTTP request), Session (one per HTTP session), Application (one per ServletContext).
- Key: `singleton`, `prototype`, `request`, `session`, `application`, `@Scope`
- **What to know:** Most bugs with scopes come from injecting prototype into singleton

### Stereotype Annotations `Core`
`@Component` is the generic marker. `@Service` (business logic), `@Repository` (adds exception translation), `@Controller` (MVC), `@RestController` (`@Controller` + `@ResponseBody`). All are `@Component` under the hood.
- Key: `@Component`, `@Service`, `@Repository`, `@Controller`, `@RestController`
- **What to know:** They are semantically meaningful — use the right one per layer

### @Configuration & @Bean `Core`
Java-based config class. `@Bean` methods return objects that become Spring-managed beans. Useful for third-party classes you cannot annotate with `@Component`.
- Key: `@Configuration`, `@Bean`, `@Primary`, `proxyBeanMethods`
- **What to know:** Use `@Configuration + @Bean` for any class you do not own

### @Autowired, @Qualifier, @Primary `Core`
When multiple beans of the same type exist, Spring does not know which to inject. `@Primary` marks the default. `@Qualifier("name")` picks a specific one explicitly.
- Key: `@Autowired`, `@Qualifier`, `@Primary`, `@Resource`, `NoUniqueBeanDefinitionException`
- **What to know:** Fix ambiguity errors with `@Primary` or `@Qualifier`

### Component Scanning `Core`
Spring scans packages for `@Component`-annotated classes. `@SpringBootApplication` includes `@ComponentScan` of the current package by default.
- Key: `@ComponentScan`, `basePackages`, `basePackageClasses`, `excludeFilters`, `includeFilters`
- **What to know:** Mis-configured scan is the #1 cause of `NoSuchBeanDefinitionException`

### Spring Profiles `Mid`
Activate different bean configurations per environment. `@Profile("dev")` means the bean only loads in dev. Combine with `application-dev.yml` for full environment separation.
- Key: `@Profile`, `spring.profiles.active`, `@ActiveProfiles`, `spring.profiles.include`
- **What to know:** Essential for having different DB configs per environment

### Spring Expression Language (SpEL) `Mid`
Powerful expression language used in `@Value`, `@PreAuthorize`, `@Cacheable` key. Supports property access, method calls, conditionals, regex.
- Key: `@Value("#{...}")`, `#{bean.property}`, `T() type reference`, `Conditional expressions`
- **What to know:** Used heavily in `@Value` injection and Spring Security rules

### Environment & PropertySource `Mid`
Abstraction over all property sources — system props, env vars, `.properties` files. `@PropertySource` adds a custom file. `Environment.getProperty()` reads values programmatically.
- Key: `@PropertySource`, `Environment`, `@Value`, `PropertySourcesPlaceholderConfigurer`
- **What to know:** Understand property resolution order — env vars override files

---

## 2. Spring AOP — Aspect-Oriented Programming
> **Spring Framework**

### What is AOP & Why Use It `Core`
Cross-cutting concerns (logging, security, transactions, auditing) pollute every class if coded directly. AOP lets you extract them into Aspects and apply them declaratively.
- Key: `Cross-cutting concerns`, `Separation of concerns`, `@Aspect`, `AspectJ`
- **What to know:** Recognize what belongs in an aspect vs a service

### Core AOP Concepts `Core`
Aspect: the class with cross-cutting logic. JoinPoint: a point in execution (method call). Pointcut: expression selecting which JoinPoints to intercept. Advice: what to do at that point.
- Key: `Aspect`, `JoinPoint`, `Pointcut`, `Advice`, `Weaving`, `Target object`
- **What to know:** These terms appear in every Spring AOP interview question

### Advice Types `Core`
`@Before` (before method), `@After` (always after), `@AfterReturning` (on success), `@AfterThrowing` (on exception), `@Around` (full control — must call `proceed()`).
- Key: `@Before`, `@After`, `@AfterReturning`, `@AfterThrowing`, `@Around`, `ProceedingJoinPoint`
- **What to know:** `@Around` is most powerful but dangerous if you forget `proceed()`

### Pointcut Expressions `Mid`
`execution(* com.example.service.*.*(..))` — match by package, class, method, args. Combine with `&&`, `||`, `!`. `@annotation()` matches by annotation presence.
- Key: `execution()`, `within()`, `@annotation()`, `@within()`, `args()`, `&&, ||, !`
- **What to know:** Writing precise pointcut expressions is a key AOP skill

### Proxy Mechanism `Advanced`
Spring AOP works via proxies. If the target implements an interface → JDK dynamic proxy. If not → CGLIB subclass proxy. Self-invocation bypasses the proxy — a common gotcha.
- Key: `JDK dynamic proxy`, `CGLIB proxy`, `proxyTargetClass`, `Self-invocation problem`, `AopContext`
- **What to know:** Self-invocation bypassing AOP is a classic production bug

### @Transactional Internals `Advanced`
`@Transactional` is implemented as AOP advice. Spring wraps your bean in a proxy that starts/commits/rolls back around method calls. This is why calling `@Transactional` from the same class does not work.
- Key: `TransactionInterceptor`, `TransactionAspectSupport`, `Proxy self-call issue`
- **What to know:** Understanding this explains many `@Transactional` bugs

---

## 3. Spring Data & JPA
> **Both**

### Spring Data JPA Overview `Core`
Eliminates boilerplate data access code. You define a repository interface, Spring generates the implementation. Built on top of JPA (Hibernate as default provider).
- Key: `spring-boot-starter-data-jpa`, `Hibernate`, `JPA provider`, `EntityManager`
- **What to know:** Know the difference between Spring Data JPA, JPA, and Hibernate

### Repository Hierarchy `Core`
`Repository` (marker) → `CrudRepository` (save/find/delete) → `PagingAndSortingRepository` (+ pagination) → `JpaRepository` (+ flush/batch). Use `JpaRepository` for most cases.
- Key: `Repository`, `CrudRepository`, `PagingAndSortingRepository`, `JpaRepository`, `ListCrudRepository`
- **What to know:** `JpaRepository` is most commonly used — know all its methods

### Derived Query Methods `Core`
Spring parses method names to generate SQL: `findByFirstNameAndLastName()`, `findByAgeGreaterThan()`, `findByEmailContainingIgnoreCase()`.
- Key: `findBy`, `countBy`, `existsBy`, `deleteBy`, `And/Or`, `Like/Containing`, `GreaterThan/LessThan`, `OrderBy`, `Top/First`
- **What to know:** Know the full list of supported keywords for interviews

### @Query (JPQL & Native SQL) `Mid`
Write custom queries when derived methods are too complex. JPQL operates on entity names/fields. `nativeQuery=true` for raw SQL. `@Modifying` needed for UPDATE/DELETE queries.
- Key: `@Query`, `JPQL`, `nativeQuery=true`, `@Modifying`, `@Param`, `SpEL in queries`
- **What to know:** Always add `@Modifying + @Transactional` together for write queries

### @Transactional in Depth `Core`
propagation: `REQUIRED` (join existing or create new — default), `REQUIRES_NEW` (always new), `NOT_SUPPORTED`, `NEVER`. isolation: `READ_COMMITTED`, `REPEATABLE_READ`, `SERIALIZABLE`.
- Key: `propagation`, `isolation`, `readOnly`, `rollbackFor`, `noRollbackFor`, `timeout`, `REQUIRED`, `REQUIRES_NEW`, `NESTED`
- **What to know:** Propagation and isolation levels are top interview topics

### Entity Mapping & Annotations `Core`
`@Entity`, `@Table`, `@Id`, `@GeneratedValue` (IDENTITY/SEQUENCE/AUTO), `@Column`, `@Transient` (not persisted), `@Enumerated`, `@Embedded`, `@EmbeddedId` for composite keys.
- Key: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Transient`, `@Embedded`, `@EmbeddedId`, `@Enumerated`
- **What to know:** Know `GenerationType` strategies — IDENTITY vs SEQUENCE performance differs

### Entity Relationships `Core`
`@OneToMany` with `mappedBy` on the owning side. `@ManyToOne` with `@JoinColumn`. `@ManyToMany` needs a join table. Always think about cascade and `orphanRemoval` carefully.
- Key: `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne`, `@JoinColumn`, `@JoinTable`, `mappedBy`, `cascade`, `orphanRemoval`
- **What to know:** Mis-configured cascade is a top cause of accidental data deletion

### Fetch Types & N+1 Problem `Mid`
LAZY loads related entities on access (default for collections). EAGER loads immediately (default for `@ManyToOne`). N+1: 1 query for list + N queries for each related entity. Fix: `JOIN FETCH`, `@EntityGraph`, or batch size.
- Key: `FetchType.LAZY`, `FetchType.EAGER`, `N+1 problem`, `JOIN FETCH`, `@EntityGraph`, `@BatchSize`
- **What to know:** N+1 is the single most common performance problem in JPA apps

### Projections & DTOs `Mid`
Load only needed fields instead of full entities. Interface projections (Spring generates proxy), class-based projections (DTO constructor), `@Query` with DTO constructor expression.
- Key: `Interface projection`, `Class projection`, `DTO constructor`, `SELECT new com.example.Dto(...)`
- **What to know:** Always use projections for read-heavy endpoints

### Pagination & Sorting `Mid`
Pass `Pageable` to repository methods. `PageRequest.of(page, size, Sort.by("name"))`. Returns `Page<T>` (has total count) or `Slice<T>` (no count — more efficient for infinite scroll).
- Key: `Pageable`, `PageRequest`, `Page<T>`, `Slice<T>`, `Sort`, `Sort.Direction`
- **What to know:** Use `Slice` instead of `Page` when you do not need total count

### Auditing `Mid`
Auto-populate created/modified timestamps. Enable with `@EnableJpaAuditing`. Use `@EntityListeners(AuditingEntityListener.class)` on your entity.
- Key: `@EnableJpaAuditing`, `@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`, `@LastModifiedBy`, `AuditingEntityListener`
- **What to know:** Add auditing from day 1 — retrofitting it is painful

### DB Migrations (Flyway / Liquibase) `Mid`
Flyway: SQL scripts in `db/migration` named `V1__desc.sql`. Runs on startup automatically. Liquibase: XML/YAML changesets — more flexible but more complex.
- Key: `Flyway`, `Liquibase`, `V1__init.sql`, `classpath:db/migration`, `spring.flyway.enabled`, `changelog`
- **What to know:** Never use `spring.jpa.hibernate.ddl-auto=create` in production

### Hibernate Caching `Advanced`
L1 cache: per-session, automatic, cannot disable. L2 cache: cross-session, requires setup (EhCache/Redis). Query cache: cache result sets.
- Key: `First-level cache`, `Second-level cache`, `@Cache`, `EhCache`, `Query cache`, `eviction`
- **What to know:** L1 cache explains why repeated `findById` in same transaction returns same object

### Specifications & Criteria API `Advanced`
Type-safe dynamic queries. `Specification<T>` lets you build WHERE clauses at runtime. `JpaSpecificationExecutor` adds `findAll(spec)`. Alternative: QueryDSL.
- Key: `Specification<T>`, `JpaSpecificationExecutor`, `CriteriaBuilder`, `CriteriaQuery`, `Predicate`, `QueryDSL`
- **What to know:** Use Specifications for search/filter screens with dynamic conditions

---

## 4. Spring MVC & REST API
> **Both**

### DispatcherServlet & MVC Lifecycle `Core`
Front controller pattern. Request → DispatcherServlet → HandlerMapping (find controller) → HandlerAdapter (invoke method) → ModelAndView → ViewResolver → Response.
- Key: `DispatcherServlet`, `HandlerMapping`, `HandlerAdapter`, `ViewResolver`, `ModelAndView`
- **What to know:** Understanding this flow helps debug 404s and 405s

### REST Controller Annotations `Core`
`@RestController` = `@Controller` + `@ResponseBody`. `@RequestMapping` at class level sets base path. Use specific HTTP method annotations at method level.
- Key: `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`
- **What to know:** Know what `@ResponseBody` does — it writes directly to HTTP response body

### Request Data Binding `Core`
`@PathVariable` extracts from URL path. `@RequestParam` from query string. `@RequestBody` deserializes JSON body. `@RequestHeader` reads headers. `@CookieValue` reads cookies.
- Key: `@PathVariable`, `@RequestParam`, `@RequestBody`, `@RequestHeader`, `@CookieValue`, `@ModelAttribute`
- **What to know:** Know when to use `@RequestParam` vs `@PathVariable` vs `@RequestBody`

### ResponseEntity `Core`
Full control over HTTP response. Set status code, headers, and body explicitly.
- Key: `ResponseEntity<T>`, `HttpStatus`, `HttpHeaders`, `ResponseEntity.ok()`, `ResponseEntity.created()`, `ResponseEntity.noContent()`
- **What to know:** Always return `ResponseEntity` from REST controllers for proper status codes

### Exception Handling (@ControllerAdvice) `Core`
`@ControllerAdvice` is a global exception handler. `@ExceptionHandler(SomeException.class)` catches specific exceptions. Return a consistent error response DTO.
- Key: `@ControllerAdvice`, `@RestControllerAdvice`, `@ExceptionHandler`, `ProblemDetail`, `RFC 7807`
- **What to know:** Build one centralized error handler — never scatter try-catch in controllers

### Bean Validation `Mid`
Add `@Valid` on `@RequestBody` to trigger validation. `@NotNull`, `@NotBlank`, `@Size`, `@Min`, `@Max`, `@Email`, `@Pattern` on DTO fields. `MethodArgumentNotValidException` thrown on failure.
- Key: `@Valid`, `@Validated`, `@NotNull`, `@NotBlank`, `@Size`, `@Email`, `@Pattern`, `MethodArgumentNotValidException`, `BindingResult`
- **What to know:** Always validate at the controller layer — do not trust incoming data

### Custom Validators `Mid`
Create `@interface` annotation + `ConstraintValidator<A, T>` implementation. Useful for domain-specific rules.
- Key: `ConstraintValidator`, `@Constraint`, `isValid()`, `Custom annotation`, `Cross-field validation`
- **What to know:** Write custom validators for domain-specific rules

### Content Negotiation `Mid`
Same endpoint serves JSON or XML based on `Accept` header. Spring uses `HttpMessageConverters`. Jackson for JSON, JAXB for XML.
- Key: `Accept header`, `HttpMessageConverter`, `Jackson`, `JAXB`, `produces attribute`, `MediaType`
- **What to know:** Understand how converters serialize/deserialize — helps debug 415 errors

### CORS Configuration `Mid`
`@CrossOrigin` on controller for simple cases. Global CORS via `WebMvcConfigurer.addCorsMappings()`. Or configure via Security `filterChain` in Spring Security apps.
- Key: `@CrossOrigin`, `WebMvcConfigurer`, `addCorsMappings()`, `allowedOrigins`, `allowedMethods`, `allowCredentials`
- **What to know:** CORS is always a pain point with frontend teams — know it well

### Filters vs Interceptors `Mid`
Filters (`javax.servlet.Filter`): run before Spring, see raw request/response, ideal for auth/logging. Interceptors (`HandlerInterceptor`): run inside Spring, know which controller is called.
- Key: `OncePerRequestFilter`, `Filter`, `FilterRegistrationBean`, `HandlerInterceptor`, `preHandle`, `postHandle`, `afterCompletion`
- **What to know:** Use Filter for auth/security, Interceptor for request logging/audit

### HTTP Message Converters `Advanced`
Convert Java objects to/from HTTP body. Customize `ObjectMapper` globally via `@Bean`. Control serialization with `@JsonProperty`, `@JsonIgnore`, `@JsonFormat`.
- Key: `HttpMessageConverter`, `MappingJackson2HttpMessageConverter`, `ObjectMapper`, `@JsonProperty`, `@JsonIgnore`, `@JsonFormat`, `@JsonInclude`
- **What to know:** Customize `ObjectMapper` for consistent date formats and null handling

### Async REST Controllers `Advanced`
Return `Callable<T>` or `DeferredResult<T>` to free the servlet thread while processing. Better: return `CompletableFuture<T>`.
- Key: `Callable<T>`, `DeferredResult<T>`, `CompletableFuture<T>`, `@EnableAsync`, `AsyncTaskExecutor`
- **What to know:** Async controllers improve throughput under high concurrency

---

## 5. Spring Boot Specifics
> **Spring Boot**

### Auto-configuration `Core`
Spring Boot reads `META-INF/spring/AutoConfiguration.imports`. Conditions decide if a config applies. Use `debug=true` to see which configs fired.
- Key: `@EnableAutoConfiguration`, `@Conditional`, `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `@ConditionalOnProperty`, `spring.autoconfigure.exclude`
- **What to know:** Use `spring.autoconfigure.report=true` to debug what was auto-configured

### Spring Boot Starters `Core`
Curated dependency bundles. `spring-boot-starter-web` pulls in Tomcat + Spring MVC + Jackson. `spring-boot-starter-data-jpa` pulls in Hibernate + Spring Data + HikariCP.
- Key: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-security`, `spring-boot-starter-test`, `spring-boot-starter-actuator`
- **What to know:** Know what each starter brings transitively — helps troubleshoot classpaths

### application.properties / yml `Core`
Externalized configuration. Property resolution order: command-line args > env vars > `application.yml` > defaults. Use `${VAR:default}` for fallbacks.
- Key: `application.yml`, `application.properties`, `${property.key}`, `${VAR:default}`, `spring.config.location`, `spring.config.import`
- **What to know:** Know the full property resolution order — env vars always override files

### @ConfigurationProperties `Mid`
Bind a group of properties to a typed POJO. `@ConfigurationProperties(prefix="app.mail")` maps `app.mail.host`, `app.mail.port` etc.
- Key: `@ConfigurationProperties`, `prefix`, `@EnableConfigurationProperties`, `@ConfigurationPropertiesScan`, `Relaxed binding`
- **What to know:** Use `@ConfigurationProperties` over `@Value` for groups of related properties

### Environment Profiles `Core`
`application-dev.yml`, `application-prod.yml` loaded by active profile. `spring.profiles.active=dev` in main yml or as env var.
- Key: `application-{profile}.yml`, `spring.profiles.active`, `spring.profiles.include`, `@Profile`, `SPRING_PROFILES_ACTIVE`
- **What to know:** Never hardcode environment-specific values — always use profiles

### Spring Boot Actuator `Mid`
Production-ready endpoints. `/actuator/health`, `/actuator/metrics`, `/actuator/env`, `/actuator/beans`, `/actuator/loggers` (change log level at runtime).
- Key: `/health`, `/metrics`, `/env`, `/beans`, `/loggers`, `/info`, `management.endpoints.web.exposure.include`
- **What to know:** Actuator health is required for Kubernetes liveness/readiness probes

### Embedded Servers `Core`
Tomcat by default. Swap to Jetty or Undertow by excluding Tomcat and adding the alternative. Configure port, SSL, compression, max threads in `application.yml`.
- Key: `Tomcat`, `Jetty`, `Undertow`, `server.port`, `server.ssl`, `server.tomcat.max-threads`, `TomcatServletWebServerFactory`
- **What to know:** Know how to run HTTPS locally — needed for OAuth2 and cookie security

### Spring Boot DevTools `Core`
Automatic restart on classpath change, LiveReload for browser. Disabled in production automatically when running from JAR.
- Key: `spring-boot-devtools`, `Automatic restart`, `LiveReload`, `spring.devtools.restart.exclude`
- **What to know:** Essential for development — saves time on every code change

### CommandLineRunner & ApplicationRunner `Core`
Run code after context loads — good for data seeding, warmup. `ApplicationReadyEvent` fires when app is ready.
- Key: `CommandLineRunner`, `ApplicationRunner`, `@EventListener(ApplicationReadyEvent)`, `SpringApplication.setBannerMode()`
- **What to know:** Use `ApplicationRunner` for post-startup initialization logic

### Fat JAR & Deployment `Core`
`mvn package` creates an executable fat JAR. Run with `java -jar app.jar`. Pass properties as `java -jar app.jar --server.port=9090`. Build Docker image with Buildpacks.
- Key: `spring-boot-maven-plugin`, `Executable JAR`, `Thin JAR`, `Buildpacks`, `Layered JAR`, `Dockerfile`
- **What to know:** Understand layered JARs for optimal Docker image caching

### Custom Auto-configuration `Advanced`
Create your own starter. Write `@Configuration` class with `@Conditional` guards. Register in `META-INF/spring/AutoConfiguration.imports`.
- Key: `@AutoConfiguration`, `@ConditionalOnClass`, `@ConditionalOnMissingBean`, `AutoConfiguration.imports`, `spring.factories (legacy)`
- **What to know:** Build starters for shared company libraries — DB config, security, logging

---

## 6. Spring Security
> **Both**

### Security Architecture & Filter Chain `Core`
A chain of servlet filters. Each request passes through authentication and authorization filters. `SecurityContextHolder` stores auth info per thread.
- Key: `SecurityFilterChain`, `OncePerRequestFilter`, `SecurityContextHolder`, `SecurityContext`, `Authentication`, `UsernamePasswordAuthenticationFilter`
- **What to know:** Drawing the filter chain on paper helps understand Spring Security deeply

### Authentication vs Authorization `Core`
Authentication: verify identity (who are you?). Authorization: check permissions (what can you do? — roles, authorities). Spring separates these clearly.
- Key: `Authentication`, `Authorization`, `AuthenticationManager`, `AuthenticationProvider`, `AccessDecisionManager`, `GrantedAuthority`
- **What to know:** These are distinct concepts — keep them separate in your architecture too

### SecurityFilterChain Configuration `Core`
Modern Spring Security uses `SecurityFilterChain @Bean` (not `WebSecurityConfigurerAdapter` — deprecated/removed in Spring Security 6).
- Key: `SecurityFilterChain`, `HttpSecurity`, `authorizeHttpRequests()`, `requestMatchers()`, `permitAll()`, `authenticated()`, `hasRole()`
- **What to know:** `WebSecurityConfigurerAdapter` is removed in Spring Security 6 — use `SecurityFilterChain`

### UserDetails & UserDetailsService `Core`
`UserDetailsService.loadUserByUsername()` is called during authentication. Returns `UserDetails` (username, password, authorities, account status).
- Key: `UserDetails`, `UserDetailsService`, `loadUserByUsername()`, `UsernameNotFoundException`, `GrantedAuthority`, `SimpleGrantedAuthority`
- **What to know:** This is the main integration point between your user DB and Spring Security

### Password Encoding `Core`
Never store plain text. `BCryptPasswordEncoder` is the standard — it salts and hashes. Use `encode()` on registration, `matches()` on login.
- Key: `PasswordEncoder`, `BCryptPasswordEncoder`, `DelegatingPasswordEncoder`, `{bcrypt} prefix`, `encode()`, `matches()`
- **What to know:** BCrypt strength factor 10-12 is the recommended default

### JWT Authentication `Core`
Stateless auth. On login: validate credentials, generate JWT. On each request: extract token from `Authorization` header, validate signature, load `SecurityContext`. No session stored server-side.
- Key: `JWT`, `JJWT library`, `JwtAuthenticationFilter`, `Bearer token`, `Authorization header`, `Claims`, `jwtSecret`, `jwtExpiration`
- **What to know:** Store JWT in `httpOnly` cookie (safer) not `localStorage` (XSS vulnerable)

### Method-Level Security `Mid`
`@EnableMethodSecurity` activates it. `@PreAuthorize("hasRole('ADMIN')")` checks before method. `@PostAuthorize` checks after (for return value).
- Key: `@EnableMethodSecurity`, `@PreAuthorize`, `@PostAuthorize`, `@Secured`, `@RolesAllowed`, `SpEL in security`, `hasRole()`, `hasAuthority()`
- **What to know:** Use `@PreAuthorize` with SpEL for fine-grained permission checks

### OAuth2 & OpenID Connect `Mid`
`spring-boot-starter-oauth2-client` for "Login with Google/GitHub". `spring-boot-starter-oauth2-resource-server` for validating JWT tokens issued by an auth server.
- Key: `OAuth2LoginConfigurer`, `OAuth2ResourceServer`, `@RegisteredOAuth2AuthorizedClient`, `JwtDecoder`, `OpaqueTokenIntrospector`
- **What to know:** Know the OAuth2 authorization code flow end-to-end

### CSRF Protection `Mid`
Enabled by default for form-based apps. Safe to disable for stateless REST APIs (JWT auth, no cookies).
- Key: `CsrfFilter`, `CsrfTokenRepository`, `CookieCsrfTokenRepository`, `http.csrf().disable()`, `SameSite cookies`
- **What to know:** Disable CSRF only for stateless REST APIs — always enable for form logins

### Security Testing `Mid`
`@WithMockUser` provides a mock authenticated user in tests. `@WithUserDetails` loads from `UserDetailsService`. Use `MockMvc` with Spring Security to test secured endpoints.
- Key: `@WithMockUser`, `@WithUserDetails`, `@WithSecurityContext`, `SecurityMockMvcRequestPostProcessors`, `springSecurity()`
- **What to know:** Always write security tests — unsecured endpoints are production bugs

---

## 7. Testing in Spring
> **Both**

### Unit Testing (No Spring Context) `Core`
Pure JUnit 5 + Mockito. Instantiate the class manually, mock all dependencies. Fastest tests.
- Key: `JUnit 5`, `@ExtendWith(MockitoExtension.class)`, `@Mock`, `@InjectMocks`, `Mockito.when()`, `verify()`, `assertThat()`
- **What to know:** Most of your tests should be unit tests — fast and focused

### @SpringBootTest (Integration) `Core`
Loads full application context. Slow but tests real wiring. `MOCK` (no real server), `RANDOM_PORT` (real server random port), `DEFINED_PORT`.
- Key: `@SpringBootTest`, `webEnvironment`, `MOCK`, `RANDOM_PORT`, `DEFINED_PORT`, `@Autowired in tests`
- **What to know:** Use sparingly — they are slow. Prefer slice tests where possible

### MockMvc `Core`
Test REST controllers without starting a real HTTP server. Works with `@WebMvcTest` or `@SpringBootTest(MOCK)`.
- Key: `MockMvc`, `MockMvcBuilders`, `perform()`, `andExpect()`, `status()`, `jsonPath()`, `content()`, `@AutoConfigureMockMvc`
- **What to know:** MockMvc + `@WebMvcTest` is the sweet spot for controller testing

### Slice Tests `Mid`
`@WebMvcTest`: only web layer. `@DataJpaTest`: only JPA layer, in-memory H2 DB. `@JsonTest`: only JSON serialization. Much faster than full context.
- Key: `@WebMvcTest`, `@DataJpaTest`, `@JsonTest`, `@RestClientTest`, `@WebFluxTest`, `@DataMongoTest`
- **What to know:** Use the most specific slice test — load only what you need

### @MockBean & @SpyBean `Core`
`@MockBean` replaces a bean in the Spring context with a Mockito mock. `@SpyBean` wraps real bean with spy. Different from `@Mock` which is outside Spring context.
- Key: `@MockBean`, `@SpyBean`, `Mockito.mock() vs @MockBean`, `Context caching with @MockBean`
- **What to know:** `@MockBean` breaks context caching — use it only when necessary

### Testcontainers `Mid`
Spin up real Docker containers (PostgreSQL, Kafka, Redis) for integration tests. `@ServiceConnection` auto-configures Spring datasource from container.
- Key: `@Testcontainers`, `@Container`, `PostgreSQLContainer`, `KafkaContainer`, `@ServiceConnection`, `@DynamicPropertySource`
- **What to know:** `@ServiceConnection` (Spring Boot 3.1+) eliminates manual property wiring

### Test Data Management `Mid`
`@Transactional` on test class rolls back after each test. `@Sql` runs SQL scripts before/after tests. Use `application-test.yml` with H2 in-memory for fast tests.
- Key: `@Sql`, `@Transactional (test rollback)`, `H2 in-memory`, `application-test.yml`, `@BeforeEach`, `@AfterEach`
- **What to know:** Always isolate test data — never let tests depend on each other

### Testing Async & Scheduled `Advanced`
Await `CompletableFuture` in tests with `.get()`. Use Awaitility for async assertions. Mock `Clock` for time-dependent logic.
- Key: `Awaitility`, `CompletableFuture.get()`, `@EnableScheduling in tests`, `Clock mock`, `ScheduledTaskHolder`
- **What to know:** Never use `Thread.sleep` in tests — use Awaitility

---

## 8. Messaging & Async
> **Both**

### @Async & Thread Pools `Mid`
Add `@EnableAsync` on config class. `@Async` on method runs it in a separate thread. Configure a custom `Executor` bean — never use default single-threaded executor in production.
- Key: `@Async`, `@EnableAsync`, `ThreadPoolTaskExecutor`, `CompletableFuture`, `corePoolSize`, `maxPoolSize`, `queueCapacity`
- **What to know:** Always configure a custom thread pool — the default is not production-safe

### @Scheduled `Mid`
`fixedRate`: run every N ms regardless of last execution. `fixedDelay`: wait N ms after last completion. `cron`: full cron expression. `@EnableScheduling` activates it.
- Key: `@Scheduled`, `@EnableScheduling`, `fixedRate`, `fixedDelay`, `initialDelay`, `cron expression`, `SchedulingConfigurer`
- **What to know:** `fixedRate` vs `fixedDelay` difference is a common interview question

### Spring Kafka `Mid`
`@KafkaListener(topics="my-topic")` consumes messages. `KafkaTemplate<K, V>` produces messages. Configure bootstrap-servers, group-id, key/value deserializers.
- Key: `@KafkaListener`, `KafkaTemplate`, `@EnableKafka`, `ConsumerFactory`, `ProducerFactory`, `spring.kafka.bootstrap-servers`, `Acknowledgment`
- **What to know:** Understand consumer group IDs and offset management

### Spring RabbitMQ `Mid`
`@RabbitListener(queues="my-queue")` consumes messages. `RabbitTemplate` sends messages. Declare `Queue`, `Exchange`, `Binding` as `@Bean`.
- Key: `@RabbitListener`, `RabbitTemplate`, `@EnableRabbit`, `Queue`, `Exchange`, `Binding`, `DirectExchange`, `TopicExchange`, `FanoutExchange`
- **What to know:** Know the exchange types and when to use each

### Application Events `Mid`
Publish events with `ApplicationEventPublisher.publishEvent()`. Listen with `@EventListener`. `@TransactionalEventListener` for events that fire after DB commit.
- Key: `ApplicationEventPublisher`, `@EventListener`, `ApplicationEvent`, `@TransactionalEventListener`, `@Async on listener`
- **What to know:** `@TransactionalEventListener` prevents events firing before DB commit completes

### Spring WebFlux (Reactive) `Advanced`
Non-blocking reactive web framework built on Project Reactor. `Mono<T>` (0-1 items), `Flux<T>` (0-N items). Needs reactive DB drivers (R2DBC).
- Key: `Mono<T>`, `Flux<T>`, `@RestController (reactive)`, `RouterFunction`, `WebClient`, `ReactiveMongoRepository`, `R2DBC`, `SSE`
- **What to know:** Do not mix blocking code into a reactive pipeline — it defeats the purpose

---

## 9. Caching, Performance & Monitoring
> **Both**

### Spring Cache Abstraction `Mid`
`@EnableCaching` activates it. `@Cacheable` caches return value. `@CachePut` always updates cache. `@CacheEvict` removes entries. Pluggable: swap in-memory for Redis with no code change.
- Key: `@EnableCaching`, `@Cacheable`, `@CachePut`, `@CacheEvict`, `@Caching`, `CacheManager`, `CacheResolver`, `key SpEL expression`
- **What to know:** Cache key design is critical — wrong keys cause stale data bugs

### Redis Integration `Mid`
`spring-boot-starter-data-redis`. `StringRedisTemplate` for strings. `RedisTemplate<K,V>` for typed objects. `opsForValue()`, `opsForHash()`, `opsForList()`, `opsForSet()`, `opsForZSet()`.
- Key: `RedisTemplate`, `StringRedisTemplate`, `opsForValue()`, `opsForHash()`, `RedisCacheManager`, `Lettuce`, `Jedis`
- **What to know:** Use Lettuce (default) over Jedis — it is thread-safe and non-blocking

### Connection Pooling (HikariCP) `Mid`
Default connection pool since Spring Boot 2. Key settings: `maximum-pool-size` (default 10), `minimum-idle`, `connection-timeout`, `idle-timeout`.
- Key: `HikariCP`, `spring.datasource.hikari.*`, `maximum-pool-size`, `minimum-idle`, `connection-timeout`, `idle-timeout`, `keepalive-time`
- **What to know:** Pool size = (number of DB cores × 2) + effective_spindle_count is a good starting formula

### Micrometer & Metrics `Mid`
Vendor-neutral metrics facade. Auto-instruments JVM, Tomcat, DB pool, HTTP requests. Export to Prometheus, Datadog, CloudWatch.
- Key: `Micrometer`, `MeterRegistry`, `Counter`, `Gauge`, `Timer`, `DistributionSummary`, `@Timed`, `Prometheus`, `Grafana`
- **What to know:** Add `@Timed` to critical methods to track p95/p99 latency

### Health Checks & Kubernetes Probes `Mid`
`/actuator/health` shows UP/DOWN. Kubernetes liveness probe (is the app alive?) and readiness probe (is it ready for traffic?) both use Actuator health endpoints.
- Key: `HealthIndicator`, `CompositeHealthContributor`, `liveness probe`, `readiness probe`, `LivenessState`, `ReadinessState`
- **What to know:** Separate liveness and readiness — they signal different things to Kubernetes

### Spring Boot Startup Optimization `Advanced`
Lazy initialization (`spring.main.lazy-initialization=true`). AOT compilation with GraalVM native image. Class Data Sharing (CDS). Remove unused auto-configuration.
- Key: `spring.main.lazy-initialization`, `@Lazy`, `GraalVM native image`, `AOT processing`, `Class Data Sharing`, `Spring Boot Buildpacks`
- **What to know:** Native images start in <100ms — great for Lambda / serverless

---

## 10. Spring Cloud & Microservices
> **Both**

### Config Server `Mid`
Centralised config for all microservices backed by Git. Services fetch config on startup. Supports encryption, refresh with `@RefreshScope + /actuator/refresh`.
- Key: `@EnableConfigServer`, `spring-cloud-config-server`, `spring.config.import=configserver:`, `@RefreshScope`, `/actuator/refresh`, `Git backend`
- **What to know:** Config Server is the first Spring Cloud component to add to any microservices project

### Service Discovery (Eureka) `Mid`
`@EnableEurekaServer` on server. `@EnableDiscoveryClient` on services. Services register with heartbeats. Client uses service name instead of IP.
- Key: `@EnableEurekaServer`, `@EnableDiscoveryClient`, `EurekaClient`, `@LoadBalanced`, `spring.application.name`, `Spring Cloud LoadBalancer`
- **What to know:** Know what happens when Eureka server goes down — services cache registrations

### API Gateway (Spring Cloud Gateway) `Mid`
Reactive gateway built on WebFlux. Routes requests by path/host to downstream services. Add filters: authentication, rate limiting, circuit breaking, request/response transformation.
- Key: `spring-cloud-gateway`, `RouteLocator`, `@GatewayFilter`, `GlobalFilter`, `path predicates`, `RewritePath filter`, `rate limiter filter`
- **What to know:** Put auth, rate limiting, and request logging in the gateway — not in each service

### Circuit Breaker (Resilience4j) `Mid`
States: CLOSED (normal) → OPEN (failing, reject calls) → HALF_OPEN (test recovery). `@CircuitBreaker`, `@Retry`, `@RateLimiter`, `@Bulkhead`, `@TimeLimiter`.
- Key: `@CircuitBreaker`, `@Retry`, `@RateLimiter`, `@Bulkhead`, `@TimeLimiter`, `fallbackMethod`, `resilience4j.circuitbreaker.*`, `CLOSED/OPEN/HALF_OPEN`
- **What to know:** Always implement fallback methods — degrade gracefully, never cascade-fail

### Feign Client `Mid`
Declarative HTTP client. `@FeignClient(name="user-service")` defines interface. Methods map to REST endpoints. Spring Cloud adds load balancing via service name.
- Key: `@FeignClient`, `@EnableFeignClients`, `FallbackFactory`, `ErrorDecoder`, `RequestInterceptor (auth header propagation)`
- **What to know:** Add `RequestInterceptor` to propagate JWT tokens between services

### Distributed Tracing `Advanced`
Every request gets a `traceId` (across services) and `spanId` (per operation). Micrometer Tracing instruments HTTP, Feign, Kafka automatically. Export to Zipkin or Tempo.
- Key: `Micrometer Tracing`, `Brave`, `OpenTelemetry`, `traceId`, `spanId`, `Zipkin`, `@NewSpan`, `MDC logging`, `W3C TraceContext`
- **What to know:** Trace IDs in logs are essential for debugging production issues in microservices

### Saga Pattern & Distributed Transactions `Advanced`
No distributed ACID transactions in microservices. Saga: sequence of local transactions with compensating transactions for rollback. Choreography (events) vs Orchestration (central coordinator).
- Key: `Saga pattern`, `Choreography`, `Orchestration`, `Compensating transaction`, `Outbox pattern`, `Temporal`, `Axon Framework`, `Event sourcing`
- **What to know:** Outbox pattern guarantees events are published even if service crashes mid-transaction

---

## Level Guide

| Level | Meaning |
|-------|---------|
| `Core` | Must know — foundation for any Spring project |
| `Mid` | Important — needed for real-world applications |
| `Advanced` | Deep knowledge — for senior roles and complex systems |

## Recommended Learning Order

1. Spring Core (IoC, DI, Beans)
2. Spring Boot basics (Auto-config, Starters, Properties)
3. Spring MVC & REST API
4. Spring Data JPA
5. Spring Security (JWT first, OAuth2 later)
6. Testing (Unit → MockMvc → Slice → Testcontainers)
7. Caching & Monitoring (Redis, Actuator, Micrometer)
8. Messaging (Async, Kafka or RabbitMQ)
9. Spring Cloud (Config Server → Eureka → Gateway → Resilience4j)
10. Advanced topics (AOP internals, WebFlux, Native Image)
