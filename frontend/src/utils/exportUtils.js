import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export class ExportUtils {
  static exportToPDF(data, columns, fileName = 'documento', title = 'Reporte') {
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(title, 14, 22);

      const headers = columns.map(col => col.header);
      const rows = data.map(item =>
        columns.map(col => {
          const value = item[col.acceso];
          return value !== null && value !== undefined ? String(value) : '';
        })
      );

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 30,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 30 },
      });

      doc.save(`${fileName}.pdf`);

      return { success: true, message: 'PDF exportado exitosamente' };
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      return { success: false, message: 'Error al exportar PDF' };
    }
  }
  
  static exportToExcel(data, columns, fileName = 'documento', sheetName = 'Datos') {
    try {
      const wb = XLSX.utils.book_new();
      
      const excelData = data.map(item => {
        const row = {};
        columns.forEach(col => {
          row[col.header] = item[col.acceso] !== null && item[col.acceso] !== undefined 
            ? item[col.acceso] 
            : '';
        });
        return row;
      });
      
      const ws = XLSX.utils.json_to_sheet(excelData);
      
      const colWidths = columns.map(col => {
        const maxLength = Math.max(
          col.header.length,
          ...data.map(item => {
            const value = item[col.acceso];
            return value ? String(value).length : 0;
          })
        );
        return { wch: Math.min(Math.max(maxLength + 2, 10), 50) };
      });
      
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      
      return { success: true, message: 'Excel exportado exitosamente' };
    } catch (error) {
      console.error('Error al exportar Excel:', error);
      return { success: false, message: 'Error al exportar Excel' };
    }
  }
}