import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useQueries";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{7,15}$/.test(form.phone.replace(/[\s\-+()]/g, ""))) {
    errors.phone = "Please enter a valid phone number (digits only)";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function InquiryForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await mutation.mutateAsync(form);
      setSubmitted(true);
      toast.success(
        "Inquiry submitted successfully! We'll contact you shortly.",
      );
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          Thank You!
        </h3>
        <p className="max-w-sm text-muted-foreground">
          Your inquiry has been submitted. We'll get back to you within 24
          hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2"
        >
          Send Another Inquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <p className="text-xs text-destructive" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="font-medium">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            autoComplete="tel"
            className={
              errors.phone
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.phone && (
            <p className="text-xs text-destructive" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="font-medium">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          autoComplete="email"
          className={
            errors.email
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.email && (
          <p className="text-xs text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="font-medium">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your business and when you'd like to visit..."
          rows={4}
          className={
            errors.message
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.message && (
          <p className="text-xs text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Inquiry
          </>
        )}
      </Button>
    </form>
  );
}
