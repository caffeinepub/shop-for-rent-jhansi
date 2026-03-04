import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  DoorOpen,
  Droplets,
  IndianRupee,
  Key,
  Layers,
  MapPin,
  Phone,
  Ruler,
  Shield,
  Sofa,
  Star,
  Store,
  Sun,
  Users,
  Wifi,
  Wind,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { Shop } from "../backend.d";
import FloorPlan from "../components/FloorPlan";
import InquiryForm from "../components/InquiryForm";
import ShopModel3D from "../components/ShopModel3D";
import { useGetShop } from "../hooks/useQueries";

const featureIconMap: Record<string, React.ReactNode> = {
  // English keys
  "Ground Floor Location": <Building2 className="h-5 w-5" />,
  "High Footfall Area": <Users className="h-5 w-5" />,
  "Water Connection": <Droplets className="h-5 w-5" />,
  "Electricity Connection": <Zap className="h-5 w-5" />,
  "24/7 Access": <Clock className="h-5 w-5" />,
  "Parking Available": <Car className="h-5 w-5" />,
  Security: <Shield className="h-5 w-5" />,
  "Good Lighting": <Sun className="h-5 w-5" />,
  Ventilation: <Wind className="h-5 w-5" />,
  "Internet Ready": <Wifi className="h-5 w-5" />,
  "Key Handover": <Key className="h-5 w-5" />,
  "Modular Glass Front": <Layers className="h-5 w-5" />,
  "Double Shutter": <DoorOpen className="h-5 w-5" />,
  "Full Furniture Included": <Sofa className="h-5 w-5" />,
  // Hindi keys
  "ग्राउंड फ्लोर": <Building2 className="h-5 w-5" />,
  "अधिक ग्राहक": <Users className="h-5 w-5" />,
  "पानी कनेक्शन": <Droplets className="h-5 w-5" />,
  "बिजली कनेक्शन": <Zap className="h-5 w-5" />,
  "24/7 एक्सेस": <Clock className="h-5 w-5" />,
  पार्किंग: <Car className="h-5 w-5" />,
  सुरक्षा: <Shield className="h-5 w-5" />,
  "अच्छी रोशनी": <Sun className="h-5 w-5" />,
  वेंटिलेशन: <Wind className="h-5 w-5" />,
  इंटरनेट: <Wifi className="h-5 w-5" />,
  "चाबी हस्तांतरण": <Key className="h-5 w-5" />,
  "मॉड्यूलर ग्लास फ्रंट": <Layers className="h-5 w-5" />,
  "डबल शटर": <DoorOpen className="h-5 w-5" />,
  "पूरा फर्नीचर": <Sofa className="h-5 w-5" />,
};

const keyAdvantages = [
  {
    title: "मॉड्यूलर ग्लास फ्रंट",
    description: "अधिकतम दृश्यता के लिए स्टाइलिश मॉड्यूलर ग्लास फसाड",
    icon: <Layers className="h-6 w-6" />,
    metal: "gold",
  },
  {
    title: "डबल शटर",
    description: "बेहतर सुरक्षा और आसान पहुंच के लिए मजबूत डबल शटर दरवाजा",
    icon: <DoorOpen className="h-6 w-6" />,
    metal: "silver",
  },
  {
    title: "पूरा फर्नीचर",
    description: "पूरी तरह से सुसज्जित — बस अपना व्यवसाय लाएं, फर्नीचर नहीं",
    icon: <Sofa className="h-6 w-6" />,
    metal: "whitegold",
  },
];

const metalStyles: Record<
  string,
  {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    glow: string;
    glowHover: string;
    numberColor: string;
  }
