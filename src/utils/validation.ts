import { z } from 'zod';

// User validation schema
export const userSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().optional(),
});

// Form validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Settings validation schema
export const settingsSchema = z.object({
  notifications: z.boolean(),
  biometrics: z.boolean(),
  analytics: z.boolean(),
  theme: z.enum(['light', 'dark', 'auto']),
});

// Utility functions for validation
export function validateUser(data: unknown) {
  return userSchema.safeParse(data);
}

export function validateLogin(data: unknown) {
  return loginSchema.safeParse(data);
}

export function validateRegister(data: unknown) {
  return registerSchema.safeParse(data);
}

export function validateSettings(data: unknown) {
  return settingsSchema.safeParse(data);
}

// Error handling utility
export function getValidationErrorMessage(error: z.ZodError): string {
  return error.errors.map(err => err.message).join(', ');
}