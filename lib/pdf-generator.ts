"use client";

import { jsPDF } from "jspdf";
import { FormValues } from "./form-schema";
import { format } from "date-fns";

export const generatePDF = async (data: FormValues): Promise<void> => {
  try {
    // Create a new PDF document with professional formatting
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set document properties
    pdf.setProperties({
      title: "CDG70 Vendor Briefing Checklist",
      subject: "Vendor Briefing",
      author: "CDG70",
      creator: "CDG70 Vendor Briefing System",
    });

    // Define consistent styling
    const colors = {
      amazonBlue: [35, 47, 62],    // #232f3e
      amazonOrange: [255, 153, 0], // #ff9900
      text: [33, 33, 33],         // #212121
      subtext: [97, 97, 97],      // #616161
      border: [224, 224, 224],    // #e0e0e0
    };

    const fonts = {
      title: { size: 20, style: "bold" },
      heading: { size: 14, style: "bold" },
      subheading: { size: 12, style: "bold" },
      normal: { size: 10, style: "normal" },
      small: { size: 8, style: "normal" },
    };

    // Header with logo and title
    pdf.setFillColor(...colors.amazonBlue);
    pdf.rect(0, 0, 210, 30, "F");
    
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(fonts.title.size);
    pdf.setFont("helvetica", fonts.title.style);
    pdf.text("CDG70 Vendor Briefing Checklist", 105, 15, { align: "center" });
    
    // Date
    pdf.setFontSize(fonts.small.size);
    pdf.text(format(new Date(), "PPP"), 105, 22, { align: "center" });

    let yPos = 40;
    const margin = 20;
    const pageWidth = 210 - (2 * margin);

    // Section: Vendor Information
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.heading.size);
    pdf.setFont("helvetica", fonts.heading.style);
    pdf.text("Vendor Information", margin, yPos);
    yPos += 8;

    // Add orange accent line under section title
    pdf.setDrawColor(...colors.amazonOrange);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, margin + 40, yPos);
    yPos += 8;

    // Content
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", fonts.normal.style);

    const addField = (label: string, value: string) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(`${label}:`, margin, yPos);
      pdf.setFont("helvetica", "normal");
      pdf.text(value, margin + 40, yPos);
      yPos += 7;
    };

    addField("Vendor Name", data.vendorName);
    addField("Equipment", data.equipment);
    addField("MCM/SIM-T No.", data.mcmSimtNo);
    yPos += 5;

    // Section: Job Details
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.heading.size);
    pdf.setFont("helvetica", fonts.heading.style);
    pdf.text("Job Details", margin, yPos);
    yPos += 8;

    pdf.setDrawColor(...colors.amazonOrange);
    pdf.line(margin, yPos, margin + 40, yPos);
    yPos += 8;

    // Job Description
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "bold");
    pdf.text("Job Description:", margin, yPos);
    yPos += 6;

    pdf.setFont("helvetica", "normal");
    const jobDescLines = pdf.splitTextToSize(data.jobDescription, pageWidth - 20);
    pdf.text(jobDescLines, margin, yPos);
    yPos += (jobDescLines.length * 6) + 8;

    // Engineers
    pdf.setFont("helvetica", "bold");
    pdf.text("Vendor/DCEO Engineers:", margin, yPos);
    yPos += 6;

    data.vendorEngineers.forEach((engineer, index) => {
      pdf.setFont("helvetica", "normal");
      const engineerText = `${index + 1}. ${engineer.name}${engineer.role ? ` (${engineer.role})` : ''}`;
      pdf.text(engineerText, margin + 5, yPos);
      yPos += 6;
    });

    // Add new page for briefing information
    pdf.addPage();
    yPos = 40;

    // Briefing Section
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.heading.size);
    pdf.setFont("helvetica", fonts.heading.style);
    pdf.text("Briefing Information", margin, yPos);
    yPos += 8;

    pdf.setDrawColor(...colors.amazonOrange);
    pdf.line(margin, yPos, margin + 40, yPos);
    yPos += 8;

    // Pre-Brief
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.subheading.size);
    pdf.setFont("helvetica", "bold");
    pdf.text("Pre-Brief Information:", margin, yPos);
    yPos += 6;

    if (data.preBrief) {
      pdf.setFont("helvetica", "normal");
      const preBriefLines = pdf.splitTextToSize(data.preBrief, pageWidth - 20);
      pdf.text(preBriefLines, margin, yPos);
      yPos += (preBriefLines.length * 6) + 8;
    } else {
      pdf.setFont("helvetica", "italic");
      pdf.text("No pre-brief information provided", margin, yPos);
      yPos += 8;
    }

    // Post-Brief
    pdf.setFont("helvetica", "bold");
    pdf.text("Post-Brief Information:", margin, yPos);
    yPos += 6;

    if (data.postBrief) {
      pdf.setFont("helvetica", "normal");
      const postBriefLines = pdf.splitTextToSize(data.postBrief, pageWidth - 20);
      pdf.text(postBriefLines, margin, yPos);
      yPos += (postBriefLines.length * 6) + 8;
    } else {
      pdf.setFont("helvetica", "italic");
      pdf.text("No post-brief information provided", margin, yPos);
      yPos += 8;
    }

    // Add new page for checklists
    pdf.addPage();
    yPos = 40;

    // Checklists Section
    const addChecklistItem = (text: string, checked: boolean) => {
      const checkMark = checked ? "☑" : "☐";
      pdf.text(`${checkMark} ${text}`, margin + 5, yPos);
      yPos += 6;
    };

    // Security Checklist
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.heading.size);
    pdf.setFont("helvetica", fonts.heading.style);
    pdf.text("Security Checklist", margin, yPos);
    yPos += 8;

    pdf.setDrawColor(...colors.amazonOrange);
    pdf.line(margin, yPos, margin + 40, yPos);
    yPos += 8;

    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "normal");

    addChecklistItem("Identity Verified", data.security.identityVerified);
    addChecklistItem("Access Arrangements", data.security.accessArrangements);
    addChecklistItem("Camera Approval", data.security.cameraApproval);
    addChecklistItem("Escort Arrangements", data.security.escortArrangements);
    addChecklistItem("Confidentiality Agreement", data.security.confidentialityAgreement);
    yPos += 5;

    // Safety Checklist
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.subheading.size);
    pdf.setFont("helvetica", fonts.subheading.style);
    pdf.text("Safety Checklist", margin, yPos);
    yPos += 8;

    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "normal");

    addChecklistItem("Site Induction", data.safety.siteInduction);
    addChecklistItem("Emergency Procedures", data.safety.emergencyProcedures);
    addChecklistItem("First Aid", data.safety.firstAid);
    addChecklistItem("PPE Requirements", data.safety.ppe);
    addChecklistItem("Hazards", data.safety.hazards);
    addChecklistItem("Incident Reporting", data.safety.reporting);
    addChecklistItem("Evacuation Routes", data.safety.evacuationRoutes);
    yPos += 5;

    // MCM Process/Workscopes
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.subheading.size);
    pdf.setFont("helvetica", fonts.subheading.style);
    pdf.text("MCM Process/Workscopes", margin, yPos);
    yPos += 8;

    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "normal");

    addChecklistItem("Workscope Definition", data.mcmProcess.workscope);
    addChecklistItem("Boundaries", data.mcmProcess.boundaries);
    addChecklistItem("Quality Expectations", data.mcmProcess.qualityExpectations);
    addChecklistItem("Acceptance Criteria", data.mcmProcess.acceptanceCriteria);
    yPos += 5;

    // Escalation Process
    pdf.setTextColor(...colors.amazonBlue);
    pdf.setFontSize(fonts.subheading.size);
    pdf.setFont("helvetica", fonts.subheading.style);
    pdf.text("Escalation Process", margin, yPos);
    yPos += 8;

    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "normal");

    addChecklistItem("Escalation Chain", data.escalation.chain);
    yPos += 5;

    // Add signature page
    pdf.addPage();
    yPos = 40;

    // Approval header
    pdf.setFillColor(...colors.amazonBlue);
    pdf.rect(0, 0, 210, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(fonts.heading.size);
    pdf.text("Approval & Signature", 105, 20, { align: "center" });

    // Approval text
    pdf.setTextColor(...colors.text);
    pdf.setFontSize(fonts.normal.size);
    pdf.setFont("helvetica", "normal");
    const approvalText = "I hereby confirm that all items in this vendor briefing checklist have been thoroughly reviewed and properly addressed according to company policies and procedures. By signing below, I acknowledge my understanding and acceptance of all the information provided in this document.";
    const approvalLines = pdf.splitTextToSize(approvalText, pageWidth - 20);
    pdf.text(approvalLines, margin, yPos);
    yPos += (approvalLines.length * 6) + 15;

    // Add signature
    if (data.signatureData) {
      pdf.setFont("helvetica", "bold");
      pdf.text("Authorized Signature:", margin, yPos);
      yPos += 10;

      try {
        pdf.addImage(data.signatureData, 'PNG', margin, yPos, 60, 30);
        yPos += 35;
      } catch (error) {
        console.error("Error adding signature:", error);
        pdf.setFont("helvetica", "italic");
        pdf.text("Signature could not be processed", margin, yPos);
        yPos += 10;
      }
    }

    // Add date
    pdf.setFont("helvetica", "bold");
    pdf.text("Date:", margin, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(format(new Date(), "PPP"), margin + 20, yPos);

    // Footer
    pdf.setFillColor(...colors.amazonBlue);
    pdf.rect(0, 277, 210, 20, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(fonts.small.size);
    pdf.text("CDG70 Vendor Briefing Checklist - CONFIDENTIAL", 105, 287, { align: "center" });

    // Save the PDF
    pdf.save("CDG70_Vendor_Briefing_Checklist.pdf");
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error generating PDF:", error);
    return Promise.reject(error);
  }
};