// src/services/SecurityExportService.ts

class SecurityExportService {
  /**
   * Certificado mTLS mútua Fiserv
   */
  public exportMockCertificate(): void {
    const pemCertificate = `-----BEGIN CERTIFICATE-----\nMIIDdTCCAl2gAwIBAgILBAAAAAABFUMuMiwwDQYJKoZIhvcNAQELBQAwXDELMAkG\n...chaves_omitidas...\n-----END CERTIFICATE-----`;
    const blob = new Blob([pemCertificate], { type: 'application/x-x509-ca-cert' });
    this.triggerDownload(blob, 'xyuz_agrotrade_fiserv_prod.crt');
  }

  /**
   * Planilha de Auditoria COESI
   */
  public exportSecurityLogCsv(): void {
    const csvContent = [
      ['TIMESTAMP', 'EVENT_LEVEL', 'MODULE', 'IP_ADDRESS', 'DESCRIPTION_AUDIT'],
      ['2026-07-03T16:24:12Z', 'INFO', 'mTLS_GATEWAY', '186.234.12.98', 'Handshake TLS 1.3 estabelecido com sucesso.'],
      ['2026-07-03T15:10:05Z', 'SUCCESS', 'WEBHOOK_RECEIVER', '201.45.198.34', 'Assinatura validada via HMAC-SHA256.']
    ];
    const csvString = csvContent.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvString], { type: 'text/csv;charset=utf-8;' });
    this.triggerDownload(blob, 'security_audit_trail_coesi.csv');
  }

  /**
   * NOVO: Gera e baixa um template estruturado de Relatório Operacional (.txt)
   */
  public downloadMockReportPdf(title: string): void {
    const reportTemplate = `===================================================================
                  xYUz-AgroTrade // ADVISORY REPORT
===================================================================
DOCUMENTO: ${title.toUpperCase()}
EMISSÃO: 03/07/2026 17:25:00
STATUS: CONSOLIDADO E CERTIFICADO
CÂMARA: COESI / BANCO CENTRAL DO BRASIL

-------------------------------------------------------------------
RESUMO OPERACIONAL E PROJEÇÕES METEOROLÓGICAS:
-------------------------------------------------------------------
* Complexo portuário opera sob teto de line-up estável.
* Projeção de prêmio spot registra elevação técnica devido à retenção.
* Recomendação: Manter travas físicas ativas para o próximo trimestre.

-------------------------------------------------------------------
ASSINATURA DIGITAL DA MESA COMPLIANCE:
SHA256: 8f3b9d6211a4e4b9c712f5d96a1a1563c9b1a7798d1424a85ef1a4b82c3
===================================================================`;

    const blob = new Blob([reportTemplate], { type: 'text/plain;charset=utf-8;' });
    this.triggerDownload(blob, `${title.toLowerCase().replace(/ /g, '_')}.txt`);
  }

  /**
   * NOVO: Gera e baixa um template real estruturado de XML de Nota Fiscal Eletrônica (NF-e)
   */
  public downloadMockInvoiceXml(title: string): void {
    const xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<nfeProc xmlns="http://portalfiscal.inf.br" versao="4.00">
  <NFe>
    <infNFe Id="NFe35260712345678000199550010000009921000001234">
      <ide>
        <cUF>35</cUF>
        <natOp>Venda de Producao do Estabelecimento (Commodities)</natOp>
        <mod>55</mod>
        <dhEmi>2026-07-03T17:25:00-03:00</dhEmi>
        <tpNF>1</tpNF>
      </ide>
      <emit>
        <CNPJ>12345678000199</CNPJ>
        <xNome>xYUz AgroTrade e Exportacao S.A.</xNome>
        <IE>987654321110</IE>
      </emit>
      <dest>
        <xNome>Câmara Multi-PSP Fiserv Ledger</xNome>
      </dest>
      <det nItem="1">
        <prod>
          <xProd>${title}</xProd>
          <qCom>100.0000</qCom>
          <vUnCom>164.5000</vUnCom>
          <vProd>16450.00</vProd>
        </prod>
      </det>
    </infNFe>
  </NFe>
</nfeProc>`;

    const blob = new Blob([xmlTemplate], { type: 'application/xml;charset=utf-8;' });
    this.triggerDownload(blob, 'nfe_fixacao_lote_992.xml');
  }

  // Utilitário interno para disparo do gatilho de download
  private triggerDownload(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

export const securityExport = new SecurityExportService();
