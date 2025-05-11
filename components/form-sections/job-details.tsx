"use client";

import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FormValues } from "@/lib/form-schema";
import { CalendarIcon, Clipboard, UserCircle, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface JobDetailsProps {
  form: UseFormReturn<FormValues>;
}

export default function JobDetails({ form }: JobDetailsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vendorEngineers",
  });

  return (
    <div className="space-y-6 animate-fadeInUp">
      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Project Details</h3>
        
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Clipboard className="h-4 w-4 text-accent" />
                Job Description
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter detailed job description" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>

      <Card className="form-section">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Personnel</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", role: "" })}
            className="flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Person
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start p-3 border rounded-md bg-muted/20">
              <div className="flex-1 space-y-3">
                <FormField
                  control={form.control}
                  name={`vendorEngineers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-accent" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`vendorEngineers.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role/Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Schedule</h3>
        
        <FormField
          control={form.control}
          name="dateOfVisit"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-accent" />
                Date of Visit
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    </div>
  );
}