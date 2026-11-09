package com.example.greeting;

import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.availability.AvailabilityChangeEvent;
import org.springframework.boot.availability.ReadinessState;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private static final Logger log = LoggerFactory.getLogger(GreetingController.class);

    private final AppProperties props;
    private final ApplicationContext context;
    private final List<byte[]> leak = new ArrayList<>();   // demo only: memory we never release

    public GreetingController(AppProperties props, ApplicationContext context) {
        this.props = props;
        this.context = context;
    }

    /** Imitates a slow start (cache warm-up, migrations...). Runs before the app reports "started". */
    @EventListener(ApplicationStartedEvent.class)
    public void slowStart() throws InterruptedException {
        if (props.startupDelayMs() > 0) {
            log.info("Simulating slow startup: sleeping {} ms", props.startupDelayMs());
            Thread.sleep(props.startupDelayMs());
        }
    }

    /** Normal endpoint: shows which Pod answered and that config/secret were injected. */
    @GetMapping("/hello")
    public Map<String, Object> hello() {
        return Map.of(
                "message", props.greeting(),
                "pod", System.getenv().getOrDefault("HOSTNAME", "local"),
                "dbPasswordSet", props.dbPassword() != null && !props.dbPassword().isBlank());
    }

    /** Slow request: used to prove graceful shutdown lets in-flight requests finish. */
    @GetMapping("/work")
    public Map<String, Object> work(@RequestParam(defaultValue = "5000") long ms) throws InterruptedException {
        log.info("Work request started ({} ms)", ms);
        Thread.sleep(ms);
        log.info("Work request finished");
        return Map.of("sleptMs", ms, "status", "done");
    }

    /** Shows the JVM's max heap, which depends on the container memory limit and MaxRAMPercentage. */
    @GetMapping("/jvm")
    public Map<String, Object> jvm() {
        Runtime rt = Runtime.getRuntime();
        return Map.of(
                "maxHeapMiB", rt.maxMemory() / (1024 * 1024),
                "availableProcessors", rt.availableProcessors(),
                "jvmArgs", ManagementFactory.getRuntimeMXBean().getInputArguments());
    }

    /** Demo only: keeps allocating memory so we can watch an OOM. Never ship this. */
    @PostMapping("/leak")
    public Map<String, Object> leak(@RequestParam(defaultValue = "50") int mb) {
        for (int i = 0; i < mb; i++) {
            leak.add(new byte[1024 * 1024]);
        }
        return Map.of("leakedMiB", leak.size());
    }

    /** Flip readiness by hand: the Pod stays alive but Kubernetes stops sending it traffic. */
    @PostMapping("/admin/readiness")
    public Map<String, Object> readiness(@RequestParam boolean ready) {
        AvailabilityChangeEvent.publish(context,
                ready ? ReadinessState.ACCEPTING_TRAFFIC : ReadinessState.REFUSING_TRAFFIC);
        return Map.of("readiness", ready ? "ACCEPTING_TRAFFIC" : "REFUSING_TRAFFIC");
    }
}
