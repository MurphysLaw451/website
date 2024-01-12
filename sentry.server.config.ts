import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7ca4a022691941139a3907b7a2363071@o1354736.ingest.sentry.io/4505218284388352",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});