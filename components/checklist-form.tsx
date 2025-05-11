"use client";

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from '@/lib/form-schema';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FormProgress from '@/components/form-progress';
import VendorInformation from '@/components/form-sections/vendor-information';
import JobDetails from '@/components/form-sections/job-details';
import Briefing from '@/components/form-sections/briefing';
import Checklists from '@/components/form-sections/checklists';
import SignatureSection from '@/components/form-sections/signature-section';
import { CheckCircle, Download, Plus, ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';
import { generatePDF } from '@/lib/pdf-generator';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import AdditionalPage from '@/components/form-sections/additional-page';

export default function ChecklistForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [additionalPages, setAdditionalPages] = useState<string[]>([]);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const { toast } = useToast();
  const totalSteps = 5 + additionalPages.length;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorName: '',
      equipment: '',
      mcmSimtNo: '',
      jobDescription: '',
      vendorEngineers: [{ name: '', role: '' }],
      dateOfVisit: new Date(),
      preBrief: '',
      postBrief: '',
      security: {
        identityVerified: false,
        accessArrangements: false,
        cameraApproval: false,
        escortArrangements: false,
        confidentialityAgreement: false,
      },
      safety: {
        siteInduction: false,
        emergencyProcedures: false,
        firstAid: false,
        ppe: false,
        hazards: false,
        reporting: false,
        evacuationRoutes: false,
      },
      mcmProcess: {
        workscope: false,
        boundaries: false,
        qualityExpectations: false,
        acceptanceCriteria: false,
      },
      escalation: {
        chain: false,
      },
      additionalPages: [],
      signatureType: 'draw',
      signatureData: '',
    }
  });

  const handleAddPage = () => {
    const newPageId = `page-${additionalPages.length + 1}`;
    setAdditionalPages([...additionalPages, newPageId]);
    
    const currentAdditionalPages = form.getValues('additionalPages') || [];
    form.setValue('additionalPages', [
      ...currentAdditionalPages, 
      { id: newPageId, title: `Additional Page ${additionalPages.length + 1}`, content: [], questions: [] }
    ]);
    
    toast({
      title: "Page Added",
      description: `New page "${newPageId}" has been added to the form.`,
    });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setShowCompletionDialog(true);
  };

  const handleGeneratePDF = async () => {
    const formData = form.getValues();
    try {
      await generatePDF(formData);
      toast({
        title: "PDF Generated",
        description: "Your PDF has been generated and will download shortly.",
      });
      setShowCompletionDialog(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was an issue generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VendorInformation form={form} />;
      case 2:
        return <JobDetails form={form} />;
      case 3:
        return <Briefing form={form} />;
      case 4:
        return <Checklists form={form} />;
      case 5:
        return <SignatureSection form={form} />;
      default:
        const pageIndex = currentStep - 6;
        if (pageIndex >= 0 && pageIndex < additionalPages.length) {
          return <AdditionalPage form={form} pageId={additionalPages[pageIndex]} index={pageIndex} />;
        }
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Vendor Information";
      case 2:
        return "Job Details";
      case 3:
        return "Briefing";
      case 4:
        return "Checklists";
      case 5:
        return "Signature";
      default:
        const pageIndex = currentStep - 6;
        if (pageIndex >= 0 && pageIndex < additionalPages.length) {
          return `Additional Page ${pageIndex + 1}`;
        }
        return "";
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="animate-fadeIn">
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-amazon-blue text-white">
            <CardTitle className="text-2xl flex items-center justify-between">
              <span>CDG70 Vendor Briefing Checklist</span>
              <span className="text-amazon-orange font-bold">{currentStep}/{totalSteps}</span>
            </CardTitle>
            <CardDescription className="text-gray-200">
              Complete all sections to generate your checklist report
            </CardDescription>
          </CardHeader>
          
          <div className="p-4">
            <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b text-accent">
              {getStepTitle()}
            </h2>
            
            <div className="animate-slideIn">
              {renderStep()}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between border-t p-6 bg-muted/50">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-amazon-orange hover:bg-amazon-orange/90 text-white flex items-center gap-2"
                >
                  <CheckCircle size={16} /> Complete
                </Button>
              )}
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddPage}
                className="flex items-center gap-2"
              >
                <Plus size={16} /> Add Page
              </Button>
              
              <Button 
                type="button" 
                onClick={handleGeneratePDF}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Download size={16} /> Generate PDF
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-accent">
                <FileCheck className="h-6 w-6" />
                Checklist Complete
              </DialogTitle>
              <DialogDescription>
                Your vendor briefing checklist has been completed successfully. Would you like to generate a PDF report now?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCompletionDialog(false)}
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={handleGeneratePDF}
                className="bg-amazon-orange hover:bg-amazon-orange/90 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
}