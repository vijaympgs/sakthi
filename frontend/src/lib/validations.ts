import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  enquiry_type: z.number().nullable().optional(),
  products: z.array(z.string()).min(1, "Select at least one product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;