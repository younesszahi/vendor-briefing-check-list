"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/form-schema";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface BriefingProps {
  form: UseFormReturn<FormValues>;
}

export default function Briefing({ form }: BriefingProps) {
  return (
    <div className="space-y-6 animate-fadeInUp">
      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Pre-Brief Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="preBrief"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  Pre-Brief Details
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter pre-briefing details" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Include any information that was shared with the vendor before the visit.
                </p>
              </FormItem>
            )}
          />
        </div>
      </Card>

      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Post-Brief Information</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="postBrief"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  Post-Brief Details
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter post-briefing details" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-1">
                  Include any follow-up information or instructions provided after the visit.
                </p>
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}