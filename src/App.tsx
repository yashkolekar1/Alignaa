import { useEffect, useRef, useState } from "react";
import { EnquiryForm } from "./components/EnquiryForm";
import { HeroMedia } from "./components/HeroMedia";
import { SiteHeader } from "./components/SiteHeader";
import { siteContent, type DesignOption } from "./data/content";

function DesignChooser({
  design,
  onChange,
  disabled = false,
}: {
  design: DesignOption;
  onChange: (value: DesignOption) => void;
  disabled?: boolean;
}) {
  return (
    <section className="design-chooser" aria-label="Homepage design options">
      <div className="content-width design-chooser-inner">
        <div>
          <span className="eyebrow">Choose a layout to preview</span>
          <p>Both options use the same content, price and enquiry flow.</p>
        </div>
        <div className="design-tabs" role="group" aria-label="Select a homepage design">
          <button
            type="button"
            className={design === "a" ? "is-selected" : ""}
            aria-pressed={design === "a"}
            disabled={disabled}
            onClick={() => onChange("a")}
          >
            <span>Option A</span>
            <small>Video first</small>
          </button>
          <button
            type="button"
            className={design === "b" ? "is-selected" : ""}
            aria-pressed={design === "b"}
            disabled={disabled}
            onClick={() => onChange("b")}
          >
            <span>Option B</span>
            <small>Clinical and structured</small>
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Hero({ design }: { design: DesignOption }) {
  return (
    <section className={`hero hero--${design}`} aria-labelledby="hero-title">
      <div className="hero-inner content-width">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-light">Clear aligner treatment</span>
          <h1 id="hero-title">{siteContent.heroTitle}</h1>
          <p>{siteContent.heroDescription}</p>
          <div className="hero-actions">
            <a className="button button-light" href="#enquiry">Request a Scan <span aria-hidden="true">↗</span></a>
            <a className="text-link text-link-light" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
          <span className="hero-subnote">One enquiry. The Alignaa team will guide the next steps.</span>
        </div>
        <HeroMedia />
      </div>
      {design === "a" && <div className="hero-index" aria-hidden="true">01 / 04 <span /> YOUR SMILE JOURNEY</div>}
    </section>
  );
}

function TreatmentOffer() {
  return (
    <section className="section treatment-section" aria-labelledby="treatment-title">
      <div className="content-width treatment-layout">
        <div className="treatment-art treatment-art--showcase" aria-label="Alignaa clear aligners in protective travel case">
          <div className="treatment-art-glow" aria-hidden="true" />
          <picture>
            <source srcSet="/assets/alignaa-treatment-case.webp" type="image/webp" />
            <img
              className="treatment-case-img"
              src="/assets/alignaa-treatment-case.png"
              alt="Alignaa custom clear aligners resting in periwinkle travel case"
              width="576"
              height="883"
              loading="lazy"
            />
          </picture>
          <div className="treatment-media-caption">
            <span className="media-status-dot" aria-hidden="true" />
            Alignaa Custom Case &amp; Aligners
          </div>
        </div>
        <div className="treatment-copy">
          <span className="eyebrow">A considered treatment journey</span>
          <h2 id="treatment-title">Aligner Treatment</h2>
          <p className="price-label">{siteContent.price}</p>
          <p className="muted-copy">The client PDF provides this starting price. Confirm the final package and applicable conditions before launch.</p>
          <ul className="inclusion-list">
            {siteContent.inclusions.map((item) => (
              <li key={item.title}>
                <span className="check-icon" aria-hidden="true">✓</span>
                <span><strong>{item.title}</strong><small>{item.note}</small></span>
              </li>
            ))}
          </ul>
          <p className="emi-note"><span aria-hidden="true">↗</span> EMI availability is being confirmed with Alignaa.</p>
          <a className="button" href="#enquiry">Request a Scan <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section" id="how-it-works" aria-labelledby="process-title">
      <div className="content-width">
        <SectionHeading
          kicker="A clear next step"
          title="How it works"
          text="Start with an enquiry. The Alignaa team will coordinate the next steps with you."
        />
        <ol className="process-list">
          {siteContent.steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <span className="process-illustration" aria-hidden="true"><i /><i /><i /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="section-footnote">Home scan availability and centre locations need client confirmation.</p>
      </div>
    </section>
  );
}

function ConcernIcon({ mark }: { mark: string }) {
  return (
    <span className="concern-icon" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <path d="M12 25c3-8 10-12 20-12s17 4 20 12M14 27c1 10 3 19 7 24 2 3 4 2 6-1l5-8 5 8c2 3 4 4 6 1 4-5 6-14 7-24" />
        <path d="M18 25c4 3 8 4 14 4s10-1 14-4" />
      </svg>
      <span>{mark}</span>
    </span>
  );
}

function ConcernsSection() {
  return (
    <section className="section concerns-section" aria-labelledby="concerns-title">
      <div className="content-width">
        <SectionHeading
          kicker="Common concerns"
          title="Every smile has its own story"
          text="Explore the concerns people bring to a dental professional. An assessment is needed to discuss what may be suitable for you."
        />
        <div className="concern-grid">
          {siteContent.concerns.map((concern) => (
            <article className="concern-card" key={concern.id}>
              <ConcernIcon mark={concern.mark} />
              <h3>{concern.title}</h3>
              <p>{concern.description}</p>
              <a className="card-link" href="#enquiry">Ask the Alignaa team <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="section-footnote">These categories do not indicate eligibility or provide a diagnosis.</p>
      </div>
    </section>
  );
}

function ResultsSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const isHorizontalDragRef = useRef(false);
  const isVerticalScrollRef = useRef(false);

  // Trackpad wheel accumulation and cooldown refs
  const wheelAccumulatorRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);
  const wheelResetTimeoutRef = useRef<number | null>(null);

  // 6 cards total: 2 sets of the 3 client-approved results with stable keys
  const carouselItems = [
    ...siteContent.results.map((r) => ({ ...r, uniqueKey: `${r.id}-a` })),
    ...siteContent.results.map((r) => ({ ...r, uniqueKey: `${r.id}-b` })),
  ];

  const total = carouselItems.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Trackpad two-finger horizontal swipe handling
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // If gesture is vertical, allow normal page scrolling without interruption
      if (absY >= absX) {
        return;
      }

      // Horizontal trackpad gesture: prevent browser back/forward history navigation
      e.preventDefault();

      const now = Date.now();
      // Cooldown protects against trackpad momentum bursts skipping multiple slides
      if (now < wheelCooldownUntilRef.current) {
        return;
      }

      wheelAccumulatorRef.current += e.deltaX;

      // Debounce timer to reset accumulator if user stops swiping
      if (wheelResetTimeoutRef.current !== null) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }
      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 200);

      const trackpadThreshold = 55; // Sensible gesture threshold

      if (wheelAccumulatorRef.current >= trackpadThreshold) {
        handleNext();
        wheelAccumulatorRef.current = 0;
        wheelCooldownUntilRef.current = now + 500;
      } else if (wheelAccumulatorRef.current <= -trackpadThreshold) {
        handlePrev();
        wheelAccumulatorRef.current = 0;
        wheelCooldownUntilRef.current = now + 500;
      }
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      stage.removeEventListener("wheel", handleWheel);
      if (wheelResetTimeoutRef.current !== null) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, [total]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(total - 1);
    }
  };

  // Shortest circular distance calculation
  const getDiff = (idx: number) => {
    let diff = idx - activeIndex;
    const half = total / 2;
    while (diff > half) diff -= total;
    while (diff <= -half) diff += total;
    return diff;
  };

  const getCardClass = (diff: number) => {
    if (diff === 0) return "is-center";
    if (diff === 1) return "is-right-1";
    if (diff === -1) return "is-left-1";
    if (diff === 2) return "is-right-2";
    if (diff === -2) return "is-left-2";
    return "is-hidden";
  };

  // Unified Pointer Events: Mouse and Touch Drag / Swipe Handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary mouse button (left click)
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isPointerDownRef.current = true;
    isHorizontalDragRef.current = false;
    isVerticalScrollRef.current = false;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    dragOffsetRef.current = 0;

    // For desktop mouse, capture immediately and start dragging
    if (e.pointerType === "mouse") {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      isHorizontalDragRef.current = true;
      setIsDragging(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;

    // Disambiguate between vertical page scrolling and horizontal swipe on touch devices
    if (!isHorizontalDragRef.current && !isVerticalScrollRef.current) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
        isVerticalScrollRef.current = true;
        return;
      }
      if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dx) > 7) {
        isHorizontalDragRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        setIsDragging(true);
      }
    }

    if (isHorizontalDragRef.current) {
      // Natural drag displacement with subtle elastic resistance beyond 260px
      const maxDisplacement = 260;
      let dampedDx = dx;
      if (Math.abs(dx) > maxDisplacement) {
        const excess = Math.abs(dx) - maxDisplacement;
        dampedDx = (dx > 0 ? 1 : -1) * (maxDisplacement + Math.pow(excess, 0.72));
      }

      dragOffsetRef.current = dx;
      setDragOffset(dampedDx);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}

    if (isHorizontalDragRef.current) {
      const finalDelta = dragOffsetRef.current;
      const swipeThreshold = 45; // Pixels needed to advance to next/prev card

      if (finalDelta < -swipeThreshold) {
        handleNext();
      } else if (finalDelta > swipeThreshold) {
        handlePrev();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
    isHorizontalDragRef.current = false;
    isVerticalScrollRef.current = false;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  return (
    <section className="section results-section" id="results" aria-labelledby="results-title">
      <div className="content-width">
        <div className="results-header-row">
          <div className="results-heading-block">
            <span className="results-eyebrow">Real Transformations</span>
            <h2 id="results-title" className="results-title">Real Smiles. Real Transformations.</h2>
            <p className="results-subtitle">See the difference a confident smile can make.</p>
          </div>
          <div className="results-nav-controls" role="group" aria-label="Slider navigation controls">
            <button
              type="button"
              className="results-nav-button"
              onClick={handlePrev}
              aria-label="Previous transformation card"
              title="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="results-nav-button"
              onClick={handleNext}
              aria-label="Next transformation card"
              title="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="coverflow-wrapper">
          <div
            ref={stageRef}
            className={`coverflow-stage${isDragging ? " is-dragging" : ""}`}
            style={{ "--drag-offset": `${dragOffset}px` } as React.CSSProperties}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onDragStart={(e) => e.preventDefault()}
            tabIndex={0}
            role="region"
            aria-label="3D Patient transformation coverflow carousel"
            onKeyDown={handleKeyDown}
          >
            {carouselItems.map((result, idx) => {
              const diff = getDiff(idx);
              const cardClass = getCardClass(diff);
              const shiftDir = diff > 0 ? 1 : -1;

              return (
                <article
                  className={`coverflow-card ${cardClass}`}
                  key={result.uniqueKey}
                  style={{ "--shift-dir": shiftDir } as React.CSSProperties}
                  onDragStart={(e) => e.preventDefault()}
                  aria-hidden={Math.abs(diff) > 2}
                  aria-label={`Case ${idx + 1}: ${result.category}`}
                  onClick={() => {
                    if (Math.abs(dragOffsetRef.current) > 6) return;
                    if (diff === 1) handleNext();
                    else if (diff === -1) handlePrev();
                  }}
                >
                  <div className="comparison-pair">
                    <div className="comparison-pane pane-before">
                      <img
                        src={result.beforeImage}
                        alt={`Before ${result.category} treatment`}
                        className="comparison-img"
                        draggable="false"
                        loading="lazy"
                      />
                      <span className="comparison-badge badge-before">BEFORE</span>
                    </div>

                    <div className="comparison-divider" aria-hidden="true">
                      <span className="divider-line" />
                    </div>

                    <div className="comparison-pane pane-after">
                      <img
                        src={result.afterImage}
                        alt={`After ${result.category} treatment`}
                        className="comparison-img"
                        draggable="false"
                        loading="lazy"
                      />
                      <span className="comparison-badge badge-after">AFTER</span>
                    </div>
                  </div>

                  <div className="results-card-body">
                    <div className="results-card-header">
                      <span className="results-category-tag">{result.category}</span>
                      <span className="results-verified-chip">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Clinical Case
                      </span>
                    </div>

                    <h3 className="results-case-title">{result.category} Case</h3>

                    <div className="results-metrics">
                      <div className="results-metric">
                        <span className="metric-label">Treatment duration</span>
                        <strong className="metric-value">{result.duration}</strong>
                      </div>
                      <div className="metric-divider" aria-hidden="true" />
                      <div className="results-metric">
                        <span className="metric-label">Aligner trays</span>
                        <strong className="metric-value">{result.aligners}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="coverflow-dots" role="tablist" aria-label="Transformation slide indicators">
            {carouselItems.map((item, idx) => (
              <button
                key={item.uniqueKey}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to slide ${idx + 1}: ${item.category}`}
                className={`coverflow-dot${idx === activeIndex ? " is-active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>

        <p className="section-footnote">Case durations describe these approved examples only and do not predict a new patient&apos;s specific treatment plan.</p>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="content-width pricing-layout">
        <div className="pricing-intro">
          <span className="eyebrow">A clear starting point</span>
          <h2 id="pricing-title">Pricing that starts with a conversation</h2>
          <p>Share an enquiry and the Alignaa team can discuss your requirements and the next steps.</p>
          <a className="button" href="#enquiry">Request a Scan <span aria-hidden="true">↗</span></a>
        </div>
        <div className="price-card">
          <span className="price-card-label">Aligner Treatment</span>
          <strong className="price-amount">₹39,999<small>Starting at</small></strong>
          <span className="price-rule" />
          <p>Current starting price from the client PDF. Final inclusions, availability and conditions need approval.</p>
          <div className="price-status"><span className="status-dot" /> EMI availability pending confirmation</div>
          <span className="price-card-note">Illustrative three-tier prices are not shown in this draft.</span>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section benefits-section" aria-labelledby="benefits-title">
      <div className="content-width">
        <SectionHeading kicker="The Alignaa approach" title="Support through the journey" />
        <div className="benefit-grid">
          {siteContent.benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.number}>
              <span>{benefit.number}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="section comparison-section" aria-labelledby="comparison-title">
      <div className="content-width">
        <SectionHeading
          kicker="A helpful comparison"
          title="Compare what matters to you"
          text="Comparison categories and figures are pending client approval. No competitor claims are included in this draft."
        />
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <caption className="visually-hidden">Comparison content pending client approval</caption>
            <thead><tr><th scope="col">Treatment detail</th><th scope="col">Alignaa</th><th scope="col">Comparison value</th></tr></thead>
            <tbody>
              {["Treatment planning", "Included services", "Patient support"].map((row) => (
                <tr key={row}><th scope="row">{row}</th><td><span className="pending-value">Pending approval</span></td><td><span className="pending-value">Pending approval</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <div className="content-width review-layout">
        <div className="review-heading">
          <span className="eyebrow">Patient experiences</span>
          <h2 id="reviews-title">Stories worth sharing</h2>
          <p>Only original, consented testimonials will appear here.</p>
        </div>
        <div className="review-pending">
          <span className="quote-mark" aria-hidden="true">“</span>
          <strong>Approved patient reviews pending</strong>
          <p>Real testimonial wording and patient consent are needed before publication.</p>
          <span className="review-dots" aria-hidden="true"><i /><i /><i /></span>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section faq-section" id="faqs" aria-labelledby="faq-title">
      <div className="content-width faq-layout">
        <div className="faq-intro">
          <span className="eyebrow">Questions, answered</span>
          <h2 id="faq-title">Good to know</h2>
          <p>Clinical information is being reviewed with Alignaa before launch.</p>
          <a className="text-link" href="#enquiry">Ask a question <span aria-hidden="true">↗</span></a>
        </div>
        <div className="faq-list">
          {siteContent.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}<span className="faq-plus" aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquirySection() {
  return (
    <section className="section enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
      <div className="content-width enquiry-layout">
        <div className="enquiry-intro">
          <span className="eyebrow eyebrow-light">Your next step</span>
          <h2 id="enquiry-title">Let’s start with an enquiry</h2>
          <p>Share a few details and the Alignaa support team will contact you to discuss your requirements and guide you through the next steps.</p>
          <div className="support-pending"><span aria-hidden="true">✳</span><span>Approved support contact details pending</span></div>
          <a className="text-link text-link-light" href="/become-a-partner/">A dentist or clinic owner? Become an Alignaa Partner <span aria-hidden="true">↗</span></a>
        </div>
        <div className="form-card">
          <div className="form-card-heading">
            <span className="eyebrow">Patient enquiry</span>
            <h3>Request a Scan</h3>
            <p>All patient actions lead to this one form.</p>
          </div>
          <EnquiryForm kind="patient" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-main">
        <div className="footer-brand">
          <a className="wordmark wordmark-footer" href="/" aria-label="Alignaa home">
            <img
              src="/assets/alignaa-logo-white.png"
              srcSet="/assets/alignaa-logo-white.png 1x, /assets/alignaa-logo-white@2x.png 2x"
              alt="Alignaa"
              className="site-logo site-logo-footer"
              width="144"
              height="38"
            />
          </a>
          <p>Clear aligner treatment, with the next steps guided by the Alignaa team.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><a href="/#how-it-works">How it works</a><a href="/#results">Results</a><a href="/#pricing">Pricing</a></div>
          <div><strong>More</strong><a href="/become-a-partner/">Become a Partner</a><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms and Conditions</a></div>
          <div><strong>Alignaa</strong><a href={siteContent.parentUrl} target="_blank" rel="noreferrer">Professional website ↗</a><span className="footer-pending">Contact and social links pending</span></div>
        </div>
      </div>
      <div className="footer-bottom content-width"><span>© {new Date().getFullYear()} Alignaa</span><span>Design review draft · Not for public launch</span></div>
    </footer>
  );
}

function MobileStickyCta() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const enquiry = document.getElementById("enquiry");
    const footer = document.querySelector(".site-footer");
    if (!enquiry || !footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setVisible(false);
      else setVisible(true);
    }, { threshold: 0.08 });
    observer.observe(enquiry);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return visible ? <a className="mobile-sticky-cta" href="#enquiry">Request a Scan <span aria-hidden="true">↗</span></a> : null;
}

type TransitionStage = "idle" | "exiting" | "entering";

function HomePage() {
  const [design, setDesign] = useState<DesignOption>(() =>
    new URLSearchParams(window.location.search).get("design") === "b" ? "b" : "a",
  );
  const [transitionStage, setTransitionStage] = useState<TransitionStage>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const changeDesign = (next: DesignOption) => {
    if (next === design || transitionStage !== "idle") return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateUrl = (val: DesignOption) => {
      const url = new URL(window.location.href);
      url.searchParams.set("design", val);
      window.history.replaceState({}, "", url);
    };

    if (prefersReducedMotion) {
      setDesign(next);
      updateUrl(next);
      return;
    }

    // Phase 1: Smooth fade-out and subtle upward drift (220ms)
    setTransitionStage("exiting");

    // Phase 2: Under 0 opacity, swap layout state and trigger smooth fade-in
    timeoutRef.current = window.setTimeout(() => {
      setDesign(next);
      updateUrl(next);
      setTransitionStage("entering");

      // Phase 3: Transition settles into idle state (260ms)
      timeoutRef.current = window.setTimeout(() => {
        setTransitionStage("idle");
      }, 260);
    }, 220);
  };

  useEffect(() => {
    document.documentElement.dataset.design = design;
  }, [design]);

  return (
    <div className={`app design-option-${design}`}>
      <SiteHeader />
      <DesignChooser
        design={design}
        onChange={changeDesign}
        disabled={transitionStage !== "idle"}
      />
      <main className={`homepage-content stage-${transitionStage}`}>
        <Hero design={design} />
        <TreatmentOffer />
        <ProcessSection />
        {design === "a" ? (
          <>
            <ConcernsSection />
            <ResultsSection />
          </>
        ) : (
          <>
            <ResultsSection />
            <ConcernsSection />
          </>
        )}
        <PricingSection />
        <ComparisonSection />
        <BenefitsSection />
        <ReviewsSection />
        <FaqSection />
        <EnquirySection />
      </main>
      <Footer />
      <MobileStickyCta />
    </div>
  );
}

function PartnerPage() {
  return (
    <div className="app partner-page">
      <SiteHeader isPartnerPage />
      <main>
        <section className="partner-hero">
          <div className="content-width partner-hero-layout">
            <div>
              <span className="eyebrow eyebrow-light">For dental professionals</span>
              <h1>Become an Alignaa Partner</h1>
              <p>For dentists and dental clinic owners interested in connecting with Alignaa. Share your practice details and our team will contact you to discuss the next steps.</p>
              <a className="button button-light" href="#partner-enquiry">Send a partner enquiry <span aria-hidden="true">↗</span></a>
            </div>
            <div className="partner-visual" aria-label="Approved partner imagery pending">
              <div className="partner-visual-ring" />
              <div className="partner-visual-inner"><span>Alignaa</span><strong>Professional<br />partnerships</strong></div>
              <small>Approved partner imagery pending</small>
            </div>
          </div>
        </section>
        <section className="section partner-details-section">
          <div className="content-width partner-details-layout">
            <div>
              <span className="eyebrow">Start a conversation</span>
              <h2>Let’s discuss how we can work together</h2>
              <p>Share your professional details in the form. Alignaa will follow up to discuss potential next steps.</p>
              <ul className="partner-benefits">
                {siteContent.partnerBenefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
              </ul>
              <a className="parent-site-link" href={siteContent.parentUrl} target="_blank" rel="noreferrer">
                <span>Already know Alignaa?</span><strong>Visit the Alignaa professional website ↗</strong>
              </a>
            </div>
            <div className="form-card" id="partner-enquiry">
              <div className="form-card-heading">
                <span className="eyebrow">Partner enquiry</span>
                <h3>Tell us about your practice</h3>
                <p>Your enquiry goes to the shared Alignaa owner inbox once delivery is configured.</p>
              </div>
              <EnquiryForm kind="partner" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PolicyPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms and Conditions";
  return (
    <div className="app policy-page">
      <SiteHeader />
      <main className="policy-content content-width">
        <span className="eyebrow">Client policy content required</span>
        <h1>{title}</h1>
        <div className="policy-pending">
          <strong>This page is a draft placeholder.</strong>
          <p>{isPrivacy
            ? "Approved privacy wording, data handling details, retention periods, contact information and applicable rights have not been supplied. Replace this placeholder with client-approved policy content before collecting enquiries publicly."
            : "Approved terms and conditions have not been supplied. Replace this placeholder with client-approved terms before public launch."}</p>
        </div>
        <a className="text-link" href="/">Return to Alignaa home <span aria-hidden="true">↗</span></a>
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="app not-found-page">
      <SiteHeader />
      <main className="not-found-content content-width">
        <span className="eyebrow">Page not found</span>
        <h1>We can’t find that page</h1>
        <p>The page may have moved. Return to the Alignaa homepage to continue.</p>
        <a className="button" href="/">Back to home</a>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return <HomePage />;
  if (path === "/become-a-partner") return <PartnerPage />;
  if (path === "/privacy-policy") return <PolicyPage kind="privacy" />;
  if (path === "/terms") return <PolicyPage kind="terms" />;
  return <NotFoundPage />;
}
