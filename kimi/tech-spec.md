# Lodha Park - Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
- **Button** - CTAs throughout
- **Input** - Contact form fields
- **Select** - "Interested in" dropdown
- **Tabs** - Residence typology switching (Section 6)
- **Accordion** - FAQ section

### Custom Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `Header` | Persistent navigation with wordmark | - |
| `PinnedSection` | Wrapper for pinned scroll sections | `children, className, zIndex` |
| `TextPanel` | Translucent overlay panel for text | `position, children, dark?` |
| `ImageCollage` | 3-thumbnail floating collage | `images[]` |
| `AddressPanel` | White info card | `title, lines[], cta?` |
| `LocationPanel` | White info card with distance list | `locations[]` |
| `Carousel` | Residence typology slider | `slides[], activeTab` |
| `ContactForm` | Form in footer | - |
| `Footer` | Dark footer with links | - |
| `GrainOverlay` | Static texture overlay | - |
| `Hairline` | 1px decorative line | `className` |
| `DotIndicators` | Small circle indicators | `count, active` |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero auto-play entrance (bg scale + fade) | GSAP Timeline | Single timeline on mount, `power2.out` easing | Medium |
| Hero text word reveal | GSAP + SplitText | SplitText words staggered, y translate + opacity | Medium |
| Hero UI elements stagger | GSAP Timeline | Sequential fade-in of nav, CTA, microcopy | Low |
| Pinned section scroll animations | GSAP ScrollTrigger | `pin: true`, `scrub: 0.6`, `end: "+=130%"` | High |
| Background parallax (all pinned) | GSAP ScrollTrigger | Scale 1.08→1 on enter, 1→1.06 on exit | Medium |
| Left panel slide-in | GSAP ScrollTrigger | `x: -45vw → 0` during entrance phase | Medium |
| Right panel slide-in | GSAP ScrollTrigger | `x: +40vw → 0` during entrance phase | Medium |
| Headline word reveals | GSAP + SplitText | Per-word y: 18-26vh → 0 with opacity | Medium |
| Body text fade-up | GSAP ScrollTrigger | `y: 10vh → 0`, `opacity: 0 → 1` | Low |
| Image collage stagger | GSAP ScrollTrigger | Thumbnails enter at different scroll % with scale | Medium |
| Flowing section reveals | GSAP ScrollTrigger | `scrub: true`, translateX/translateY + opacity | Low |
| Global scroll snap | GSAP ScrollTrigger | Custom snap function targeting pinned settle centers | High |
| Reduced motion fallback | CSS + GSAP | `prefers-reduced-motion` media query, disable pinning | Medium |

## Animation Library Choices

### GSAP + ScrollTrigger (Primary)
- All scroll-driven animations
- Pinned sections with scrub
- Timeline-based entrance/exit phases

### GSAP SplitText (or custom splitter)
- Headline word-by-word reveals
- Character-level control for premium feel

## Project File Structure

```
src/
├── sections/
│   ├── HeroSection.tsx           # Section 1 - Oasis Hero
│   ├── ParkCanvasSection.tsx     # Section 2 - Aerial Park
│   ├── LiveInspiredSection.tsx   # Section 3 - Amenities Collage
│   ├── ParkLivingSection.tsx     # Section 4 - Statement + Address
│   ├── TowersSection.tsx         # Section 5 - Skyline
│   ├── ResidencesSection.tsx     # Section 6 - Typology Carousel (flowing)
│   ├── NeighborhoodSection.tsx   # Section 7 - Map
│   └── ContactFooter.tsx         # Section 8 - Contact + Footer (flowing)
├── components/
│   ├── Header.tsx                # Persistent navigation
│   ├── PinnedSection.tsx         # Wrapper for pinned sections
│   ├── TextPanel.tsx             # Translucent text panel
│   ├── ImageCollage.tsx          # 3-thumbnail collage
│   ├── AddressPanel.tsx          # White address card
│   ├── LocationPanel.tsx         # Location distances card
│   ├── ResidenceCarousel.tsx     # Carousel for floor plans
│   ├── ContactForm.tsx           # Contact form
│   ├── GrainOverlay.tsx          # Static grain texture
│   ├── Hairline.tsx              # 1px decorative line
│   └── DotIndicators.tsx         # Circle indicators
├── hooks/
│   ├── useScrollProgress.ts      # Scroll progress tracker
│   └── useReducedMotion.ts       # Reduced motion preference
├── lib/
│   └── utils.ts                  # shadcn utilities
├── App.tsx                       # Main app with all sections
├── index.css                     # Global styles + Tailwind
└── main.tsx                      # Entry point
```

## Dependencies

```json
{
  "gsap": "^3.12.0",
  "swiper": "^11.0.0"
}
```

## Key Implementation Notes

### Pinned Section Pattern
```tsx
// Each pinned section follows this structure
<section className="w-screen h-screen relative overflow-hidden" style={{ zIndex }}>
  {/* Background image with parallax */}
  {/* Content layers with GSAP animations */}
</section>
```

### ScrollTrigger Config
- `start: "top top"`
- `end: "+=130%"`
- `scrub: 0.6`
- `pin: true`
- Three phases: ENTRANCE (0-30%), SETTLE (30-70%), EXIT (70-100%)

### Z-Index Stacking
- Section 1: 10
- Section 2: 20
- Section 3: 30
- Section 4: 40
- Section 5: 50
- Section 6: 60 (flowing)
- Section 7: 70
- Section 8: 80 (flowing)

### Global Snap Function
- Iterate through pinned ScrollTriggers
- Calculate snap targets at settleRatio (0.5)
- Only snap when within pinned range ±2%
- Duration: 0.15-0.35s distance-aware

## Responsive Breakpoints
- Desktop: default (full experience)
- Tablet: `max-width: 1024px` (reduced panel widths)
- Mobile: `max-width: 768px` (bottom sheets, stacked layouts)
