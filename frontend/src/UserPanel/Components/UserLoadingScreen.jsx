// src/components/LoadingScreen.jsx
import React from "react";
import Logo from "../../assets/alaminos-logos.png";

/**
 * LoadingScreen props:
 * - message: string (default: "Loading...")
 * - showLogo: boolean (default: true)
 * - progress: number | null (0-100). If provided shows a slim determinate bar.
 * - compact: boolean (default: false) -- slightly smaller layout
 */
const LoadingScreen = ({
  message = "Loading...",
  showLogo = true,
  progress = null,
  compact = false,
}) => {
  const sizeCls = compact
    ? "w-14 h-14 sm:w-16 sm:h-16"
    : "w-20 h-20 sm:w-24 sm:h-24";
  const textSize = compact ? "text-sm" : "text-base";

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-busy={progress === null ? "true" : "false"}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4 px-4">
        {showLogo && (
          <div
            className={`${sizeCls} rounded-full flex items-center justify-center bg-white shadow-sm ring-1 ring-teal-100`}
            aria-hidden="true"
          >
            <div className="rounded-full p-1.5 bg-white">
              <img
                src={Logo}
                alt="Alaminos logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {/* spinner */}
          <div
            className={`flex items-center justify-center ${
              compact ? "w-8 h-8" : "w-10 h-10"
            }`}
            aria-hidden="true"
          >
            <svg
              className="animate-spin-slow"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#e6eef0" /* very light gray */
                strokeWidth="6"
              />
              <path
                d="M45 25a20 20 0 0 0-20-20"
                stroke="#2ca58d" /* muted teal */
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="text-left">
            <p className={`${textSize} font-semibold text-gray-700`}>
              {message}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Preparing your dashboard…
            </p>

            {typeof progress === "number" &&
              progress >= 0 &&
              progress <= 100 && (
                <div className="mt-3 w-56 sm:w-64">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden ring-1 ring-gray-50">
                    <div
                      className="h-2 rounded-full transition-all duration-400 ease-out shadow-sm"
                      style={{
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, rgba(44,165,141,0.95), rgba(44,165,141,0.7))",
                      }}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-gray-500 flex items-center justify-between">
                    <span>Loading assets</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* slower, soft spin */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.1s linear infinite;
        }

        /* reduce animation for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-slow {
            animation: none;
          }
          .transition-all {
            transition: none !important;
          }
        }

        /* tiny tweak for the progress bar animation */
        .transition-all {
          transition-property: width, opacity, transform;
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
