import React from 'react';
import jsPDF from 'jspdf';
import useFetch from '@/hooks/useFetch';
import 'jspdf-autotable';

const PdfCreate = () => {
  const { data, loading } = useFetch("/notice/Constitution");

  const handleDownload = () => {
    const doc = new jsPDF();
    const fontSize = 10; // Change this to the desired font size
    doc.setFont('helvetica');
    doc.setFontSize(fontSize);

    doc.text('Member ID', 10, 10);
    doc.text('Member Name', 10, 20);
    doc.text('Invoice ID', 110, 10);
    doc.text('Token Type', 110, 20);

    
    doc.text('Member ID', 10, 60);
    doc.text('Member Name', 10, 70);
    doc.text('Invoice ID', 110, 60);
    doc.text('Token Type', 110, 70);

    
    doc.text('Member ID', 10, 110);
    doc.text('Member Name', 10, 120);
    doc.text('Invoice ID', 110, 110);
    doc.text('Token Type', 110, 120);

    doc.text('Member ID', 10, 160);
    doc.text('Member Name', 10, 170);
    doc.text('Invoice ID', 110, 160);
    doc.text('Token Type', 110, 170);

    doc.text('Member ID', 10, 210);
    doc.text('Member Name', 10, 220);
    doc.text('Invoice ID', 110, 210);
    doc.text('Token Type', 110, 220);

    doc.text('Member ID', 10, 260);
    doc.text('Member Name', 10, 270);
    doc.text('Invoice ID', 110, 260);
    doc.text('Token Type', 110, 270);





    // doc.save('invoice.pdf');

    // Generate a data URL for the PDF
    const dataUri = doc.output('datauristring');

    // Open the PDF in a new browser tab
    const newTab = window.open();
    newTab.document.write(`<iframe width="100%" height="100%" src="${dataUri}" frameborder="0"></iframe>`);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PdfCreate;
