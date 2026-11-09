---
format: md
---

# Complete Design Patterns List (LLD, HLD & System Design)

> **Note**: Patterns marked with **(Interview Imp - Java)** are frequently asked in Java interviews

---

## **Table of Contents**
1. [LLD (Low-Level Design) Patterns](#1-lld-low-level-design-patterns)
2. [HLD (High-Level Design) Patterns](#2-hld-high-level-design-patterns)
3. [System Design Patterns](#3-system-design-patterns)
4. [Additional Specialized Patterns](#4-additional-specialized-patterns)

---

# **1. LLD (Low-Level Design) Patterns**

## **Creational Patterns (5)**
1. **Singleton** - Ensures a class has only one instance **(Interview Imp - Java)**
2. **Factory Method** - Creates objects without specifying exact class **(Interview Imp - Java)**
3. **Abstract Factory** - Creates families of related objects **(Interview Imp - Java)**
4. **Builder** - Constructs complex objects step by step **(Interview Imp - Java)**
5. **Prototype** - Creates objects by cloning existing ones **(Interview Imp - Java)**

## **Structural Patterns (7)**
6. **Adapter** - Makes incompatible interfaces work together **(Interview Imp - Java)**
7. **Bridge** - Separates abstraction from implementation
8. **Composite** - Treats individual objects and compositions uniformly **(Interview Imp - Java)**
9. **Decorator** - Adds responsibilities to objects dynamically **(Interview Imp - Java)**
10. **Facade** - Provides simplified interface to complex subsystem **(Interview Imp - Java)**
11. **Flyweight** - Shares common state to support large numbers of objects
12. **Proxy** - Provides placeholder/surrogate for another object **(Interview Imp - Java)**

## **Behavioral Patterns (11)**
13. **Chain of Responsibility** - Passes requests along a chain of handlers **(Interview Imp - Java)**
14. **Command** - Encapsulates requests as objects
15. **Interpreter** - Defines grammar and interpreter for a language
16. **Iterator** - Accesses elements sequentially without exposing structure **(Interview Imp - Java)**
17. **Mediator** - Centralizes complex communications between objects
18. **Memento** - Captures and restores object's internal state
19. **Observer** - Notifies dependents when object changes **(Interview Imp - Java)**
20. **State** - Alters behavior when internal state changes **(Interview Imp - Java)**
21. **Strategy** - Encapsulates algorithms and makes them interchangeable **(Interview Imp - Java)**
22. **Template Method** - Defines algorithm skeleton, subclasses fill in steps **(Interview Imp - Java)**
23. **Visitor** - Separates algorithms from objects they operate on

## **Additional Common LLD Patterns (3)**
24. **Null Object** - Provides default behavior for null references **(Interview Imp - Java)**
25. **Object Pool** - Reuses objects that are expensive to create **(Interview Imp - Java)**
26. **Lazy Initialization** - Delays object creation until first use **(Interview Imp - Java)**

---

# **2. HLD (High-Level Design) Patterns**

## **Architectural Patterns**
27. **Layered Architecture** - Organizes system into layers (Presentation, Business, Data) **(Interview Imp - Java)**
28. **MVC (Model-View-Controller)** - Separates data, UI, and logic **(Interview Imp - Java)**
29. **MVP (Model-View-Presenter)** - Variant of MVC
30. **MVVM (Model-View-ViewModel)** - UI pattern with data binding
31. **Hexagonal Architecture (Ports & Adapters)** - Isolates core logic from external concerns
32. **Clean Architecture** - Dependency rule with concentric layers
33. **Onion Architecture** - Domain-centric layered approach
34. **Event-Driven Architecture** - Communication through events **(Interview Imp - Java)**
35. **Pipe and Filter** - Processes data through pipeline of filters
36. **Blackboard** - Multiple systems collaborate on shared data
37. **Client-Server** - Request-response between clients and server
38. **Peer-to-Peer** - Decentralized network of equal nodes
39. **Service-Oriented Architecture (SOA)** - Services communicate via standard protocols
40. **Microservices** - Independent, deployable services **(Interview Imp - Java)**
41. **Serverless** - Event-driven, function-based execution
42. **CQRS (Command Query Responsibility Segregation)** - Separates read and write operations **(Interview Imp - Java)**
43. **Event Sourcing** - Stores state changes as sequence of events **(Interview Imp - Java)**
44. **Domain-Driven Design (DDD)** - Models complex business domains **(Interview Imp - Java)**
45. **Space-Based Architecture** - Distributed caching and processing

## **Enterprise Application Patterns**
46. **Repository** - Mediates between domain and data layer **(Interview Imp - Java)**
47. **DAO (Data Access Object)** - Abstracts database access **(Interview Imp - Java)**
48. **Service Layer** - Defines application boundary with services **(Interview Imp - Java)**
49. **Unit of Work** - Maintains list of objects in transaction
50. **Identity Map** - Ensures objects loaded once per session
51. **Data Mapper** - Moves data between objects and database
52. **Active Record** - Object wraps database row
53. **Table Data Gateway** - Gateway to database table
54. **Row Data Gateway** - Gateway to single record
55. **DTO (Data Transfer Object)** - Transfers data between layers **(Interview Imp - Java)**
56. **Value Object** - Immutable object representing value **(Interview Imp - Java)**
57. **Business Delegate** - Decouples presentation from business tier
58. **Session Facade** - Wraps complex business tier
59. **Front Controller** - Single handler for all requests **(Interview Imp - Java)**
60. **Application Controller** - Centralized request handling
61. **Intercepting Filter** - Pre/post-processes requests
62. **Context Object** - Encapsulates request context
63. **Dependency Injection** - Injects dependencies externally **(Interview Imp - Java)**
64. **Service Locator** - Central registry for services **(Interview Imp - Java)**

## **Domain Logic Patterns**
65. **Transaction Script** - Organizes logic by transaction
66. **Domain Model** - Rich object model of domain **(Interview Imp - Java)**
67. **Table Module** - Single instance per table
68. **Anemic Domain Model** - Objects with little behavior (anti-pattern but common)

## **Data Patterns**
69. **Lazy Load** - Defers loading until needed **(Interview Imp - Java)**
70. **Eager Loading** - Loads related data upfront
71. **Optimistic Locking** - Assumes conflicts are rare **(Interview Imp - Java)**
72. **Pessimistic Locking** - Locks data during access **(Interview Imp - Java)**
73. **Sharding** - Horizontal database partitioning
74. **Database per Service** - Each service has own database **(Interview Imp - Java)**

---

# **3. System Design Patterns**

## **Scalability Patterns**
75. **Load Balancer** - Distributes traffic across servers **(Interview Imp - Java)**
76. **Horizontal Scaling** - Add more machines **(Interview Imp - Java)**
77. **Vertical Scaling** - Add more resources to machine
78. **Database Replication** - Master-slave data copies **(Interview Imp - Java)**
79. **Database Sharding** - Partition data across databases **(Interview Imp - Java)**
80. **Caching** - Store frequently accessed data **(Interview Imp - Java)**
81. **CDN (Content Delivery Network)** - Geographically distributed content
82. **Read Replicas** - Separate read from write databases **(Interview Imp - Java)**
83. **Write-Through Cache** - Writes go through cache to DB
84. **Write-Back Cache** - Writes cached then async to DB
85. **Cache-Aside** - Application manages cache **(Interview Imp - Java)**
86. **Partitioning/Sharding** - Divide data into partitions

## **Reliability & Resilience Patterns**
87. **Circuit Breaker** - Prevents cascading failures **(Interview Imp - Java)**
88. **Retry** - Retries failed operations **(Interview Imp - Java)**
89. **Timeout** - Limits operation duration **(Interview Imp - Java)**
90. **Bulkhead** - Isolates resources to prevent total failure **(Interview Imp - Java)**
91. **Fallback** - Provides alternative when failure occurs **(Interview Imp - Java)**
92. **Rate Limiting** - Controls request rate **(Interview Imp - Java)**
93. **Throttling** - Limits resource consumption
94. **Health Check** - Monitors service health **(Interview Imp - Java)**
95. **Graceful Degradation** - Reduces functionality under load
96. **Failover** - Switches to backup on failure
97. **Redundancy** - Duplicate components for reliability
98. **Chaos Engineering** - Intentionally inject failures to test resilience

## **Performance Patterns**
99. **Caching Strategy** - Multiple cache levels **(Interview Imp - Java)**
100. **Lazy Loading** - Load resources on demand **(Interview Imp - Java)**
101. **Prefetching** - Load resources before needed
102. **Batching** - Group operations together
103. **Connection Pooling** - Reuse database connections **(Interview Imp - Java)**
104. **Asynchronous Processing** - Non-blocking operations **(Interview Imp - Java)**
105. **Compression** - Reduce data size
106. **Pagination** - Divide large datasets **(Interview Imp - Java)**
107. **Indexing** - Speed up data retrieval

## **Messaging & Communication Patterns**
108. **Message Queue** - Asynchronous message passing **(Interview Imp - Java)**
109. **Pub-Sub (Publish-Subscribe)** - Event-based messaging **(Interview Imp - Java)**
110. **Request-Reply** - Synchronous two-way communication
111. **Message Broker** - Intermediary for messages **(Interview Imp - Java)**
112. **Event Bus** - Centralized event distribution
113. **Message Channel** - Connects applications
114. **Message Router** - Routes messages to destinations
115. **Message Translator** - Converts message formats
116. **Content-Based Router** - Routes by message content
117. **Correlation Identifier** - Matches requests with responses
118. **Dead Letter Queue** - Handles failed messages **(Interview Imp - Java)**
119. **Idempotent Consumer** - Handles duplicate messages safely **(Interview Imp - Java)**

## **Data Management Patterns**
120. **CQRS** - Separate read/write models **(Interview Imp - Java)**
121. **Event Sourcing** - Store state as events **(Interview Imp - Java)**
122. **Saga Pattern** - Manages distributed transactions **(Interview Imp - Java)**
123. **Two-Phase Commit** - Distributed transaction protocol **(Interview Imp - Java)**
124. **Eventual Consistency** - Data becomes consistent over time **(Interview Imp - Java)**
125. **Strong Consistency** - Immediate consistency guarantee **(Interview Imp - Java)**
126. **CAP Theorem** - Consistency, Availability, Partition tolerance tradeoff **(Interview Imp - Java)**
127. **BASE** - Basically Available, Soft state, Eventual consistency **(Interview Imp - Java)**
128. **Materialized View** - Precomputed query results
129. **Change Data Capture (CDC)** - Tracks database changes
130. **Data Lake** - Centralized repository for raw data
131. **Data Warehouse** - Structured data for analytics

## **Security Patterns**
132. **Authentication** - Verify identity **(Interview Imp - Java)**
133. **Authorization** - Control access **(Interview Imp - Java)**
134. **OAuth 2.0** - Delegated authorization **(Interview Imp - Java)**
135. **JWT (JSON Web Token)** - Stateless authentication **(Interview Imp - Java)**
136. **API Gateway** - Single entry point with security **(Interview Imp - Java)**
137. **Secret Management** - Secure credential storage
138. **Encryption at Rest** - Encrypt stored data
139. **Encryption in Transit** - Encrypt data transmission
140. **Rate Limiting** - Prevent abuse **(Interview Imp - Java)**
141. **CORS (Cross-Origin Resource Sharing)** - Control cross-origin requests
142. **CSRF Protection** - Prevent cross-site request forgery
143. **SQL Injection Prevention** - Parameterized queries **(Interview Imp - Java)**

## **Distributed System Patterns**
144. **Distributed Cache** - Cache across multiple nodes **(Interview Imp - Java)**
145. **Consensus Algorithms** - Agreement in distributed systems (Paxos, Raft) **(Interview Imp - Java)**
146. **Leader Election** - Choose coordinator in distributed system **(Interview Imp - Java)**
147. **Gossip Protocol** - Peer-to-peer information dissemination
148. **Quorum** - Majority-based decision making **(Interview Imp - Java)**
149. **Vector Clocks** - Track causality in distributed systems
150. **Consistent Hashing** - Distribute data with minimal reshuffling **(Interview Imp - Java)**
151. **Service Mesh** - Infrastructure layer for service communication **(Interview Imp - Java)**
152. **Sidecar Pattern** - Deploy helper alongside main container **(Interview Imp - Java)**
153. **Ambassador Pattern** - Proxy for external services
154. **Anti-Corruption Layer** - Isolates legacy systems

## **API Design Patterns**
155. **REST** - Representational State Transfer **(Interview Imp - Java)**
156. **GraphQL** - Query language for APIs **(Interview Imp - Java)**
157. **gRPC** - High-performance RPC framework **(Interview Imp - Java)**
158. **WebSocket** - Full-duplex communication **(Interview Imp - Java)**
159. **Webhook** - Event-driven HTTP callbacks
160. **API Gateway** - Centralized API management **(Interview Imp - Java)**
161. **Backend for Frontend (BFF)** - Separate backends per client type **(Interview Imp - Java)**
162. **API Versioning** - Manage API changes **(Interview Imp - Java)**
163. **Pagination** - Divide large result sets **(Interview Imp - Java)**
164. **Filtering & Sorting** - Query customization
165. **HATEOAS** - Hypermedia as engine of application state

## **Deployment & DevOps Patterns**
166. **Blue-Green Deployment** - Two production environments **(Interview Imp - Java)**
167. **Canary Deployment** - Gradual rollout to subset **(Interview Imp - Java)**
168. **Rolling Deployment** - Incremental updates
169. **A/B Testing** - Compare two versions
170. **Feature Flags** - Toggle features on/off **(Interview Imp - Java)**
171. **Infrastructure as Code** - Manage infrastructure via code
172. **Immutable Infrastructure** - Replace rather than modify
173. **Container Orchestration** - Manage containerized applications **(Interview Imp - Java)**
174. **Service Discovery** - Automatically locate services **(Interview Imp - Java)**
175. **Configuration Management** - Centralized config storage **(Interview Imp - Java)**

## **Monitoring & Observability**
176. **Logging** - Record system events **(Interview Imp - Java)**
177. **Metrics** - Quantitative measurements **(Interview Imp - Java)**
178. **Tracing** - Track request flow **(Interview Imp - Java)**
179. **Alerting** - Notify on issues
180. **Distributed Tracing** - Track across services **(Interview Imp - Java)**
181. **Health Checks** - Monitor service status **(Interview Imp - Java)**
182. **Synthetic Monitoring** - Proactive testing

## **Concurrency Patterns**
183. **Thread Pool** - Reuse worker threads **(Interview Imp - Java)**
184. **Producer-Consumer** - Coordinate producers and consumers **(Interview Imp - Java)**
185. **Read-Write Lock** - Concurrent reads, exclusive writes **(Interview Imp - Java)**
186. **Monitor Object** - Synchronize concurrent access **(Interview Imp - Java)**
187. **Active Object** - Decouple execution from invocation
188. **Future/Promise** - Placeholder for async result **(Interview Imp - Java)**
189. **Actor Model** - Isolated concurrent entities
190. **Lock-Free Data Structures** - Non-blocking concurrent access

---

# **4. Additional Specialized Patterns**

## **Cloud-Native Patterns**
191. **Strangler Fig** - Gradually replace legacy system **(Interview Imp - Java)**
192. **Backends for Frontends (BFF)** - Separate backend per UI
193. **External Configuration Store** - Centralized config management **(Interview Imp - Java)**
194. **Gatekeeper** - Security validation at entry point
195. **Valet Key** - Direct access tokens for resources
196. **Static Content Hosting** - Serve static files from storage
197. **Gateway Routing** - Route requests to multiple services
198. **Gateway Aggregation** - Aggregate multiple requests **(Interview Imp - Java)**
199. **Gateway Offloading** - Offload shared functionality to gateway
200. **Claim Check** - Store large messages, pass reference
201. **Choreography** - Decentralized service coordination **(Interview Imp - Java)**
202. **Competing Consumers** - Multiple consumers process messages
203. **Priority Queue** - Process high-priority items first **(Interview Imp - Java)**
204. **Queue-Based Load Leveling** - Smooth out load spikes **(Interview Imp - Java)**
205. **Scheduler Agent Supervisor** - Coordinate distributed actions
206. **Sequential Convoy** - Process related messages in order
207. **Pipes and Filters** - Chain processing steps
208. **Compensating Transaction** - Undo failed operations **(Interview Imp - Java)**
209. **Materialized View** - Pre-computed query results
210. **Index Table** - Optimize queries with indexes
211. **Sharding** - Partition data horizontally **(Interview Imp - Java)**
212. **Throttling** - Limit resource usage **(Interview Imp - Java)**
213. **Retry with Exponential Backoff** - Gradually increase retry delay **(Interview Imp - Java)**
214. **Geode** - Deploy close to users geographically
215. **Deployment Stamps** - Deploy multiple independent copies
216. **Anti-Corruption Layer** - Translate between subsystems

## **Microservices Patterns**
217. **Service Registry** - Central service location registry **(Interview Imp - Java)**
218. **Client-Side Discovery** - Client queries registry
219. **Server-Side Discovery** - Router queries registry
220. **Self Registration** - Service registers itself **(Interview Imp - Java)**
221. **Third-Party Registration** - External registrar
222. **Database per Service** - Each service owns its database **(Interview Imp - Java)**
223. **Shared Database** - Multiple services share database (anti-pattern)
224. **Saga** - Manage distributed transactions **(Interview Imp - Java)**
225. **API Composition** - Combine multiple service calls **(Interview Imp - Java)**
226. **Access Token** - Secure inter-service communication **(Interview Imp - Java)**
227. **Externalized Configuration** - Config outside codebase **(Interview Imp - Java)**
228. **Remote Procedure Invocation** - Synchronous communication
229. **Messaging** - Asynchronous communication **(Interview Imp - Java)**
230. **Domain Event** - Publish domain changes **(Interview Imp - Java)**
231. **Event-Driven** - React to events **(Interview Imp - Java)**
232. **Transactional Outbox** - Reliable event publishing **(Interview Imp - Java)**
233. **Transaction Log Tailing** - Read database transaction log
234. **Polling Publisher** - Poll for changes to publish
235. **Application Metrics** - Monitor service health **(Interview Imp - Java)**
236. **Audit Logging** - Track user actions **(Interview Imp - Java)**
237. **Distributed Tracing** - Trace across services **(Interview Imp - Java)**
238. **Exception Tracking** - Centralized error tracking **(Interview Imp - Java)**
239. **Health Check API** - Expose health endpoint **(Interview Imp - Java)**
240. **Log Aggregation** - Centralize logs **(Interview Imp - Java)**
241. **Microservice Chassis** - Framework for common concerns
242. **Service Template** - Standardized service structure
243. **Sidecar** - Co-locate helper process **(Interview Imp - Java)**
244. **Service Mesh** - Infrastructure layer for communication **(Interview Imp - Java)**

## **Data Patterns (Extended)**
245. **Command Sourcing** - Store commands instead of state
246. **Snapshot** - Periodic state snapshots with events **(Interview Imp - Java)**
247. **Polyglot Persistence** - Different databases for different needs **(Interview Imp - Java)**
248. **Multi-tenancy** - Single instance serves multiple tenants **(Interview Imp - Java)**
249. **Database Sharding** - Horizontal partitioning **(Interview Imp - Java)**
250. **Database Federation** - Split by function
251. **Denormalization** - Duplicate data for performance **(Interview Imp - Java)**
252. **Read-Through Cache** - Cache loads on miss
253. **Write-Through Cache** - Synchronous cache update **(Interview Imp - Java)**
254. **Write-Behind Cache** - Asynchronous cache update **(Interview Imp - Java)**
255. **Refresh-Ahead Cache** - Proactive cache refresh
256. **Distributed Cache** - Cache across nodes **(Interview Imp - Java)**
257. **Near Cache** - Local cache close to application
258. **In-Memory Database** - Store data in RAM **(Interview Imp - Java)**
259. **Column-Family Store** - NoSQL wide-column store
260. **Document Store** - NoSQL document database **(Interview Imp - Java)**
261. **Key-Value Store** - NoSQL key-value database **(Interview Imp - Java)**
262. **Graph Database** - Store relationships as first-class **(Interview Imp - Java)**
263. **Time-Series Database** - Optimized for time-stamped data
264. **Search Engine** - Full-text search optimization **(Interview Imp - Java)**
265. **Bloom Filter** - Probabilistic data structure
266. **Count-Min Sketch** - Frequency estimation
267. **HyperLogLog** - Cardinality estimation

## **Integration Patterns**
268. **File Transfer** - Exchange data via files
269. **Shared Database** - Multiple apps use same DB
270. **Remote Procedure Call** - Direct method invocation **(Interview Imp - Java)**
271. **Messaging** - Asynchronous message exchange **(Interview Imp - Java)**
272. **Point-to-Point Channel** - One-to-one communication
273. **Publish-Subscribe Channel** - One-to-many communication **(Interview Imp - Java)**
274. **Datatype Channel** - Channel per data type
275. **Invalid Message Channel** - Handle malformed messages
276. **Dead Letter Channel** - Handle undeliverable messages **(Interview Imp - Java)**
277. **Guaranteed Delivery** - Ensure message delivery **(Interview Imp - Java)**
278. **Channel Adapter** - Connect application to channel
279. **Message Bridge** - Connect different messaging systems
280. **Message Bus** - Centralized message infrastructure **(Interview Imp - Java)**
281. **Message Dispatcher** - Distribute to multiple consumers
282. **Selective Consumer** - Filter messages
283. **Durable Subscriber** - Receive missed messages **(Interview Imp - Java)**
284. **Idempotent Receiver** - Handle duplicate messages **(Interview Imp - Java)**
285. **Service Activator** - Invoke service via message
286. **Messaging Gateway** - Encapsulate messaging code
287. **Transactional Client** - Message within transaction **(Interview Imp - Java)**
288. **Polling Consumer** - Pull messages actively
289. **Event-Driven Consumer** - Push messages reactively **(Interview Imp - Java)**
290. **Message Expiration** - Time-limited messages
291. **Format Indicator** - Specify message format
292. **Canonical Data Model** - Common data format
293. **Envelope Wrapper** - Add metadata to message
294. **Content Enricher** - Add data to message
295. **Content Filter** - Remove unnecessary data
296. **Claim Check** - Store payload, pass reference
297. **Normalizer** - Convert to standard format
298. **Splitter** - Break message into parts
299. **Aggregator** - Combine related messages **(Interview Imp - Java)**
300. **Resequencer** - Restore message order
301. **Composed Message Processor** - Complex message processing
302. **Scatter-Gather** - Broadcast and collect responses
303. **Routing Slip** - Dynamic message routing
304. **Process Manager** - Complex workflow coordination
305. **Message Store** - Persist messages

## **Testing Patterns**
306. **Mock Object** - Simulated object for testing **(Interview Imp - Java)**
307. **Stub** - Predefined responses **(Interview Imp - Java)**
308. **Fake** - Simplified working implementation **(Interview Imp - Java)**
309. **Spy** - Records method calls **(Interview Imp - Java)**
310. **Dummy** - Placeholder object
311. **Test Double** - Generic test replacement **(Interview Imp - Java)**
312. **Builder Pattern for Tests** - Construct test data **(Interview Imp - Java)**
313. **Object Mother** - Factory for test objects
314. **Test Data Builder** - Fluent test data creation **(Interview Imp - Java)**
315. **Fixture** - Known test environment **(Interview Imp - Java)**
316. **Back Door Manipulation** - Direct state setup
317. **Layered Tests** - Unit, integration, E2E hierarchy **(Interview Imp - Java)**
318. **Subcutaneous Test** - Test below UI
319. **Contract Test** - Verify service contracts **(Interview Imp - Java)**
320. **Consumer-Driven Contract** - Consumer specifies contract **(Interview Imp - Java)**
321. **Test Pyramid** - More unit tests, fewer E2E **(Interview Imp - Java)**
322. **Test Trophy** - Focus on integration tests
323. **Mutation Testing** - Test quality of tests
324. **Property-Based Testing** - Generate test cases
325. **Snapshot Testing** - Compare against saved output
326. **Golden Master Testing** - Compare against known good output
327. **Chaos Testing** - Test resilience with failures **(Interview Imp - Java)**
328. **Canary Testing** - Test with subset of users
329. **Smoke Testing** - Basic functionality verification **(Interview Imp - Java)**
330. **Regression Testing** - Verify no existing breakage **(Interview Imp - Java)**

## **Security Patterns (Extended)**
331. **Defense in Depth** - Multiple security layers **(Interview Imp - Java)**
332. **Principle of Least Privilege** - Minimal necessary access **(Interview Imp - Java)**
333. **Separation of Duties** - Divide critical tasks
334. **Zero Trust** - Never trust, always verify **(Interview Imp - Java)**
335. **Secure by Default** - Default to secure configuration
336. **Fail Securely** - Fail to secure state
337. **Input Validation** - Validate all input **(Interview Imp - Java)**
338. **Output Encoding** - Encode output properly **(Interview Imp - Java)**
339. **Parameterized Queries** - Prevent SQL injection **(Interview Imp - Java)**
340. **Stored Procedures** - Encapsulate database logic
341. **Password Hashing** - One-way password storage **(Interview Imp - Java)**
342. **Salt** - Randomize password hashes **(Interview Imp - Java)**
343. **Multi-Factor Authentication** - Multiple verification steps **(Interview Imp - Java)**
344. **Single Sign-On (SSO)** - One login for multiple systems **(Interview Imp - Java)**
345. **Role-Based Access Control (RBAC)** - Permissions by role **(Interview Imp - Java)**
346. **Attribute-Based Access Control (ABAC)** - Permissions by attributes
347. **Capability-Based Security** - Unforgeable access tokens
348. **Security Token** - Proof of authentication **(Interview Imp - Java)**
349. **API Key** - Simple API authentication **(Interview Imp - Java)**
350. **Certificate-Based Authentication** - PKI authentication **(Interview Imp - Java)**
351. **Federated Identity** - Share identity across systems **(Interview Imp - Java)**
352. **Privacy by Design** - Build in privacy from start
353. **Data Masking** - Hide sensitive data **(Interview Imp - Java)**
354. **Tokenization** - Replace sensitive data with tokens
355. **Homomorphic Encryption** - Compute on encrypted data
356. **Secure Session Management** - Protect session data **(Interview Imp - Java)**
357. **HTTPS Only** - Force encrypted connections **(Interview Imp - Java)**
358. **Content Security Policy** - Prevent XSS attacks **(Interview Imp - Java)**
359. **Clickjacking Protection** - Prevent UI redressing
360. **Security Headers** - HTTP headers for security **(Interview Imp - Java)**

## **UI/UX Patterns**
361. **Model-View-Intent (MVI)** - Unidirectional data flow
362. **Flux** - Unidirectional data flow
363. **Redux** - Centralized state management
364. **Component-Based Architecture** - Reusable UI components
365. **Container-Presenter** - Separate logic from presentation
366. **Smart/Dumb Components** - Stateful vs stateless
367. **Higher-Order Components** - Component wrappers
368. **Render Props** - Share code via props
369. **Hooks Pattern** - Reusable stateful logic
370. **Virtual DOM** - Efficient DOM updates
371. **Server-Side Rendering** - Render on server
372. **Static Site Generation** - Pre-render at build time
373. **Progressive Enhancement** - Start basic, enhance
374. **Graceful Degradation** - Start full, fall back
375. **Responsive Design** - Adapt to screen size
376. **Mobile-First** - Design for mobile first
377. **Atomic Design** - Component hierarchy (atoms, molecules, organisms)
378. **Micro-Frontends** - Independent frontend modules
379. **Islands Architecture** - Interactive components in static pages

## **Performance Patterns (Extended)**
380. **Memoization** - Cache function results **(Interview Imp - Java)**
381. **Debouncing** - Delay execution until pause
382. **Throttling** - Limit execution frequency **(Interview Imp - Java)**
383. **Virtual Scrolling** - Render visible items only
384. **Code Splitting** - Load code on demand
385. **Tree Shaking** - Remove unused code
386. **Minification** - Reduce code size
387. **Bundle Splitting** - Separate code bundles
388. **Critical CSS** - Inline critical styles
389. **Resource Hints** - Preload, prefetch, preconnect
390. **HTTP/2 Server Push** - Proactively send resources
391. **Multiplexing** - Multiple requests over one connection
392. **Keep-Alive** - Reuse TCP connections **(Interview Imp - Java)**
393. **Conditional Requests** - Cache validation
394. **ETags** - Cache validation tokens **(Interview Imp - Java)**
395. **Compression (Gzip, Brotli)** - Compress responses **(Interview Imp - Java)**
396. **Image Optimization** - Optimize image delivery
397. **Lazy Loading Images** - Load images on demand
398. **Progressive Image Loading** - Load low-res first
399. **WebP Format** - Modern image format
400. **Video Streaming** - Adaptive bitrate streaming

## **Blockchain & Distributed Ledger Patterns**
401. **Proof of Work** - Consensus via computation
402. **Proof of Stake** - Consensus via stake
403. **Smart Contract** - Self-executing contract
404. **Token** - Digital asset representation
405. **Oracle Pattern** - External data into blockchain
406. **State Channel** - Off-chain transactions
407. **Sidechain** - Separate blockchain linked to main
408. **Multi-Signature** - Multiple approvals required
409. **Merkle Tree** - Efficient data verification
410. **Byzantine Fault Tolerance** - Tolerate malicious nodes

## **AI/ML Patterns**
411. **Model-View-Controller for ML** - Separate model, serving, UI
412. **Batch Prediction** - Process in batches
413. **Online Prediction** - Real-time predictions
414. **A/B Testing Models** - Compare model performance
415. **Shadow Mode** - Run new model alongside old
416. **Canary Model Deployment** - Gradual model rollout
417. **Multi-Armed Bandit** - Explore vs exploit tradeoff
418. **Feature Store** - Centralized feature management
419. **Model Registry** - Track model versions
420. **Pipeline Pattern** - ML workflow orchestration
421. **Ensemble** - Combine multiple models
422. **Transfer Learning** - Reuse pre-trained models
423. **Federated Learning** - Train across decentralized data
424. **Active Learning** - Strategically select training data
425. **Data Versioning** - Track dataset changes
426. **Model Monitoring** - Track model performance in production
427. **Concept Drift Detection** - Detect distribution changes

## **IoT Patterns**
428. **Device Gateway** - Manage device connections
429. **Protocol Translation** - Convert between protocols
430. **Device Shadow** - Virtual representation of device
431. **Command Pattern for IoT** - Send commands to devices
432. **Telemetry** - Collect device data
433. **Device Twin** - State synchronization
434. **Edge Computing** - Process at edge devices
435. **Fog Computing** - Intermediate layer between edge and cloud

## **Game Development Patterns**
436. **Game Loop** - Main game execution cycle
437. **Update Method** - Frame-by-frame updates
438. **Component Pattern** - Entity composed of components
439. **Entity-Component-System (ECS)** - Data-oriented design
440. **Double Buffer** - Swap buffers for smooth rendering
441. **Dirty Flag** - Track changed state
442. **Object Pool** - Reuse game objects **(Interview Imp - Java)**
443. **Spatial Partition** - Optimize collision detection
444. **Service Locator** - Access global services
445. **Data Locality** - Optimize cache usage
446. **State Pattern for AI** - Character AI states
447. **Behavior Tree** - Hierarchical AI decisions
448. **Steering Behaviors** - Movement patterns

## **Domain-Specific Patterns**
449. **Healthcare HL7** - Healthcare data exchange
450. **Financial Trading Patterns** - Order matching, settlement
451. **E-commerce Patterns** - Shopping cart, checkout, inventory **(Interview Imp - Java)**
452. **Booking Systems** - Reservation, availability
453. **Social Network Patterns** - Feed, follow, notifications
454. **Search Engine Patterns** - Crawling, indexing, ranking
455. **Recommendation Systems** - Collaborative filtering, content-based
456. **Payment Gateway** - Payment processing integration **(Interview Imp - Java)**
457. **Multi-Currency** - Handle multiple currencies
458. **Geospatial Patterns** - Location-based services
459. **Time-Zone Handling** - Manage time zones **(Interview Imp - Java)**
460. **Internationalization (i18n)** - Multi-language support **(Interview Imp - Java)**
461. **Localization (l10n)** - Region-specific adaptation

## **Legacy & Migration Patterns**
462. **Strangler Fig** - Gradually replace legacy **(Interview Imp - Java)**
463. **Branch by Abstraction** - Refactor without breaking
464. **Parallel Run** - Run old and new systems together **(Interview Imp - Java)**
465. **Dark Launch** - Deploy without exposing to users
466. **Feature Toggle** - Switch between implementations **(Interview Imp - Java)**
467. **Database Migration** - Evolve database schema **(Interview Imp - Java)**
468. **Expand-Contract** - Add new, migrate, remove old
469. **Facade for Legacy** - Modern interface to legacy system
470. **Anti-Corruption Layer** - Protect from legacy issues **(Interview Imp - Java)**

---

## **Summary**

### **Pattern Count by Category:**
- **LLD (Low-Level Design)**: 26 patterns
- **HLD (High-Level Design)**: 48 patterns
- **System Design**: 116 patterns
- **Additional Specialized**: 280 patterns

### **Total: 470+ Design Patterns**

### **Java Interview Focus:**
The patterns marked with **(Interview Imp - Java)** are frequently asked in Java technical interviews, especially for:
- **Junior/Mid-Level**: Focus on GoF patterns (Singleton, Factory, Builder, Adapter, Decorator, Observer, Strategy, etc.)
- **Senior Level**: Microservices patterns, Distributed systems, Concurrency, Caching, Circuit Breaker, SAGA, CQRS
- **Architect Level**: System design patterns, Scalability, Resilience, Event Sourcing, Domain-Driven Design

### **Study Recommendations for Java Interviews:**
1. **Master all 23 GoF patterns** with Java implementations
2. **Understand Spring Framework patterns**: Dependency Injection, Proxy, Template Method, Factory
3. **Learn Microservices patterns**: Circuit Breaker, API Gateway, Service Discovery, SAGA
4. **Study Concurrency**: Thread Pool, Producer-Consumer, Read-Write Locks, CompletableFuture
5. **Practice System Design**: Caching strategies, Database sharding, Load balancing, Message queues

---

## **Beyond the Pattern List: Principles, Practice and Interview Guides**

Patterns are only part of design work. These guides cover what the list above doesn't:

| Guide | What it covers |
|---|---|
| [Design Principles and Anti-Patterns](01_LLD/05_Design_Principles_and_Anti_Patterns.md) | SOLID, DRY/KISS/YAGNI, coupling and cohesion, composition over inheritance, Law of Demeter, GRASP, code smells, refactoring, anti-patterns **(Interview Imp - Java)** |
| [LLD Interview Problems](01_LLD/06_LLD_Interview_Problems.md) | Machine-coding round: parking lot, elevator, Splitwise, movie booking, vending machine, LRU cache, tic-tac-toe, snake & ladder **(Interview Imp - Java)** |
| [Architecture Practice](02_HLD/03_Architecture_Practice.md) | Quality attributes/NFRs, trade-off analysis, ADRs, C4 and UML diagrams, technical debt, fitness functions |
| [System Design Interview Playbook](03_System_Design/12_System_Design_Interview_Playbook.md) | The interview method, estimation, and case studies: URL shortener, rate limiter, chat, notifications, video streaming, key-value store **(Interview Imp - Java)** |

---

**Note**: This list continues to evolve as new patterns emerge in cloud-native, serverless, edge computing, and other modern architectures!
