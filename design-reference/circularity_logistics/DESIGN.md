---
name: Circularity Logistics
colors:
  surface: '#fff8f5'
  surface-dim: '#f3d4c1'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#ffeadd'
  surface-container-high: '#ffe3d1'
  surface-container-highest: '#fcddc9'
  on-surface: '#28180c'
  on-surface-variant: '#574238'
  inverse-surface: '#3f2d1f'
  inverse-on-surface: '#ffede3'
  outline: '#8b7266'
  outline-variant: '#dec0b3'
  surface-tint: '#9f4200'
  primary: '#9b4000'
  on-primary: '#ffffff'
  primary-container: '#c05407'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb691'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fdb659'
  on-secondary-container: '#724700'
  tertiary: '#296838'
  on-tertiary: '#ffffff'
  tertiary-container: '#43824e'
  on-tertiary-container: '#f7fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb691'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#ffddb7'
  secondary-fixed-dim: '#ffb95e'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#aff3b5'
  tertiary-fixed-dim: '#93d69a'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#0e5224'
  background: '#fff8f5'
  on-background: '#28180c'
  surface-variant: '#fcddc9'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-headline:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  metric-sub:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves a mission-critical climate-tech supply chain and fintech marketplace. The interface balances two demanding environments: outdoor field operations under direct Indian sunlight (restaurants, street vendors, aggregate depots) and high-density executive analytics (biofuel refineries, compliance regulators, financial settlement teams).

The personality is authoritative, transparent, and grounded. It avoids generic tech-coldness by anchoring itself in warm earthy tones, evoking raw agricultural energy transitioning into clean industrial refinement. Visually, it adheres to **Corporate / Modern Tactile**:
- High legibility and crisp structural framing over decorative flourishes.
- Generous ergonomic touch footprints (minimum 44px) built for dust-resistant field smartphones.
- Micro-interactions that emphasize ledger immutability and transactional finality.
- Trust-first fintech presentation for weight measurements (kg) and direct bank transfers (₹).

## Colors

The palette establishes immediate material context—warm oils, biological processing, and transparent monetary clearing:

- **Primary Canvas & Surfaces**: Base layout background is set to Warm Cream (`#FFF8EF`), offering an organic, fatigue-reducing backdrop. Actionable cards and modal surfaces sit clean on crisp White (`#FFFFFF`).
- **Primary Accent (`#D4621A`)**: A deep, visceral industrial orange used exclusively for primary calls-to-action, active collection states, and verified batch statuses. It must never be diluted with low-contrast pairings.
- **Secondary Amber (`#F4AE52`)**: Signifies intermediate logistics milestones—pending driver dispatch, staging, and weight verification checkpoints.
- **Dark Brown (`#2A1A0E`)**: Serves as the high-contrast neutral for all text typography, key boundaries, and dark navigation frames, replacing generic black with a richer, earthy contrast ratio.
- **Borders & Dividers**: Thin structural framing uses soft parchment tones (`#EFE4D6` default, `#E6DAC8` for active/hovered states).
- **Functional Semantics**:
  - Success Green (`#3E7D4A`): Used for FSSAI compliance verification, completed depot transfers, and instant UPI payouts.
  - Warning Amber (`#C98916`): Discrepancies in weight or FFA (Free Fatty Acid) testing limits.
  - Error Red (`#B83227`): Failed adulteration tests, canceled manifests, rejected settlements.

## Typography

Plus Jakarta Sans provides high geometric stability and crisp aperatures across dense tabular views and bright sunlight conditions.

- **Numerics & Tabular Data**: All data matrices dealing with batch weight (kg), vehicle registration, volume (L), and currency values (₹) require `font-feature-settings: "tnum" on, "cv05" on` to ensure tabular alignment and clear currency glyph positioning.
- **Contrast Hierarchy**: Headlines strictly utilize `#2A1A0E` at `700` and `800` weight to ground UI containers. Secondary captions and metadata use a reduced opacity of the dark brown neutral (`rgba(42, 26, 14, 0.65)`).
- **Scale Compression for Field Layouts**: Mobile views automatically compress top-tier display metrics from 40px down to 32px to ensure long INR currency figures (e.g., ₹14,82,500) never wrap awkwardly across multiple lines.

## Layout & Spacing

The layout model is built on an adaptive responsive grid:
- **Mobile Handheld (Field Collector view, &lt; 768px)**: 4-column fluid layout with `1rem` (16px) margins and `1rem` (16px) gutters. Actions are pinned to the bottom viewport for single-handed field operation.
- **Tablet / In-Cab Fleet (768px – 1024px)**: 8-column layout with `1.5rem` (24px) gutters, facilitating split-screen routing and scale readings simultaneously.
- **Desktop Logistics Portal (&gt; 1024px)**: 12-column fixed-max layout (max-width 1440px) with `2.5rem` (40px) outer margins and `1.5rem` (24px) gutters. High-density data views are enabled through strict vertical rhythms of 8px baseline steps.

