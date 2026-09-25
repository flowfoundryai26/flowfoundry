/**
 * Renders a JSON-LD graph. Server component — no client JS cost.
 *
 * Uses <script type="application/ld+json">, which browsers never execute, so
 * the only escaping that matters is preventing a "</script>" sequence inside a
 * string value from closing the tag early.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
