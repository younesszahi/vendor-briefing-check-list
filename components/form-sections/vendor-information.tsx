"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/form-schema";
import { Building2, Wrench, Hash } from "lucide-react";

interface VendorInformationProps {
  form: UseFormReturn<FormValues>;
}

export default function VendorInformation({ form }: VendorInformationProps) {
  return (
    <div className="space-y-6 animate-fadeInUp">
      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Company & Equipment Details</h3>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="vendorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-accent" />
                  Vendor Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter vendor company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="equipment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-accent" />
                  Equipment
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter equipment details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcmSimtNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-accent" />
                  MCM/SIM-T No.
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter MCM/SIM-T number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Card>
    </div>
  );
}