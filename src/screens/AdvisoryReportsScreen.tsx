// src/screens/AdvisoryReportsScreen.tsx
import type React from 'react';
import { ReportRowCard } from '../components/dashboard/ReportRowCard';
import { AuditSummaryCard } from '../components/dashboard/AuditSummaryCard';
import { securityExport } from '../services/SecurityExportService'; // Importado

export const AdvisoryReportsScreen: React.FC = () => {
  const reports = [
    { title: 'Balanço de Oferta e Demanda - Soja Julho 2026', type: 'PDF', size: '2.4 MB' },
    { title: 'Relatório de Risco Logístico e Line-up Santos', type: 'PDF', size: '1.8 MB' },
    { title: 'Nota de Fixação Eletrônica - Lote #XYUZ-992', type: 'XML', size: '45 KB' },
  ];

  const handleDownload = (title: string, type: string) => {
    // Roteamento inteligente de download baseado na extensão do arquivo fiscal
    if (type === 'XML') {
      securityExport.downloadMockInvoiceXml(title);
    } else {
      securityExport.downloadMockReportPdf(title);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      {/* Retenção COESI */}
      <div className="w-full">
        <AuditSummaryCard />
      </div>

      {/* Lista de Certidões */}
      <div className="space-y-4">
        <div className="border-b border-gray-800 pb-2">
          <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
            // DOCUMENTOS OPERACIONAIS DISPONÍVEIS
          </h3>
        </div>

        <div className="space-y-3">
          {reports.map((report, idx) => (
            <ReportRowCard 
              key={idx}
              title={report.title}
              type={report.type}
              size={report.size}
              onDownload={() => handleDownload(report.title, report.type)} // Ação plugada
            />
          ))}
        </div>
      </div>
    </div>
  );
};
