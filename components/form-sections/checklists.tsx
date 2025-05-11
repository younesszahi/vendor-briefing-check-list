"use client";

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/form-schema";
import { Separator } from "@/components/ui/separator";
import { Shield, HardHat, Workflow, AlertTriangle } from "lucide-react";

interface ChecklistsProps {
  form: UseFormReturn<FormValues>;
}

export default function Checklists({ form }: ChecklistsProps) {
  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Security Checklist */}
      <Card className="form-section">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-accent" />
          Security Checks
        </h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="security.identityVerified"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Identity Verified</FormLabel>
                  <FormDescription>Vendor personnel identification has been checked and verified</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security.accessArrangements"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Access Arrangements</FormLabel>
                  <FormDescription>Access arrangements for restricted areas discussed and approved</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security.cameraApproval"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Camera Approval</FormLabel>
                  <FormDescription>Camera/recording devices usage approval discussed (if applicable)</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security.escortArrangements"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Escort Arrangements</FormLabel>
                  <FormDescription>Escort arrangements confirmed and understood</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security.confidentialityAgreement"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Confidentiality Agreement</FormLabel>
                  <FormDescription>Confidentiality requirements discussed and acknowledged</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Safety Checklist */}
      <Card className="form-section">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <HardHat className="h-5 w-5 text-accent" />
          Safety Checks
        </h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="safety.siteInduction"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Site Induction</FormLabel>
                  <FormDescription>Site safety induction completed</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.emergencyProcedures"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Emergency Procedures</FormLabel>
                  <FormDescription>Emergency procedures explained and understood</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.firstAid"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">First Aid</FormLabel>
                  <FormDescription>First aid facilities pointed out</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.ppe"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">PPE Requirements</FormLabel>
                  <FormDescription>Personal Protective Equipment requirements explained</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.hazards"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Hazards</FormLabel>
                  <FormDescription>Work area hazards identified and explained</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.reporting"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Incident Reporting</FormLabel>
                  <FormDescription>Incident reporting procedures explained</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="safety.evacuationRoutes"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Evacuation Routes</FormLabel>
                  <FormDescription>Evacuation routes and assembly areas pointed out</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* MCM Process/Workscopes Checklist */}
      <Card className="form-section">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Workflow className="h-5 w-5 text-accent" />
          MCM Process/Workscopes
        </h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="mcmProcess.workscope"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Workscope Definition</FormLabel>
                  <FormDescription>Clear definition of workscope provided and understood</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcmProcess.boundaries"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Boundaries</FormLabel>
                  <FormDescription>Work boundaries and limitations clearly defined</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcmProcess.qualityExpectations"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Quality Expectations</FormLabel>
                  <FormDescription>Quality expectations and standards clearly communicated</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcmProcess.acceptanceCriteria"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Acceptance Criteria</FormLabel>
                  <FormDescription>Acceptance criteria for completed work explained</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Card>

      {/* Escalation Process Checklist */}
      <Card className="form-section">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-accent" />
          Escalation Process
        </h3>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="escalation.chain"
            render={({ field }) => (
              <FormItem className="checklist-item flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">Escalation Chain</FormLabel>
                  <FormDescription>Chain of escalation for issues clearly defined and communicated</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Card>

      <Card className="form-section bg-secondary/30">
        <div className="space-y-2 py-2">
          <p className="text-primary font-medium">Approval Statement</p>
          <Separator className="my-2" />
          <p className="text-muted-foreground">By completing this form and signing below, you confirm that all the above items have been checked, addressed, and approved as required for this vendor visit.</p>
        </div>
      </Card>
    </div>
  );
}