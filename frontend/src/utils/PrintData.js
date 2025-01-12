const printData = () => {
  const printContent = document.getElementById("printable");
  const images = printContent.getElementsByTagName("img");
  const statusTexts = printContent.getElementsByClassName("text-sm opacity-50");
  const svgIcons = printContent.getElementsByClassName("svg-inline--fa");
  const actionColumns = printContent.querySelectorAll(
    "th:last-child, td:last-child"
  );

  Array.from(images).forEach((img) => {
    img.style.display = "none";
  });

  Array.from(statusTexts).forEach((text) => {
    text.style.display = "none";
  });

  Array.from(svgIcons).forEach((icon) => {
    icon.style.display = "none";
  });

  Array.from(actionColumns).forEach((col) => {
    col.style.display = "none";
  });

  const printWindow = window.open("", "", "height=650,width=900");
  printWindow.document.write("<html><head><title>Print</title>");
  printWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    `);
  printWindow.document.write("</head><body>");
  printWindow.document.write(printContent.innerHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();

  Array.from(images).forEach((img) => {
    img.style.display = "block";
  });

  Array.from(statusTexts).forEach((text) => {
    text.style.display = "block";
  });

  Array.from(svgIcons).forEach((icon) => {
    icon.style.display = "block";
  });

  Array.from(actionColumns).forEach((col) => {
    col.style.display = "table-cell";
  });
};

export default printData;
