'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SERVICE_OPTIONS,
  contactFormDefaults,
  contactFormSchema,
  type ContactFormValues,
} from '../validation/contactSchema';

const inputClassName =
  'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 aria-[invalid=true]:border-red-600';

const labelClassName = 'block text-sm font-medium text-slate-800';
const errorClassName = 'mt-1 text-sm text-red-700';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
    mode: 'onSubmit',
  });

  const onSubmit = (_values: ContactFormValues) => {
    // Portfolio demonstration only. No data is transmitted.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl rounded-xl border border-blue-200 bg-blue-50 p-6" aria-labelledby="demo-success-title" role="status">
        <h2 id="demo-success-title" className="text-xl font-semibold text-blue-950">
          Form validation successful
        </h2>
        <p className="mt-2 text-sm text-blue-900">
          This is a portfolio demonstration. No enquiry has been sent, and no details have been stored.
        </p>
        <button
          type="button"
          className="mt-5 rounded-md bg-blue-800 px-4 py-2 font-medium text-white hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
        >
          Try the form again
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Portfolio contact form demonstration"
      className="mx-auto max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">Request a quote</h2>
        <p className="mt-2 text-sm text-slate-600">
          Portfolio demo only — submitting validates the fields but does not send an enquiry.
        </p>
        <p className="mt-1 text-sm text-slate-600">All fields are required.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="firstName">First name</label>
          <input id="firstName" type="text" autoComplete="given-name" className={inputClassName}
            aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            {...register('firstName')} />
          {errors.firstName && <p id="firstName-error" role="alert" className={errorClassName}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="lastName">Last name</label>
          <input id="lastName" type="text" autoComplete="family-name" className={inputClassName}
            aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            {...register('lastName')} />
          {errors.lastName && <p id="lastName-error" role="alert" className={errorClassName}>{errors.lastName.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" className={inputClassName}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')} />
          {errors.email && <p id="email-error" role="alert" className={errorClassName}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="phoneNumber">Phone number</label>
          <input id="phoneNumber" type="tel" autoComplete="tel" inputMode="tel" placeholder="07123 456789" className={inputClassName}
            aria-invalid={!!errors.phoneNumber} aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
            {...register('phoneNumber')} />
          {errors.phoneNumber && <p id="phoneNumber-error" role="alert" className={errorClassName}>{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="postcode">Postcode</label>
          <input id="postcode" type="text" autoComplete="postal-code" className={inputClassName}
            aria-invalid={!!errors.postcode} aria-describedby={errors.postcode ? 'postcode-error' : undefined}
            {...register('postcode')} />
          {errors.postcode && <p id="postcode-error" role="alert" className={errorClassName}>{errors.postcode.message}</p>}
        </div>
        <div>
          <label className={labelClassName} htmlFor="service">Service required</label>
          <select id="service" className={inputClassName}
            aria-invalid={!!errors.service} aria-describedby={errors.service ? 'service-error' : undefined}
            {...register('service')}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          {errors.service && <p id="service-error" role="alert" className={errorClassName}>{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClassName} htmlFor="message">Tell us about the work</label>
        <textarea id="message" rows={5} className={inputClassName} placeholder="Describe the work you need..."
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')} />
        {errors.message && <p id="message-error" role="alert" className={errorClassName}>{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="w-full rounded-md bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        Validate enquiry (demo)
      </button>
    </form>
  );
}
