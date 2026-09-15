// src/screens/AdvisoryReportsScreen.tsx
import type React from 'react';
import { useEffect, useState } from 'react';
import { ReportRowCard } from '../components/dashboard/ReportRowCard';
import { AuditSummaryCard } from '../components/dashboard/AuditSummaryCard';
import { securityExport } from '../services/SecurityExportService';
import { api } from '../services/apiClient';

interface ReportItem {
  title: string;
  type: string;
  size: string;
}

// Fallback local (contingência) — usado se a API estiver indisponível.
const FALLBACK_REPORTS: ReportItem[] = [
  { title: 'Balanço de Oferta e Demanda - Soja Julho 2026', type: 'PDF', size: '2.4 MB' },
  { title: 'Relatório de Risco Logístico e Line-up Santos', type: 'PDF', size: '1.8 MB' },
  { title: 'Nota de Fixação Eletrônica - Lote #XYUZ-992', type: 'XML', size: '45 KB' },
];

/** Deriva o tipo de arquivo (PDF/XML) do título ou da URL. */
function inferType(title: string, downloadUrl?: string): string {
  const hay = `${downloadUrl ?? ''} ${title}`.toLowerCase();
  if (hay.includes('.xml') || hay.includes('xml')) return 'XML';
  return 'PDF';
}

export const AdvisoryReportsScreen: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(FALLBACK_REPORTS);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.getAdvisoryReports();
        if (!alive || !res.data?.length) return;
        setReports(res.data.map((r) => ({
          title: r.title,
          type: inferType(r.title, r.downloadUrl),
          size: r.size
        })));
      } catch {
        // Mantém o fallback local.
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleDownload = (title: string, type: string) => {
    if (type === 'XML') {
      securityExport.downloadMockInvoiceXml(title);
    } else {
      securityExport.downloadMockReportPdf(title);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full text-white bg-[#0B0F17]">
      <div className="w-full">
        <AuditSummaryCard />
      </div>

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
              onDownload={() => handleDownload(report.title, report.type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