Touch and interactive target rules:
- Interactive inputs, select rows, and buttons require a hard minimum vertical height of 48px on viewports under 1024px.
- Spacing inside telemetry data cards prioritizes clear grouping: metric figures are separated from unit identifiers (₹ / kg) by `space-xs` (4px), and from adjacent cards by `space-md` (16px).

## Elevation & Depth

Visual depth is conveyed through a hybrid of **Tonal Surface Framing** and **Warm Ambient Shadows**. In harsh outdoor daylight, pure blur-based shadows lose fidelity; structural borders maintain necessary affordance.

- **Base Canvas**: Surface `#FFF8EF` sits at 0 elevation.
- **Layer 1 (Card & Content Blocks)**: Surface `#FFFFFF` bordered with a 1px solid line (`#EFE4D6`) combined with an ambient brown-tinted shadow:
  `box-shadow: 0 2px 4px -1px rgba(42, 26, 14, 0.04), 0 4px 12px -2px rgba(42, 26, 14, 0.06);`
- **Layer 2 (Dropdowns, Floating Bottom Sheets, Dynamic Action Bars)**: Surface `#FFFFFF` with border `#E6DAC8`:
  `box-shadow: 0 6px 16px -3px rgba(42, 26, 14, 0.08), 0 12px 28px -4px rgba(42, 26, 14, 0.10);`
- **Layer 3 (Modals, OTP Verification Drawers, Weighbridge Alerts)**: Surface `#FFFFFF` accompanied by an earthy backdrop overlay (`rgba(42, 26, 14, 0.45)` with `backdrop-filter: blur(4px)`):
  `box-shadow: 0 16px 36px -6px rgba(42, 26, 14, 0.16);`

## Shapes

The design system adopts **Level 2 Roundedness** to establish a refined modern industrial software identity that feels friendly yet precise:

- **Cards & Data Modules**: Defined at `rounded-lg` (16px / 1rem). Corners are soft enough to feel clean and ergonomic, but tight enough to support structured multi-column data density.
- **Buttons & Input Controls**: Styled with `rounded` (8px / 0.5rem) to ensure crisp alignment with internal icons and numeric fields.
- **Pill Tags & Compliance Badges**: Fully rounded (`border-radius: 9999px`) to immediately visually differentiate dynamic state descriptors from actionable square button elements.
- **Bottom Drawers & Modals**: Top edges leverage `rounded-xl` (24px / 1.5rem) for tactile mobile ergonomics.

## Components

### Buttons
- **Primary**: Background `#D4621A`, text `#FFFFFF`, font weight 600. Min-height 48px on mobile, 40px on desktop. Hover state darkens to `#BA5312`. Active state compresses slightly (`transform: scale(0.98)`).
- **Secondary**: Surface `#FFFFFF`, border 1px solid `#D4621A`, text `#D4621A`. Hover shifts background to `rgba(212, 98, 26, 0.06)`.
- **Tertiary / Field Neutral**: Surface `#FFFFFF`, border 1px solid `#EFE4D6`, text `#2A1A0E`. Hover border becomes `#E6DAC8`.

### Badges & Status Chips
All chips feature a full pill radius, 1px matching tint border, and 12px bold typography:
- **Verified / FSSAI Compliant**: Background `rgba(62, 125, 74, 0.10)`, text `#3E7D4A`, border `rgba(62, 125, 74, 0.20)`.
- **In Transit / Staged**: Background `rgba(244, 174, 82, 0.18)`, text `#A2620A`, border `rgba(201, 137, 22, 0.30)`.
- **Adulterated / Rejected**: Background `rgba(184, 50, 39, 0.10)`, text `#B83227`, border `rgba(184, 50, 39, 0.25)`.
- **Settled Payout**: Background `rgba(212, 98, 26, 0.10)`, text `#D4621A`, border `rgba(212, 98, 26, 0.25)`.

### Cards & Data Tiles
- Container: White background (`#FFFFFF`), border 1px solid `#EFE4D6`, border-radius 16px, padding 20px.
- Metric display cards feature two zones: an upper metadata bar containing the label and status badge, and a lower dominant figure combining the numeric metric with its corresponding unit (e.g., `450.5` `kg` or `₹24,300`).

### Form Inputs & Barcode/QR Triggers
- Height: 48px baseline.
- Container: Background `#FFFFFF`, border 1.5px solid `#EFE4D6`, color `#2A1A0E`, border-radius 8px.
- Focus: Border shifts to `#D4621A`, subtle focus ring `0 0 0 3px rgba(212, 98, 26, 0.15)`.
- QR / Weighbridge Hardware Integration Input: Accompanied by high-contrast icon buttons on the trailing edge with minimum 44x44px touch space.

### Traceability Progress Chain
- Visual chain node representing UCO lifecycle: *Restaurant Kitchen &rarr; Canister Aggregator &rarr; Regional Depot &rarr; Biofuel Refinery*.
- Completed nodes: Solid `#3E7D4A` circle with white check icon.
- Active node: Solid `#D4621A` circle with radiating soft amber ring (`0 0 0 4px rgba(212, 98, 26, 0.2)`).
- Connecting lines: 2px thickness; solid `#3E7D4A` for completed steps, dashed `#E6DAC8` for upcoming steps.