import { z } from 'zod';

// A smaller selection of services for this demonstration.
export const SERVICE_OPTIONS = [
  'Plastering',
  'Rendering',
  'Liquid screed',
  'Repairs and restoration',
  'Other / not sure',
] as const;

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2, 'Enter at least 2 characters for your first name.'),
  lastName: z.string().trim().min(2, 'Enter at least 2 characters for your last name.'),
  email: z.email('Enter a valid email address.'),
  phoneNumber: z.string().trim().refine((value) => {
    const compact = value.replace(/[\s()-]/g, '');
    return /^0\d{10}$/.test(compact) || /^\+44\d{10}$/.test(compact);
  }, 'Enter a UK phone number, such as 07123 456789 or +44 7123 456789.'),
  postcode: z.string().trim().regex(
    /^(GIR\s?0AA|(?:[A-Z]{1,2}\d[A-Z\d]?)\s?\d[A-Z]{2})$/i,
    'Enter a valid UK postcode.'
  ),
  service: z.enum(SERVICE_OPTIONS, { error: 'Choose a service.' }),
  message: z.string().trim().min(10, 'Describe the work in at least 10 characters.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// The service starts unselected.
export const contactFormDefaults = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  postcode: '',
  service: undefined,
  message: '',
};
