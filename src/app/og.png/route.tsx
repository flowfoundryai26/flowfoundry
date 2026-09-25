import { ImageResponse } from "next/og";

/**
 * The social preview card, rendered on demand at /og.png.
 *
 * Previously og:image pointed at /images/logo.webp and twitter:image at
 * /images/og-image.webp — neither file existed, so every share rendered a
 * blank card. Generating it here means the URL can never 404 and the card
 * always matches the current brand.
 */
export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Cache hard at the edge — the output only changes when this file does.
export const revalidate = 86400;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0d14",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Grid field, faded toward the right — mirrors the site heroes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Single accent wash, low saturation. No neon, no purple. */}
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 620,
            height: 620,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(59,116,230,0.30) 0%, rgba(10,13,20,0) 68%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}
        >
          <div
            style={{
              width: 12,
              height: 44,
              background: "#3b74e6",
              borderRadius: 2,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 27,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              FlowFoundry
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.52)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: 7,
              }}
            >
              AI Solutions
            </div>
          </div>
        </div>

        {/* Statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            maxWidth: 940,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
            }}
          >
            Scale your business without scaling repetitive work.
          </div>
          <div
            style={{
              fontSize: 27,
              color: "rgba(255,255,255,0.74)",
              marginTop: 26,
              lineHeight: 1.45,
              maxWidth: 820,
            }}
          >
            AI agents, automation, custom software and integrations built around
            the way your business already works.
          </div>
        </div>

        {/* Capability rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
            fontSize: 17,
            color: "rgba(255,255,255,0.52)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {["AI Agents", "Automation", "Custom Software", "Integrations"].map(
            (label, i) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                {i > 0 ? (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.28)",
                    }}
                  />
                ) : null}
                <div>{label}</div>
              </div>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
