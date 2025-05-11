"use client";

import { useState, useRef } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/form-schema";
import { PenTool, Upload, RefreshCw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SignatureCanvas from "react-signature-canvas";
import { Label } from "@/components/ui/label";
import { generatePDF } from "@/lib/pdf-generator";
import Image from "next/image";

interface SignatureSectionProps {
  form: UseFormReturn<FormValues>;
}

export default function SignatureSection({ form }: SignatureSectionProps) {
  const [signatureType, setSignatureType] = useState(form.getValues().signatureType || "draw");
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      form.setValue("signatureData", "");
      setPreview(null);
    }
  };

  const saveSignature = async () => {
    if (signatureRef.current) {
      if (signatureRef.current.isEmpty()) {
        setError("Please provide a signature before saving");
        return;
      }

      const dataURL = signatureRef.current.toDataURL("image/png");
      form.setValue("signatureData", dataURL);
      setPreview(dataURL);
      setError(null);

      // Automatically generate PDF when signature is saved
      try {
        await generatePDF(form.getValues());
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.includes("image/")) {
      setError("Please upload an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataURL = event.target?.result as string;
      form.setValue("signatureData", dataURL);
      setPreview(dataURL);

      // Automatically generate PDF when signature is uploaded
      try {
        await generatePDF(form.getValues());
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      <Card className="form-section">
        <h3 className="text-lg font-medium mb-4">Signature Method</h3>
        <FormField
          control={form.control}
          name="signatureType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSignatureType(value as "upload" | "draw");
                    setPreview(null);
                    setError(null);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draw" id="draw" />
                    <Label htmlFor="draw" className="flex items-center gap-2 cursor-pointer">
                      <PenTool className="h-4 w-4 text-accent" />
                      Draw Signature
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" />
                    <Label htmlFor="upload" className="flex items-center gap-2 cursor-pointer">
                      <Upload className="h-4 w-4 text-accent" />
                      Upload Signature
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>

      {signatureType === "draw" ? (
        <Card className="form-section">
          <h3 className="text-lg font-medium mb-4">Draw Your Signature</h3>
          <div className="signature-container">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                className: `signature-canvas ${form.getValues().signatureType === "dark" ? "dark" : ""}`,
                width: 500,
                height: 200,
              }}
            />
            <div className="flex gap-2 mt-3">
              <Button type="button" variant="outline" onClick={clearSignature} className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
              <Button type="button" onClick={saveSignature} className="flex items-center gap-1">
                <PenTool className="h-4 w-4" />
                Save Signature
              </Button>
            </div>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>
        </Card>
      ) : (
        <Card className="form-section">
          <h3 className="text-lg font-medium mb-4">Upload Your Signature</h3>
          <div className="signature-container">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-muted/30 transition-colors"
                 onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-center text-muted-foreground">
                Click to upload or drag and drop<br />
                PNG, JPG (max. 5MB)
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>
        </Card>
      )}

      {preview && (
        <Card className="form-section">
          <h3 className="text-lg font-medium mb-4">Signature Preview</h3>
          <div className="bg-white p-4 rounded-md">
            <div className="relative h-[200px] w-full">
              <img src={preview} alt="Signature Preview" className="object-contain h-full" />
            </div>
          </div>
        </Card>
      )}

      <Card className="form-section bg-amazon-orange/10 border-amazon-orange/30">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-accent">Approval Confirmation</h3>
          <p className="text-muted-foreground">
            By submitting this form, I confirm that all the information provided is accurate and all checklist items have been properly reviewed and addressed according to company policy.
          </p>
        </div>
      </Card>
    </div>
  );
}