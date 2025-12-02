"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_TRACKING_ID, pageview } from "@/lib/analytics";

function AnalyticsScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevUrlRef = useRef<string>("");
  const prevSearchStringRef = useRef<string>("");

  // Convert searchParams to string once - this is the actual value we care about
  // We'll compare this string value to detect real changes, not object reference changes
  const currentSearchString = searchParams?.toString() || "";

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Only proceed if search string actually changed (not just object reference)
    const searchStringChanged = currentSearchString !== prevSearchStringRef.current;
    
    if (searchStringChanged) {
      prevSearchStringRef.current = currentSearchString;
    }

    // Construct URL (toString() called only once above, reused here)
    const url = pathname + (currentSearchString ? `?${currentSearchString}` : "");

    // Only send pageview if URL actually changed to prevent duplicate events
    if (url !== prevUrlRef.current) {
      prevUrlRef.current = url;
      pageview(url);
    }
    // Depend on pathname and the actual string value, not the searchParams object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentSearchString]);

  return null;
}

export default function Analytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsScript />
      </Suspense>
    </>
  );
}