> = {
  gold: {
    bg: "linear-gradient(135deg, oklch(0.18 0.06 60) 0%, oklch(0.15 0.05 58) 100%)",
    border: "1px solid oklch(0.85 0.22 75 / 0.30)",
    iconBg: "oklch(0.74 0.18 65 / 0.18)",
    iconColor: "oklch(0.88 0.22 78)",
    glow: "oklch(0.74 0.18 65)",
    glowHover:
      "0 12px 40px oklch(0.85 0.22 75 / 0.25), 0 0 0 1px oklch(0.85 0.22 75 / 0.40)",
    numberColor: "oklch(0.74 0.18 65)",
  },
  silver: {
    bg: "linear-gradient(135deg, oklch(0.18 0.02 200) 0%, oklch(0.15 0.02 210) 100%)",
    border: "1px solid oklch(0.80 0.01 200 / 0.28)",
    iconBg: "oklch(0.80 0.01 200 / 0.14)",
    iconColor: "oklch(0.90 0.00 0)",
    glow: "oklch(0.80 0.01 200)",
    glowHover:
      "0 12px 40px oklch(0.85 0.00 0 / 0.20), 0 0 0 1px oklch(0.80 0.01 200 / 0.40)",
    numberColor: "oklch(0.80 0.01 200)",
  },
  whitegold: {
    bg: "linear-gradient(135deg, oklch(0.19 0.04 75) 0%, oklch(0.16 0.04 72) 100%)",
    border: "1px solid oklch(0.92 0.08 85 / 0.28)",
    iconBg: "oklch(0.92 0.08 85 / 0.12)",
    iconColor: "oklch(0.95 0.08 85)",
    glow: "oklch(0.92 0.08 85)",
    glowHover:
      "0 12px 40px oklch(0.95 0.08 85 / 0.22), 0 0 0 1px oklch(0.92 0.08 85 / 0.38)",
    numberColor: "oklch(0.92 0.08 85)",
  },
};

function getFeatureIcon(feature: string): React.ReactNode {
  return featureIconMap[feature] ?? <CheckCircle2 className="h-5 w-5" />;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

function ShopDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}

function FeaturesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {["f1", "f2", "f3", "f4", "f5", "f6"].map((id) => (
        <Skeleton key={id} className="h-20 rounded-lg" />
      ))}
    </div>
  );
}

interface ShopDetailsProps {
  shop: Shop;
}

