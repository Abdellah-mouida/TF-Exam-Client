import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";

function PDFGenerator() {
  const pdfRef = useRef();

  // Generate PDF
  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgWidth = 210; // A4 size width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("user-info.pdf");
    });
  };

  return (
    <>
      <div className="pdf" ref={pdfRef}>
        <h1>User Info</h1>
        <p>Name : Abdellah Mouida</p>
        <p>Age : 17 Years Old</p>
        <p>Email : abdellah@gmail.com</p>
      </div>
      <button onClick={generatePDF}>Download</button>
    </>
  );
}

export default PDFGenerator;
