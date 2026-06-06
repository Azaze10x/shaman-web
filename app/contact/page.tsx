"use client";

import { FormEvent, useEffect, useState } from "react";

const WEB3FORMS_ACTION = "https://api.web3forms.com/submit";
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://shamantech.co";

export default function ContactPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const configured = Boolean(accessKey);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      setShowSuccess(true);
      window.history.replaceState({}, "", "/contact");
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!configured) {
      event.preventDefault();
      return;
    }

    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const subjectField = form.elements.namedItem("subject") as HTMLInputElement;
    subjectField.value = name
      ? `Shaman Tech — message from ${name}`
      : "Shaman Tech — contact form";
  }

  return (
    <div className="w-full flex flex-col gap-margin lg:flex-row min-h-[716px]">
      <section className="w-full lg:w-2/3 flex flex-col gap-margin">
        <header className="border-b-4 border-on-surface pb-unit">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 uppercase">
            Open Channel
          </h1>
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-secondary"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
            COMM LINK ACTIVE // ENTER TRANSMISSION DATA
          </p>
        </header>

        <div className="bg-on-primary-fixed border-4 border-on-surface brutalist-card p-gutter flex flex-col relative overflow-hidden flex-1">
          <div className="absolute inset-0 opacity-10 pointer-events-none dither-bg" />
          <div className="bg-secondary text-on-secondary font-label-sm text-label-sm p-2 border-b-2 border-on-surface mb-gutter uppercase tracking-widest inline-block w-fit relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 inline align-middle mr-2"
            >
              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
            </svg>
            RECORD ENTRY
          </div>
          <form
            className="flex flex-col gap-margin relative z-10"
            action={configured ? WEB3FORMS_ACTION : undefined}
            method="POST"
            onSubmit={handleSubmit}
          >
            {configured ? (
              <>
                <input type="hidden" name="access_key" value={accessKey} />
                <input type="hidden" name="subject" value="Shaman Tech — contact form" />
                <input
                  type="hidden"
                  name="redirect"
                  value={`${siteUrl}/contact?success=1`}
                />
              </>
            ) : null}
            <div
              className={`flex flex-col gap-unit relative overflow-hidden group ${
                focusedField === "name" ? "blinking-cursor" : ""
              }`}
            >
              <div className="static-noise-overlay" />
              <label className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase relative z-10">
                PLAYER_NAME
              </label>
              <input
                className="bg-transparent border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-primary-fixed font-body-md text-body-md uppercase p-2 placeholder:text-outline-variant/50 focus:outline-none relative z-10"
                placeholder="ENTER INITIALS..."
                type="text"
                name="name"
                required
                disabled={!configured}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div
              className={`flex flex-col gap-unit relative overflow-hidden group ${
                focusedField === "email" ? "blinking-cursor" : ""
              }`}
            >
              <div className="static-noise-overlay" />
              <label className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase relative z-10">
                COMM_LINK
              </label>
              <input
                className="bg-transparent border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-primary-fixed font-body-md text-body-md uppercase p-2 placeholder:text-outline-variant/50 focus:outline-none relative z-10"
                placeholder="EMAIL@DOMAIN.COM"
                type="email"
                name="email"
                required
                disabled={!configured}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div
              className={`flex flex-col gap-unit relative overflow-hidden group ${
                focusedField === "message" ? "blinking-cursor" : ""
              }`}
            >
              <div className="static-noise-overlay" />
              <label className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase relative z-10">
                TRANSMISSION
              </label>
              <textarea
                className="bg-inverse-surface border-2 border-outline focus:border-secondary focus:ring-0 text-inverse-on-surface font-body-md text-body-md uppercase p-4 mt-2 placeholder:text-outline-variant/50 focus:outline-none relative z-10"
                placeholder="TYPE MESSAGE HERE..."
                rows={4}
                name="message"
                required
                disabled={!configured}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            {showSuccess ? (
              <p className="font-label-sm text-label-sm text-secondary uppercase border-l-4 border-secondary pl-4">
                &gt; TRANSMISSION RECEIVED. WE WILL REPLY VIA YOUR COMM LINK.
              </p>
            ) : null}
            {!configured ? (
              <p className="font-label-sm text-label-sm text-error uppercase border-l-4 border-error pl-4">
                &gt; COMM RELAY OFFLINE. CONTACT BHOKAI@SHAMANTECH.CO DIRECTLY.
              </p>
            ) : null}
            <div className="mt-4 flex justify-end">
              <button
                className="bg-secondary text-on-secondary font-label-sm text-label-sm uppercase px-8 py-4 border-2 border-on-surface shadow-[4px_4px_0px_0px_rgb(var(--c-shadow))] hover:bg-secondary-container active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 group animate-transmit disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={!configured}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 group-active:text-on-surface"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                TRANSMIT DATA
              </button>
            </div>
          </form>
        </div>
      </section>

      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="bg-on-surface border-4 border-outline text-on-primary dark:bg-surface-container dark:text-on-surface h-full flex flex-col hard-shadow relative">
          <div className="bg-outline text-on-surface px-4 py-2 flex justify-between items-center border-b-4 border-outline-variant relative z-30">
            <span className="font-label-sm text-label-sm uppercase font-bold">
              Terminal_03 // COMMS
            </span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-secondary rounded-none border border-on-surface" />
              <div className="w-3 h-3 bg-surface rounded-none border border-on-surface" />
            </div>
          </div>
          <div className="p-6 flex flex-col gap-6 flex-1 crt-screen relative overflow-hidden">
            <div className="absolute inset-0 terminal-scanlines pointer-events-none z-20" />
            <div className="relative z-10 flex flex-col gap-margin flex-1">
              <div className="border-b-2 border-outline-variant pb-4">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-secondary uppercase tracking-tighter">
                  HARDWARE SPECS
                </h2>
                <p className="font-label-sm text-label-sm text-outline mt-1">
                  SYS.VER // SHMN-COM-01
                </p>
              </div>
              <div className="flex items-start gap-4 border-b-2 border-outline-variant pb-4 border-dashed reveal-item">
                <div className="bg-primary-container p-2 border-2 border-on-surface shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-on-surface"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-label-sm text-label-sm text-primary-fixed uppercase mb-unit">
                    SECTOR [LOCATION]
                  </h3>
                  <p className="font-body-md text-body-md text-outline">
                    BANGKOK, THAILAND
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b-2 border-outline-variant pb-4 border-dashed reveal-item">
                <div className="bg-primary-container p-2 border-2 border-on-surface shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-on-surface"
                    aria-hidden
                  >
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.82.42z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-label-sm text-label-sm text-primary-fixed uppercase mb-unit">
                    FREQ [TELEGRAM]
                  </h3>
                  <p className="font-body-md text-body-md text-outline">
                    <span className="text-on-surface-variant">Username </span>
                    <a
                      href="https://t.me/azaze10x"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-outline hover:text-secondary transition-colors"
                    >
                      @azaze10x
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 reveal-item">
                <div className="bg-primary-container p-2 border-2 border-on-surface shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-on-surface"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-label-sm text-label-sm text-primary-fixed uppercase mb-unit">
                    PING [EMAIL]
                  </h3>
                  <p className="font-body-md text-body-md text-outline">
                    BHOKAI@SHAMANTECH.CO
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <div className="bg-surface-variant h-4 w-full border-2 border-on-surface shadow-[2px_2px_0px_0px_rgb(var(--c-shadow))] overflow-hidden relative">
                  <div className="bg-secondary h-full animate-loading-bar w-0" />
                </div>
                <div className="flex gap-2 justify-end w-full mt-2">
                  <div className="w-2 h-2 bg-on-surface rounded-full" />
                  <div className="w-2 h-2 bg-on-surface rounded-full" />
                  <div className="w-2 h-2 bg-error rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