function ShopDetails({ shop }: ShopDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start gap-3">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {shop.title}
        </h2>
        {shop.isAvailable ? (
          <Badge className="mt-1 gap-1.5 bg-success/15 text-success hover:bg-success/25 border-success/25">
            <CheckCircle2 className="h-3.5 w-3.5" />
            उपलब्ध
          </Badge>
        ) : (
          <Badge variant="destructive" className="mt-1 gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            अनुपलब्ध
          </Badge>
        )}
      </div>

      {/* Main info card with shiny metallic border */}
      <div
        className="overflow-hidden rounded-xl shiny-border"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(oklch(0.16 0.05 60), oklch(0.14 0.04 58)) padding-box, linear-gradient(135deg, oklch(0.85 0.22 75), oklch(0.80 0.01 200), oklch(0.95 0.08 85), oklch(0.78 0.20 65)) border-box",
        }}
      >
        {/* Rent highlight row */}
        <div
          className="flex items-center gap-4 px-5 py-5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.74 0.18 65 / 0.14) 0%, oklch(0.95 0.08 85 / 0.05) 100%)",
            borderBottom: "1px solid oklch(0.85 0.22 75 / 0.18)",
          }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.74 0.18 65 / 0.25), oklch(0.65 0.20 55 / 0.20))",
              boxShadow:
                "0 0 16px oklch(0.74 0.18 65 / 0.28), inset 0 1px 0 oklch(0.92 0.18 80 / 0.30)",
            }}
          >
            <IndianRupee
              className="h-5 w-5"
              style={{ color: "oklch(0.88 0.20 78)" }}
            />
          </div>
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.80 0.15 70 / 0.75)" }}
            >
              मासिक किराया
            </p>
            <p
              className="font-display text-2xl font-bold"
              style={{ color: "oklch(0.92 0.18 78)" }}
            >
              ₹20,000
              <span
                className="ml-2 font-body text-sm font-normal"
                style={{ color: "oklch(0.65 0.04 70)" }}
              >
                प्रति माह
              </span>
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "oklch(0.90 0.04 85 / 0.70)" }}
            >
              सुरक्षा अग्रिम
            </p>
            <p
              className="font-display text-xl font-bold"
              style={{ color: "oklch(0.92 0.06 85)" }}
            >
              ₹10,00,000
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid oklch(0.85 0.22 75 / 0.10)" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "oklch(0.80 0.01 200 / 0.14)",
              boxShadow: "inset 0 1px 0 oklch(0.90 0.00 0 / 0.20)",
            }}
          >
            <Ruler
              className="h-4 w-4"
              style={{ color: "oklch(0.88 0.00 0)" }}
            />
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "oklch(0.60 0.03 70)" }}
            >
              दुकान का आकार
            </p>
            <p className="font-semibold text-foreground">
              {shop.size} (154 वर्ग फुट)
            </p>
          </div>
        </div>

        <div
          className="flex items-start gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid oklch(0.85 0.22 75 / 0.10)" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "oklch(0.95 0.08 85 / 0.10)",
              boxShadow: "inset 0 1px 0 oklch(0.96 0.06 90 / 0.18)",
            }}
          >
            <MapPin
              className="h-4 w-4"
              style={{ color: "oklch(0.92 0.08 85)" }}
            />
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "oklch(0.60 0.03 70)" }}
            >
              पता
            </p>
            <p className="font-semibold text-foreground">{shop.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: shop.isAvailable
                ? "oklch(0.62 0.18 145 / 0.12)"
                : "oklch(0.577 0.245 27 / 0.12)",
            }}
          >
            {shop.isAvailable ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "oklch(0.60 0.03 70)" }}
            >
              उपलब्धता
            </p>
            <p
              className={`font-semibold ${shop.isAvailable ? "text-success" : "text-destructive"}`}
            >
              {shop.isAvailable ? "तुरंत उपलब्ध" : "अभी व्यस्त"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturesProps {
  features: string[];
}

function Features({ features }: FeaturesProps) {
  const metalCycle = ["gold", "silver", "whitegold"];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {features.map((feature, i) => {
        const metal = metalCycle[i % 3];
        const ms = metalStyles[metal];
        return (
          <motion.div
            key={feature}
            variants={itemVariants}
            className="group flex flex-col items-center gap-2 rounded-xl p-4 text-center transition-all duration-300"
            style={{
              background: ms.bg,
              border: ms.border,
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: ms.glowHover,
            }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
              style={{
                background: ms.iconBg,
                color: ms.iconColor,
                boxShadow: `inset 0 1px 0 ${ms.iconColor.replace(")", " / 0.25)")}`,
              }}
            >
              {getFeatureIcon(feature)}
            </div>
            <span className="text-sm font-medium leading-tight text-foreground">
              {feature}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ShopPage() {
  const { data: shop, isLoading, isError } = useGetShop();

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "oklch(0.10 0.05 55)" }}
    >
      {/* ── Global background orbs ── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Gold orb — bottom left — larger, brighter */}
        <div
          className="bg-orb-gold absolute -bottom-40 -left-40 h-[550px] w-[550px] rounded-full"
          style={{
            background: "oklch(0.74 0.18 65 / 0.17)",
            filter: "blur(80px)",
          }}
        />
        {/* Silver orb — top right — larger, brighter */}
        <div
          className="bg-orb-silver absolute -right-52 -top-52 h-[650px] w-[650px] rounded-full"
          style={{
            background: "oklch(0.80 0.01 200 / 0.18)",
            filter: "blur(90px)",
          }}
        />
        {/* White gold mid orb — larger */}
        <div
          className="bg-orb-whitegold absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "oklch(0.92 0.06 85 / 0.12)",
            filter: "blur(80px)",
          }}
        />
        {/* NEW: Gold orb — center-top */}
        <div
          className="bg-orb-gold absolute left-1/2 -top-20 h-[350px] w-[350px] -translate-x-1/2 rounded-full"
          style={{
            background: "oklch(0.78 0.18 65 / 0.14)",
            filter: "blur(70px)",
            animationDelay: "2s",
            animationDuration: "9s",
          }}
        />
        {/* NEW: Silver orb — bottom right */}
        <div
          className="bg-orb-silver absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full"
          style={{
            background: "oklch(0.80 0.02 200 / 0.13)",
            filter: "blur(75px)",
            animationDelay: "3.5s",
            animationDuration: "11s",
          }}
        />
        {/* Animated bg mesh overlay */}
        <div className="animated-bg-mesh absolute inset-0" />
        {/* Diagonal noise layer */}
        <div className="absolute inset-0 diagonal-lines-bg opacity-70" />
      </div>

      {/* ─── Header / Nav ─── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{
          background: "oklch(0.10 0.05 55 / 0.88)",
          borderBottom: "1px solid transparent",
          backgroundImage:
            "linear-gradient(oklch(0.10 0.05 55 / 0.88), oklch(0.10 0.05 55 / 0.88)), linear-gradient(90deg, oklch(0.85 0.22 75), oklch(0.80 0.01 200), oklch(0.95 0.08 85))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow:
            "0 1px 0 oklch(0.85 0.22 75 / 0.35), 0 4px 30px oklch(0.74 0.18 65 / 0.10)",
        }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.74 0.18 65) 0%, oklch(0.65 0.20 55) 100%)",
                boxShadow:
                  "0 0 20px oklch(0.74 0.18 65 / 0.40), inset 0 1px 0 oklch(0.92 0.18 80 / 0.30)",
              }}
            >
              <Store
                className="h-4 w-4"
                style={{ color: "oklch(0.12 0.04 55)" }}
              />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              सिपरी बाजार किराया
            </span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            {[
              { href: "#details", label: "विवरण" },
              { href: "#features", label: "सुविधाएं" },
              { href: "#contact", label: "संपर्क" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "oklch(0.65 0.04 70)" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "oklch(0.88 0.20 78)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "oklch(0.65 0.04 70)";
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.74 0.18 65) 0%, oklch(0.88 0.18 78) 50%, oklch(0.65 0.20 55) 100%)",
              color: "oklch(0.10 0.04 55)",
              boxShadow:
                "0 0 24px oklch(0.74 0.18 65 / 0.35), inset 0 1px 0 oklch(0.92 0.18 80 / 0.40)",
            }}
            data-ocid="nav.primary_button"
          >
            अभी पूछें
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative overflow-hidden"
          aria-label="हीरो सेक्शन"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.09 0.06 55) 0%, oklch(0.12 0.05 60) 25%, oklch(0.16 0.04 200) 50%, oklch(0.14 0.05 65) 75%, oklch(0.10 0.06 55) 100%)",
          }}
        >
          {/* Multi-layer hero background */}
          {/* Gold radial spotlight — increased opacity */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 30% 50%, oklch(0.74 0.18 65 / 0.18) 0%, transparent 65%)",
            }}
          />
          {/* Silver cool shimmer — right side */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 85% 30%, oklch(0.80 0.01 200 / 0.16) 0%, transparent 60%)",
            }}
          />
          {/* White gold center bloom */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 50% 80%, oklch(0.92 0.06 85 / 0.10) 0%, transparent 65%)",
            }}
          />
          {/* Additional deep gold top-left */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 45% 55% at 5% 5%, oklch(0.74 0.18 65 / 0.12) 0%, transparent 65%)",
            }}
          />
          {/* Animated shimmer sweep */}
          <div className="hero-shimmer-layer pointer-events-none absolute inset-0" />
          {/* Luxury conic overlay */}
          <div className="luxury-bg-overlay pointer-events-none absolute inset-0" />

          {/* Top edge shiny metallic line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.74 0.18 65 / 0.7) 20%, oklch(0.88 0.22 80) 40%, oklch(0.90 0.00 0) 60%, oklch(0.95 0.08 85) 80%, transparent 100%)",
              boxShadow: "0 0 12px oklch(0.88 0.22 80 / 0.50)",
            }}
          />

          {/* Animated floating orb 1 — gold */}
          <div
            className="pointer-events-none absolute right-[15%] top-[20%] h-40 w-40 rounded-full blur-2xl"
            style={{
              background: "oklch(0.74 0.18 65 / 0.20)",
              animation: "float-slow 7s ease-in-out infinite",
            }}
          />
          {/* Animated floating orb 2 — silver */}
          <div
            className="pointer-events-none absolute bottom-[15%] right-[30%] h-28 w-28 rounded-full blur-2xl"
            style={{
              background: "oklch(0.80 0.01 200 / 0.16)",
              animation: "orb-silver-drift 9s ease-in-out infinite 1s",
            }}
          />
          {/* Animated floating orb 3 — white gold */}
          <div
            className="pointer-events-none absolute right-[8%] top-[55%] h-20 w-20 rounded-full blur-xl"
            style={{
              background: "oklch(0.92 0.06 85 / 0.14)",
              animation: "orb-whitegold 5s ease-in-out infinite 0.5s",
            }}
          />

          {/* Diagonal grid pattern */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="hero-grid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M40 0 L0 40"
                  stroke="oklch(0.85 0.22 75)"
                  strokeWidth="0.8"
                  fill="none"
                />
                <path
                  d="M0 0 L40 40"
                  stroke="oklch(0.80 0.01 200)"
                  strokeWidth="0.3"
                  fill="none"
                  opacity="0.5"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="1.5"
                  fill="oklch(0.88 0.22 78)"
                  opacity="0.7"
                />
                <circle
                  cx="40"
                  cy="0"
                  r="1.5"
                  fill="oklch(0.90 0.00 0)"
                  opacity="0.5"
                />
                <circle
                  cx="0"
                  cy="40"
                  r="1.5"
                  fill="oklch(0.95 0.08 85)"
                  opacity="0.6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="1.5"
                  fill="oklch(0.88 0.22 78)"
                  opacity="0.7"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>

          {/* Bottom fade to page bg */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.10 0.05 55))",
            }}
          />

          <div className="container relative py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl"
            >
              {/* Location pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{
                  background: "oklch(0.80 0.01 200 / 0.10)",
                  border: "1px solid transparent",
                  backgroundImage:
                    "linear-gradient(oklch(0.80 0.01 200 / 0.10), oklch(0.80 0.01 200 / 0.10)), linear-gradient(90deg, oklch(0.85 0.22 75), oklch(0.80 0.01 200), oklch(0.95 0.08 85))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <MapPin
                  className="h-3.5 w-3.5"
                  style={{ color: "oklch(0.88 0.22 78)" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "oklch(0.88 0.12 80)" }}
                >
                  सिपरी बाजार, झाँसी, उत्तर प्रदेश
                </span>
              </motion.div>

              {/* Main headline */}
              <h1 className="font-display mb-6 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
                प्रीमियम{" "}
                <span className="relative inline-block">
                  <span
                    className="text-gold-shimmer"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.82 0.20 75) 0%, oklch(0.74 0.18 65) 35%, oklch(0.92 0.15 85) 55%, oklch(0.90 0.00 0) 75%, oklch(0.74 0.18 65) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    दुकान
                  </span>
                  {/* Shiny underline — gold to silver to white gold */}
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.85 0.22 75 / 0.9), oklch(0.90 0.00 0 / 0.7), oklch(0.95 0.08 85 / 0.9))",
                      boxShadow: "0 0 12px oklch(0.85 0.22 75 / 0.60)",
                    }}
                  />
                </span>{" "}
                किराये के लिए
              </h1>

              <p
                className="mb-8 max-w-xl text-lg leading-relaxed sm:text-xl"
                style={{ color: "oklch(0.72 0.03 70)" }}
              >
                सिपरी बाजार के केंद्र में व्यावसायिक स्थान — माप{" "}
                <strong style={{ color: "oklch(0.92 0.08 85)" }}>
                  11 × 14 फुट
                </strong>
                , पूर्ण फर्नीचर सहित
              </p>

              {/* Stats pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3"
              >
                {isLoading ? (
                  <Skeleton className="h-9 w-28 rounded-full" />
                ) : shop?.isAvailable ? (
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                    style={{
                      background: "oklch(0.62 0.18 145 / 0.14)",
                      border: "1px solid oklch(0.62 0.18 145 / 0.35)",
                      color: "oklch(0.72 0.18 145)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    अभी उपलब्ध
                  </div>
                ) : (
                  <Badge
                    variant="destructive"
                    className="gap-1.5 rounded-full px-3 py-1.5 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    उपलब्ध नहीं
                  </Badge>
                )}

                {/* Gold pill — rent */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    background: "oklch(0.74 0.18 65 / 0.14)",
                    border: "1px solid oklch(0.85 0.22 75 / 0.35)",
                    color: "oklch(0.88 0.18 78)",
                    boxShadow: "0 0 10px oklch(0.74 0.18 65 / 0.12)",
                  }}
                >
                  <IndianRupee className="h-3.5 w-3.5" />
                  ₹20,000/माह
                </div>

                {/* Silver pill — advance */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                  style={{
                    background: "oklch(0.80 0.01 200 / 0.10)",
                    border: "1px solid oklch(0.80 0.01 200 / 0.30)",
                    color: "oklch(0.88 0.00 0)",
                    boxShadow: "0 0 10px oklch(0.80 0.01 200 / 0.08)",
                  }}
                >
                  <Star
                    className="h-3.5 w-3.5"
                    style={{ color: "oklch(0.90 0.00 0)" }}
                  />
                  ₹10 लाख अग्रिम
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Shop Visual / 3D Model + Floor Plan ─── */}
        <section className="relative py-16" aria-label="दुकान का दृश्य">
          {/* Section dot-matrix background */}
          <div
            className="pointer-events-none absolute inset-0 dot-matrix-bg opacity-40"
            aria-hidden="true"
          />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              {/* Section label — silver dividers */}
              <div className="mb-2 flex items-center gap-3">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.80 0.01 200 / 0.5), transparent)",
                  }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.88 0.00 0)" }}
                >
                  ३डी दृश्य
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.80 0.01 200 / 0.5))",
                  }}
                />
              </div>
              <h2 className="font-display text-center text-2xl font-bold text-foreground sm:text-3xl">
                दुकान का दृश्य
              </h2>
              <p
                className="mt-1 text-center text-sm"
                style={{ color: "oklch(0.58 0.03 70)" }}
              >
                व्यावसायिक स्थान और नक्शा देखें
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* 3D model — gold shiny border */}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="rounded-2xl overflow-hidden shiny-border-gold"
                style={{
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(oklch(0.14 0.05 58), oklch(0.14 0.05 58)) padding-box, linear-gradient(135deg, oklch(0.85 0.22 75), oklch(0.92 0.18 80), oklch(0.78 0.20 65)) border-box",
                }}
              >
                <ShopModel3D />
                <p
                  className="px-4 py-3 text-center text-xs"
                  style={{
                    color: "oklch(0.60 0.03 70)",
                    borderTop: "1px solid oklch(0.85 0.22 75 / 0.14)",
                    background: "oklch(0.14 0.04 58)",
                  }}
                >
                  इंटरेक्टिव 3D मॉडल — 11 × 14 फुट दुकान, सिपरी बाजार, झाँसी
                </p>
              </motion.div>

              {/* Floor plan — silver shiny border */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="flex items-center justify-center rounded-2xl overflow-hidden shiny-border-silver"
                style={{
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(oklch(0.14 0.03 200), oklch(0.13 0.02 210)) padding-box, linear-gradient(135deg, oklch(0.80 0.01 200), oklch(0.90 0.00 0), oklch(0.75 0.02 210)) border-box",
                }}
              >
                <FloorPlan />
              </motion.div>
            </div>
          </div>

          {/* Bottom divider — white gold */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.95 0.08 85 / 0.35) 50%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.95 0.08 85 / 0.20)",
            }}
          />
        </section>

        {/* ─── Shop Details ─── */}
        <section
          id="details"
          className="relative py-16"
          aria-label="दुकान का विवरण"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.13 0.045 58) 0%, oklch(0.11 0.05 55) 100%)",
          }}
        >
          {/* Subtle gold side glow */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-1/3"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 0% 50%, oklch(0.74 0.18 65 / 0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container relative max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <div className="mb-2 flex items-center gap-2">
                  {/* Gold → silver → white gold accent bar */}
                  <span
                    className="inline-block h-1 w-10 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.74 0.18 65), oklch(0.80 0.01 200), oklch(0.95 0.08 85))",
                    }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.82 0.14 72)" }}
                  >
                    पूरी जानकारी
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  दुकान का विवरण
                </h2>
              </div>

              {isLoading ? (
                <ShopDetailsSkeleton />
              ) : isError ? (
                <div
                  className="rounded-xl px-6 py-8 text-center"
                  style={{
                    border: "1px solid oklch(0.577 0.245 27 / 0.30)",
                    background: "oklch(0.577 0.245 27 / 0.06)",
                  }}
                  data-ocid="shop.error_state"
                >
                  <XCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
                  <p className="font-semibold text-foreground">
                    दुकान की जानकारी लोड नहीं हुई
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "oklch(0.58 0.03 70)" }}
                  >
                    पुनः प्रयास के लिए पेज रीफ्रेश करें।
                  </p>
                </div>
              ) : shop ? (
                <ShopDetails shop={shop} />
              ) : null}
            </motion.div>
          </div>

          {/* Bottom divider — silver */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.80 0.01 200 / 0.28) 50%, transparent 100%)",
            }}
          />
        </section>

        {/* ─── Features ─── */}
        <section
          id="features"
          className="relative py-16"
          aria-label="दुकान की सुविधाएं"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.11 0.04 55) 0%, oklch(0.13 0.045 60) 100%)",
          }}
        >
          {/* Gold stripe top */}
          <div
            className="section-gold-stripe pointer-events-none absolute left-0 right-0 top-0"
            aria-hidden="true"
          />

          {/* Right side silver glow accent */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/3"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 100% 50%, oklch(0.80 0.01 200 / 0.06) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-block h-1 w-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.85 0.22 75), oklch(0.90 0.00 0), oklch(0.95 0.08 85))",
                  }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.88 0.08 80)" }}
                >
                  क्या-क्या मिलता है
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                सुविधाएं और लाभ
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "oklch(0.58 0.03 70)" }}
              >
                इस व्यावसायिक स्थान में शामिल सभी सुविधाएं
              </p>
            </motion.div>

            {/* ─── Key Advantages ─── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-12 grid gap-4 sm:grid-cols-3"
            >
              {keyAdvantages.map((adv, i) => {
                const ms = metalStyles[adv.metal];
                return (
                  <motion.div
                    key={adv.title}
                    variants={itemVariants}
                    className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6"
                    style={{
                      background: ms.bg,
                      border: ms.border,
                      boxShadow: "0 4px 24px oklch(0.10 0.05 55 / 0.5)",
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: ms.glowHover,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Number badge */}
                    <div
                      className="absolute right-4 top-4 text-4xl font-bold opacity-[0.06] font-display"
                      style={{ color: ms.glow }}
                    >
                      0{i + 1}
                    </div>
                    {/* Top glow */}
                    <div
                      className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-55"
                      style={{ background: ms.glow }}
                    />
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: ms.iconBg,
                        border: `1px solid ${ms.glow.replace(")", " / 0.28)")}`,
                        color: ms.iconColor,
                        boxShadow: `inset 0 1px 0 ${ms.iconColor.replace(")", " / 0.22)")}`,
                      }}
                    >
                      {adv.icon}
                    </div>
                    <div>
                      <p
                        className="font-display text-base font-bold leading-tight"
                        style={{ color: "oklch(0.96 0.008 85)" }}
                      >
                        {adv.title}
                      </p>
                      <p
                        className="mt-2 text-sm leading-relaxed"
                        style={{ color: "oklch(0.62 0.03 70)" }}
                      >
                        {adv.description}
                      </p>
                    </div>
                    {/* Bottom metallic bar on hover */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${ms.glow}, transparent)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ─── Regular features ─── */}
            {isLoading ? (
              <FeaturesSkeleton />
            ) : isError ? null : shop ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Features features={shop.features} />
              </motion.div>
            ) : null}
          </div>

          {/* Bottom divider — white gold */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.95 0.08 85 / 0.30) 50%, transparent 100%)",
              boxShadow: "0 0 8px oklch(0.95 0.08 85 / 0.15)",
            }}
          />
        </section>

        {/* ─── Inquiry Form ─── */}
        <section
          id="contact"
          className="relative py-16"
          aria-label="संपर्क और जानकारी फ़ॉर्म"
          style={{ background: "oklch(0.10 0.05 55)" }}
        >
          {/* Central white gold spotlight glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "oklch(0.92 0.06 85 / 0.05)" }}
            aria-hidden="true"
          />

          <div className="container relative max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 text-center">
                <div className="mb-2 inline-flex items-center gap-2">
                  <span
                    className="inline-block h-px w-8"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, oklch(0.85 0.22 75 / 0.7))",
                    }}
                  />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "oklch(0.88 0.14 76)" }}
                  >
                    अभी बात करें
                  </span>
                  <span
                    className="inline-block h-px w-8"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.85 0.22 75 / 0.7), transparent)",
                    }}
                  />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  संपर्क करें
                </h2>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "oklch(0.58 0.03 70)" }}
                >
                  इस दुकान में रुचि है? हमें जानकारी भेजें और हम जल्द संपर्क करेंगे।
                </p>
              </div>

              {/* Form card — white gold border */}
              <div
                className="overflow-hidden rounded-2xl shiny-border-whitegold"
                style={{
                  border: "1px solid transparent",
                  background:
                    "linear-gradient(180deg, oklch(0.17 0.05 60) 0%, oklch(0.14 0.04 58) 100%) padding-box, linear-gradient(135deg, oklch(0.95 0.08 85), oklch(0.88 0.12 80), oklch(0.92 0.06 90)) border-box",
                }}
              >
                {/* Card top accent — tri-metal shimmer */}
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.65 0.20 55) 0%, oklch(0.85 0.22 75) 30%, oklch(0.90 0.00 0) 60%, oklch(0.95 0.08 85) 80%, oklch(0.65 0.20 55) 100%)",
                    boxShadow: "0 0 12px oklch(0.92 0.08 85 / 0.30)",
                  }}
                />
                <div className="px-6 pb-6 pt-5">
                  <div className="mb-5">
                    <h3
                      className="font-display text-lg font-semibold"
                      style={{ color: "oklch(0.95 0.008 85)" }}
                    >
                      जानकारी फ़ॉर्म
                    </h3>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "oklch(0.58 0.03 70)" }}
                    >
                      सभी जानकारी भरें — हम 24 घंटों में संपर्क करेंगे
                    </p>
                  </div>
                  <InquiryForm />
                </div>
              </div>

              {/* Direct call card — gold border */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 flex items-center gap-4 rounded-xl px-5 py-4 shiny-border-gold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.74 0.18 65 / 0.10), oklch(0.80 0.01 200 / 0.06))",
                  border: "1px solid transparent",
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.74 0.18 65 / 0.10), oklch(0.80 0.01 200 / 0.06)), linear-gradient(90deg, oklch(0.85 0.22 75), oklch(0.80 0.01 200), oklch(0.95 0.08 85))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.74 0.18 65 / 0.22), oklch(0.65 0.20 55 / 0.18))",
                    boxShadow:
                      "inset 0 1px 0 oklch(0.92 0.18 80 / 0.25), 0 0 12px oklch(0.74 0.18 65 / 0.15)",
                  }}
                >
                  <Phone
                    className="h-5 w-5"
                    style={{ color: "oklch(0.88 0.20 78)" }}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "oklch(0.62 0.04 70)" }}
                  >
                    सीधे मालिक से बात करें
                  </p>
                  <p
                    className="font-display text-base font-semibold"
                    style={{ color: "oklch(0.95 0.008 85)" }}
                  >
                    श्री सुधीर सिंह यादव
                  </p>
                </div>
                <a
                  href="tel:+917355646852"
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.74 0.18 65) 0%, oklch(0.88 0.18 78) 50%, oklch(0.65 0.20 55) 100%)",
                    color: "oklch(0.10 0.04 55)",
                    boxShadow:
                      "0 0 16px oklch(0.74 0.18 65 / 0.30), inset 0 1px 0 oklch(0.92 0.18 80 / 0.35)",
                  }}
                  data-ocid="contact.primary_button"
                >
                  <Phone className="h-3.5 w-3.5" />
                  कॉल करें
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer
        className="relative"
        style={{
          background: "oklch(0.08 0.04 55)",
        }}
      >
        {/* Tri-metal top border glow */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.74 0.18 65 / 0.6) 15%, oklch(0.88 0.22 80) 30%, oklch(0.90 0.00 0) 50%, oklch(0.95 0.08 85) 70%, oklch(0.74 0.18 65 / 0.6) 85%, transparent 100%)",
            boxShadow: "0 0 20px oklch(0.85 0.18 75 / 0.30)",
          }}
        />

        <div className="container py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.74 0.18 65) 0%, oklch(0.65 0.20 55) 100%)",
                    boxShadow:
                      "0 0 16px oklch(0.74 0.18 65 / 0.28), inset 0 1px 0 oklch(0.92 0.18 80 / 0.25)",
                  }}
                >
                  <Store
                    className="h-4 w-4"
                    style={{ color: "oklch(0.10 0.04 55)" }}
                  />
                </div>
                <span className="font-display text-lg font-bold text-foreground">
                  सिपरी बाजार किराया
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.52 0.03 65)" }}
              >
                सिपरी बाजार, झाँसी के केंद्र में किराये के लिए प्रमुख व्यावसायिक स्थान।
              </p>
            </div>

            {/* Address */}
            <div>
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.88 0.14 72)" }}
              >
                स्थान
              </h3>
              <div className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "oklch(0.80 0.14 70 / 0.70)" }}
                />
                <p className="text-sm" style={{ color: "oklch(0.52 0.03 65)" }}>
                  डॉ. तपन सिन्हा के पीछे,
                  <br />
                  सिपरी बाजार, झाँसी,
                  <br />
                  उत्तर प्रदेश
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="mb-3 text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.88 0.14 72)" }}
              >
                मालिक से संपर्क
              </h3>
              <div className="space-y-2">
                <p
                  className="font-semibold"
                  style={{ color: "oklch(0.92 0.008 85)" }}
                >
                  श्री सुधीर सिंह यादव
                </p>
                <div className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.80 0.14 70 / 0.70)" }}
                  />
                  <a
                    href="tel:+917355646852"
                    className="text-sm transition-colors duration-200 hover:text-foreground"
                    style={{ color: "oklch(0.52 0.03 65)" }}
                    data-ocid="footer.link"
                  >
                    +91 73556 46852
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row"
            style={{
              borderTop: "1px solid oklch(0.85 0.22 75 / 0.12)",
            }}
          >
            <p className="text-xs" style={{ color: "oklch(0.42 0.02 65)" }}>
              © {new Date().getFullYear()} सिपरी बाजार किराया, झाँसी। सर्वाधिकार
              सुरक्षित।
            </p>
            <p className="text-xs" style={{ color: "oklch(0.42 0.02 65)" }}>
              Built with ❤️ by Divyansh Yadav
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
