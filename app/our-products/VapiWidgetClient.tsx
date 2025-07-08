"use client";
import { useEffect, useRef } from "react";

export default function VapiWidgetClient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = `<vapi-widget mode="voice" theme="dark" base-color="#000000" accent-color="#0085ff" button-base-color="#000000" button-accent-color="#ffffff" radius="large" size="full" position="bottom-left" main-label="TALK WITH AI" start-button-text="Start" end-button-text="End Call" require-consent="true" local-storage-key="vapi_widget_consent" show-transcript="true" public-key="4e5401b6-d69d-4f4b-8d9a-bd6086ee0212" assistant-id="cf607223-43d0-4e59-b315-e82bb230915b"></vapi-widget>`;
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} />;
}
