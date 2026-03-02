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
  Mail,
  MapPin,
  Phone,
  Ruler,
  Shield,
  Sofa,
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
};

const keyAdvantages = [
  {
    title: "Modular Glass Front",
    description:
      "Stylish modular glass facade for maximum visibility and curb appeal",
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Double Shutter",
    description:
      "Heavy-duty double shutter door for enhanced security and easy access",
    icon: <DoorOpen className="h-6 w-6" />,
  },
  {
    title: "Full Furniture Included",
    description:
      "Fully furnished and move-in ready — bring your business, not your furniture",
    icon: <Sofa className="h-6 w-6" />,
  },
];

function getFeatureIcon(feature: string): React.ReactNode {
  return featureIconMap[feature] ?? <CheckCircle2 className="h-5 w-5" />;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
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
          <Badge className="mt-1 gap-1.5 bg-success/10 text-success hover:bg-success/20 border-success/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Available
          </Badge>
        ) : (
          <Badge variant="destructive" className="mt-1 gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            Not Available
          </Badge>
        )}
      </div>

      <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20">
            <Ruler className="h-4.5 w-4.5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Shop Size
            </p>
            <p className="font-semibold text-foreground">
              {shop.size} (209 sq ft)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20">
            <MapPin className="h-4.5 w-4.5 text-accent-foreground" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Address
            </p>
            <p className="font-semibold text-foreground">{shop.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <IndianRupee className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Monthly Rent
            </p>
            <p className="font-display text-xl font-bold text-primary">
              ₹20,000
              <span className="ml-1 font-body text-sm font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
            <IndianRupee className="h-4.5 w-4.5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Security Advance
            </p>
            <p className="font-display text-xl font-bold text-amber-600">
              ₹10,00,000
              <span className="ml-1 font-body text-sm font-normal text-muted-foreground">
                one time
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              shop.isAvailable ? "bg-success/10" : "bg-destructive/10"
            }`}
          >
            {shop.isAvailable ? (
              <CheckCircle2 className="h-4.5 w-4.5 text-success" />
            ) : (
              <XCircle className="h-4.5 w-4.5 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Availability
            </p>
            <p
              className={`font-semibold ${shop.isAvailable ? "text-success" : "text-destructive"}`}
            >
              {shop.isAvailable ? "Ready to Move In" : "Currently Occupied"}
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
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {features.map((feature) => (
        <motion.div
          key={feature}
          variants={itemVariants}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-xs transition-shadow hover:shadow-card"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
            {getFeatureIcon(feature)}
          </div>
          <span className="text-sm font-medium leading-tight text-foreground">
            {feature}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const { data: shop, isLoading, isError } = useGetShop();

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Sipri Bazar Rentals
            </span>
          </div>
          <nav className="hidden items-center gap-6 sm:flex">
            <a
              href="#details"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Details
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Inquire Now
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5"
          aria-label="Hero section"
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, oklch(0.22 0.06 265) 0px, oklch(0.22 0.06 265) 1px, transparent 1px, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="container relative py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                <MapPin className="h-3.5 w-3.5 text-accent-foreground" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  Sipri Bazar, Jhansi
                </span>
              </div>

              <h1 className="font-display mb-4 text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
                Shop{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "oklch(0.72 0.16 65)" }}
                >
                  For Rent
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                    style={{ background: "oklch(0.72 0.16 65 / 0.4)" }}
                  />
                </span>
              </h1>

              <p className="mb-6 text-lg text-muted-foreground sm:text-xl">
                Prime Commercial Space in Sipri Bazar, Jhansi — perfectly sized
                at <strong className="text-foreground">19 × 11 ft</strong> for
                your growing business.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {isLoading ? (
                  <Skeleton className="h-8 w-28 rounded-full" />
                ) : shop?.isAvailable ? (
                  <Badge className="gap-1.5 rounded-full px-3 py-1.5 text-sm bg-success/10 text-success hover:bg-success/20 border-success/30">
                    <CheckCircle2 className="h-4 w-4" />
                    Available Now
                  </Badge>
                ) : (
                  <Badge
                    variant="destructive"
                    className="gap-1.5 rounded-full px-3 py-1.5 text-sm"
                  >
                    <XCircle className="h-4 w-4" />
                    Not Available
                  </Badge>
                )}

                {isLoading ? (
                  <Skeleton className="h-8 w-36 rounded-full" />
                ) : (
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold"
                    style={{
                      borderColor: "oklch(0.22 0.06 265 / 0.2)",
                      color: "oklch(0.22 0.06 265)",
                      background: "oklch(0.22 0.06 265 / 0.06)",
                    }}
                  >
                    <IndianRupee className="h-3.5 w-3.5" />
                    ₹20,000/month · ₹10L Advance
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Shop Visual / Photo + Floor Plan ─── */}
        <section
          className="border-b border-border py-14"
          aria-label="Shop images"
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Shop Preview
              </h2>
              <p className="mt-1 text-muted-foreground">
                View the commercial space and floor plan layout
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ShopModel3D />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Interactive 3D model — 19 × 11 ft shop, Sipri Bazar, Jhansi
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center"
              >
                <FloorPlan />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Shop Details ─── */}
        <section
          id="details"
          className="border-b border-border py-14"
          aria-label="Shop details"
        >
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <ShopDetailsSkeleton />
              ) : isError ? (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-8 text-center">
                  <XCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
                  <p className="font-semibold text-foreground">
                    Failed to load shop details
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please refresh the page to try again.
                  </p>
                </div>
              ) : shop ? (
                <ShopDetails shop={shop} />
              ) : null}
            </motion.div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section
          id="features"
          className="border-b border-border py-14"
          style={{ background: "oklch(0.97 0.008 85)" }}
          aria-label="Shop features and amenities"
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Features & Amenities
              </h2>
              <p className="mt-1 text-muted-foreground">
                Everything included with this commercial space
              </p>
            </motion.div>

            {/* ─── Key Advantages ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="inline-block h-1 w-8 rounded-full"
                  style={{ background: "oklch(0.72 0.16 65)" }}
                />
                <h3
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.72 0.16 65)" }}
                >
                  Key Advantages
                </h3>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {keyAdvantages.map((adv) => (
                  <motion.div
                    key={adv.title}
                    variants={itemVariants}
                    className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5"
                    style={{
                      background: "oklch(0.22 0.06 265)",
                      boxShadow: "0 4px 24px oklch(0.22 0.06 265 / 0.18)",
                    }}
                  >
                    {/* Decorative glow */}
                    <div
                      className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl"
                      style={{ background: "oklch(0.72 0.16 65)" }}
                    />
                    <div
                      className="relative flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: "oklch(0.72 0.16 65 / 0.18)" }}
                    >
                      <span style={{ color: "oklch(0.72 0.16 65)" }}>
                        {adv.icon}
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-display text-base font-bold leading-tight"
                        style={{ color: "oklch(0.97 0.008 85)" }}
                      >
                        {adv.title}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "oklch(0.78 0.02 265)" }}
                      >
                        {adv.description}
                      </p>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60"
                      style={{ background: "oklch(0.72 0.16 65)" }}
                    />
                  </motion.div>
                ))}
              </motion.div>
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
        </section>

        {/* ─── Inquiry Form ─── */}
        <section
          id="contact"
          className="py-14"
          aria-label="Contact and inquiry form"
        >
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Get In Touch
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Interested in this space? Send us your inquiry and we'll get
                  back to you quickly.
                </p>
              </div>

              <Card className="shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-lg font-semibold">
                    Inquiry Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <InquiryForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer
        className="border-t border-border py-10"
        style={{ background: "oklch(0.22 0.06 265)" }}
      >
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                  <Store
                    className="h-4 w-4 text-accent-foreground"
                    style={{ color: "oklch(0.72 0.16 65)" }}
                  />
                </div>
                <span className="font-display text-lg font-bold text-white">
                  Sipri Bazar Rentals
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.02 265)" }}
              >
                Prime commercial space available for rent in the heart of Sipri
                Bazar, Jhansi.
              </p>
            </div>

            {/* Address */}
            <div>
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.72 0.16 65)" }}
              >
                Location
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.72 0.16 65)" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.02 265)" }}
                  >
                    Back of Dr Tapan Sinha,
                    <br />
                    Sipri Bazar, Jhansi,
                    <br />
                    Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-wider"
                style={{ color: "oklch(0.72 0.16 65)" }}
              >
                Contact Owner
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">
                  Mr Sudhir Singh Yadav
                </p>
                <div className="flex items-center gap-2">
                  <Phone
                    className="h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.72 0.16 65)" }}
                  />
                  <a
                    href="tel:+917355646852"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "oklch(0.78 0.02 265)" }}
                  >
                    +91 73556 46852
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
            style={{ borderColor: "oklch(1 0 0 / 10%)" }}
          >
            <p className="text-xs" style={{ color: "oklch(0.60 0.02 265)" }}>
              © {new Date().getFullYear()} Sipri Bazar Rentals, Jhansi. All
              rights reserved.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.60 0.02 265)" }}>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-white"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
