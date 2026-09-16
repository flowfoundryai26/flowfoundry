import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-[75vh] items-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#E9E7FF] opacity-70 blur-[120px]" />

        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#E0F8FF] opacity-70 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[800px] px-5 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEFAF2] text-[#3D7A50]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              d="m5 13 4 4L19 7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="mt-8 inline-flex rounded-full bg-[#F0EEFF] px-4 py-2 text-xs font-semibold tracking-[0.15em] text-[#6161FF]">
          ENQUIRY RECEIVED
        </span>

        <h1 className="mt-6 text-4xl font-light tracking-[-0.04em] text-[#252830] sm:text-5xl">
          Thanks for reaching out.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#666C79] sm:text-lg">
          We've received your project enquiry. Our team will review the
          information you've shared and get in touch to discuss the next
          steps.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6161FF] px-6 text-sm font-semibold text-white transition-all hover:bg-[#5555EE]"
          >
            Back to Home

            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}