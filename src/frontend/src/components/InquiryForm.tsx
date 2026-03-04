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
  if (!form.name.trim()) errors.name = "पूरा नाम आवश्यक है";
  if (!form.phone.trim()) {
    errors.phone = "फ़ोन नंबर आवश्यक है";
  } else if (!/^\d{7,15}$/.test(form.phone.replace(/[\s\-+()]/g, ""))) {
    errors.phone = "सही फ़ोन नंबर दर्ज करें";
  }
  if (!form.email.trim()) {
    errors.email = "ईमेल आवश्यक है";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "सही ईमेल पता दर्ज करें";
  }
  if (!form.message.trim()) errors.message = "संदेश आवश्यक है";
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
      toast.success("जानकारी सफलतापूर्वक भेजी गई! हम जल्द संपर्क करेंगे।");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("जानकारी भेजने में त्रुटि। पुनः प्रयास करें।");
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
          धन्यवाद!
        </h3>
        <p className="max-w-sm text-muted-foreground">
          आपकी जानकारी मिल गई है। हम 24 घंटे में वापस संपर्क करेंगे।
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2"
          data-ocid="inquiry.secondary_button"
        >
          दोबारा जानकारी भेजें
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="font-medium">
            पूरा नाम <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="आपका पूरा नाम"
            autoComplete="name"
            data-ocid="inquiry.input"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-ocid="inquiry.error_state"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="font-medium">
            फ़ोन नंबर <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="जैसे 9876543210"
            autoComplete="tel"
            data-ocid="inquiry.input"
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
          ईमेल पता <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          autoComplete="email"
          data-ocid="inquiry.input"
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
          संदेश <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="अपने व्यवसाय के बारे में बताएं..."
          rows={4}
          data-ocid="inquiry.textarea"
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
        data-ocid="inquiry.submit_button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            भेज रहे हैं...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            जानकारी भेजें
          </>
        )}
      </Button>
    </form>
  );
}
