// src/components/fiserv/InvoiceHistoryTable.tsx
import type React from 'react';

interface Invoice {
  txid: string;
  amount: string;
  status: 'LIQUIDADO' | 'PENDENTE' | 'EXPIRADO';
  date: string;
}

interface InvoiceHistoryTableProps {
  invoices: Invoice[];
}

export const InvoiceHistoryTable: React.FC<InvoiceHistoryTableProps> = ({ invoices }) => {
  return (
    <div className="space-y-3 w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">// HISTÓRICO DE APORTES (FISERV LEDGER)</h3>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#0B0F17] text-gray-400 border-b border-gray-800">
            <tr>
              <th className="p-3">TRANSACTION_TXID</th>
              <th className="p-3">DATA</th>
              <th className="p-3">VALOR</th>
              <th className="p-3">STATUS_LIQ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/40 text-gray-300">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 italic">Nenhum registro de cobrança gerado nesta sessão.</td>
              </tr>
            ) : (
              invoices.map((inv, idx) => (
                <tr key={idx} className="hover:bg-gray-900/20">
                  <td className="p-3 text-emerald-400 font-bold">{inv.txid}</td>
                  <td className="p-3 text-gray-400">{inv.date}</td>
                  <td className="p-3 font-bold text-white">R$ {Number(inv.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      inv.status === 'LIQUIDADO' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
