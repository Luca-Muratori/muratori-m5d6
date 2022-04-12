import PdfPrinter from "pdfmake";
import fs from "fs";
import axios from "axios";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-bold",
  },
};
const printer = new PdfPrinter(fonts);
export const getPdfReadableStream = async (blog) => {
  let imagePart = {};
  if (blog.cover) {
    const response = await axios.get(blog.cover, {
      responseType: "arraybuffer",
    });
    const blogCoverURLParts = blog.cover.split("/");
    const fileName = blogCoverURLParts[blogCoverURLParts.length - 1];
    const [id, extension] = fileName.split(".");
    const base64 = response.data.toString("base64");
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 500, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    content: [
      imagePart,
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

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();

  return pdfReadableStream;
};
