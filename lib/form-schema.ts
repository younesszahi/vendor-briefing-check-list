import { z } from 'zod';

// Define schema for vendor engineers
const vendorEngineerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
});

// Define schema for security checklist
const securitySchema = z.object({
  identityVerified: z.boolean().default(false),
  accessArrangements: z.boolean().default(false),
  cameraApproval: z.boolean().default(false),
  escortArrangements: z.boolean().default(false),
  confidentialityAgreement: z.boolean().default(false),
});

// Define schema for safety checklist
const safetySchema = z.object({
  siteInduction: z.boolean().default(false),
  emergencyProcedures: z.boolean().default(false),
  firstAid: z.boolean().default(false),
  ppe: z.boolean().default(false),
  hazards: z.boolean().default(false),
  reporting: z.boolean().default(false),
  evacuationRoutes: z.boolean().default(false),
});

// Define schema for MCM process/workscopes checklist
const mcmProcessSchema = z.object({
  workscope: z.boolean().default(false),
  boundaries: z.boolean().default(false),
  qualityExpectations: z.boolean().default(false),
  acceptanceCriteria: z.boolean().default(false),
});

// Define schema for escalation process checklist
const escalationSchema = z.object({
  chain: z.boolean().default(false),
});

// Schema for additional page question
const questionSchema = z.object({
  text: z.string(),
  type: z.enum(['text', 'checkbox', 'radio']),
  options: z.array(z.string()).optional(),
  answer: z.union([z.string(), z.boolean(), z.number()]).optional(),
});

// Schema for additional page
const additionalPageSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.array(z.string()).default([]),
  questions: z.array(questionSchema).default([]),
});

// Main form schema
export const formSchema = z.object({
  // Vendor Information
  vendorName: z.string().min(1, "Vendor name is required"),
  equipment: z.string().min(1, "Equipment is required"),
  mcmSimtNo: z.string().min(1, "MCM/SIM-T Number is required"),
  
  // Job Details
  jobDescription: z.string().min(1, "Job description is required"),
  vendorEngineers: z.array(vendorEngineerSchema).min(1, "At least one vendor engineer is required"),
  dateOfVisit: z.date(),
  
  // Briefing
  preBrief: z.string().optional(),
  postBrief: z.string().optional(),
  
  // Checklists
  security: securitySchema,
  safety: safetySchema,
  mcmProcess: mcmProcessSchema,
  escalation: escalationSchema,
  
  // Additional pages
  additionalPages: z.array(additionalPageSchema).default([]),
  
  // Signature
  signatureType: z.enum(['upload', 'draw']).default('draw'),
  signatureData: z.string().optional(),
  signatureFile: z.any().optional(),
});

export type FormValues = z.infer<typeof formSchema>;