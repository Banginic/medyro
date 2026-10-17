"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) {
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");

    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div id="google_translate_element" />

      <style jsx global>{`
        /*
         * Hide Google's visible widget.
         *
         * IMPORTANT:
         * We don't use display:none on the select itself.
         * It must remain alive so our custom toggle can control it.
         */

        #google_translate_element {
          position: fixed !important;
          left: -9999px !important;
          top: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /*
         * Hide Google's generated gadget.
         */
        .goog-te-gadget {
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /*
         * Keep the select technically rendered.
         * Our custom button accesses this element.
         */
        .goog-te-combo {
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /*
         * Google translation banner.
         */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }

        /*
         * Prevent Google from moving the page.
         */
        body {
          top: 0 !important;
        }

        /*
         * Google tooltip/highlight.
         */
        .goog-tooltip {
          display: none !important;
        }

        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}