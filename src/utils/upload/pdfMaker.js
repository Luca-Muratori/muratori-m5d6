import PdfPrinter from "pdfmake";
import fs from "fs";

export const getPdfReadableStream = (blog) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-bold",
    },
  };
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      { image: blog.cover, width: 200, height: 200 },
      "Lorem ipsum dolor sit amet",
      { text: blog.title, style: "title" },
      "Lorem ipsum dolor sit amet",
      { text: blog.content, style: "text" },
      "Lorem ipsum dolor sit amet",
    ],
    style: {
      title: {
        fontSize: 15,
        bold: true,
      },
      text: {
        fontSize: 8,
        normal: true,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const PdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  PdfReadableStream.end();

  return PdfReadableStream;
};
