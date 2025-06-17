import * as bitrixService from '../services/bitrix.js';
import * as config from '../utils/index.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import PDFDocument from 'pdfkit';
import archiver from 'archiver';

export async function getDealById(req, res) {
  const { id } = req.params;
  try {
    const deal = await bitrixService.getDealById(id);
    return res.json(deal);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// update config.json
export async function setUser(req, res) {
  try {
    const { id, hook } = req.params;
    config.setConfig(id, hook);
    
    return res.json({ success: true, updated: {} });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function exportDealFiles (req, res) {
  const { id } = req.params;
  try {
    console.log("== bitrixService.getDealById(id) ==");
    const deal = await bitrixService.getDealById(id);
    const timestamp = Date.now();

    console.log("== GERANDO WORD ==")
    // Criar documento Word
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun({ text: `ID do Deal: ${deal.ID}`, bold: true })],
            }),
            new Paragraph(`Título: ${deal.TITLE}`),
            new Paragraph(`Status: ${deal.STAGE_ID}`),
          ],
        },
      ],
    });

    const wordBuffer = await Packer.toBuffer(doc);

    // Criar documento PDF
    console.log("== GERANDO PDF ==")
    
    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.fontSize(14).text(`ID do Deal: ${deal.ID}`);
      doc.text(`Título: ${deal.TITLE}`);
      doc.text(`Status: ${deal.STAGE_ID}`);
      doc.end();
    });

    // Configura o zip para ser transmitido direto na resposta
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=deal_${id}_${timestamp}.zip`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    archive.append(wordBuffer, { name: `deal_${id}.docx` });
    archive.append(pdfBuffer, { name: `deal_${id}.pdf` });
    archive.append(`Arquivos gerados com sucesso!\nID do Card: ${id}`, { name: 'sucesso.txt' });

    // Finaliza e envia
    archive.finalize();
  } catch (err) {
    console.error('Erro ao gerar arquivos:', err.message);
    return res.status(500).json({ error: 'Erro ao gerar arquivos da deal' });
  }
}
