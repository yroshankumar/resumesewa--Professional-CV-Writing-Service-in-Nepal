import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function downloadResumeAsPdf(
  elementId: string = "resume-print-area",
  fileName: string = "Resume.pdf"
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Target element for PDF generation not found:", elementId);
    return false;
  }

  try {
    // Render high resolution canvas
    const canvas = await html2canvas(element, {
      scale: 2, // 2x resolution for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Multi-page handling if resume exceeds 1 A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("PDF generation failed:", error);
    // Fallback to browser print dialog
    window.print();
    return false;
  }
}

export function triggerPrintDialog() {
  window.print();
}
