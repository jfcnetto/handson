'use client'

import { useState, useEffect } from 'react'
import { updateLeadStatus, updateLeadDocument } from '@/actions/lead'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, ImageRun, SectionType } from 'docx'
import { saveAs } from 'file-saver'

const FUNNEL_STAGES = [
  { id: 'NEW', title: 'Novo Diagnóstico' },
  { id: 'QUALIFIED', title: 'Qualificado' },
  { id: 'CONTACT', title: 'Contato' },
  { id: 'MEETING', title: 'Reunião' },
  { id: 'PROPOSAL', title: 'Proposta' },
  { id: 'NEGOTIATION', title: 'Negociação' },
  { id: 'WON', title: 'Contratado' },
]

export default function KanbanBoard({ initialLeads, pricingTiers = [] }: { initialLeads: any[], pricingTiers?: any[] }) {
  const [leads, setLeads] = useState(initialLeads)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [docValue, setDocValue] = useState('')

  useEffect(() => {
    setLeads(initialLeads)
  }, [initialLeads])

  useEffect(() => {
    if (selectedLead) {
      setDocValue(selectedLead.document ? formatDocument(selectedLead.document) : '')
    }
  }, [selectedLead])

  const formatDocument = (value: string) => {
    const clean = value.replace(/\D/g, '')
    if (clean.length <= 11) {
      return clean
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else {
      return clean
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
        .substring(0, 18) // Limita o tamanho ao padrão CNPJ formatado
    }
  }

  const handleSaveDocument = async () => {
    if (!selectedLead) return
    setUpdating(selectedLead.id)
    const res = await updateLeadDocument(selectedLead.id, docValue)
    if (res.success) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, document: docValue } : l))
      setSelectedLead({ ...selectedLead, document: docValue })
      alert("Documento salvo com sucesso!")
    } else {
      alert("Erro ao salvar documento: " + (res.error || "Erro desconhecido"))
    }
    setUpdating(null)
  }

  const handleGenerateProposal = async () => {
    if (!selectedLead) return
    
    const totalScore = (selectedLead.legacyComplexityScore + selectedLead.reverseEngineeringRisk) / 2
    const matchedTier = pricingTiers.find((t: any) => totalScore >= t.minScore && totalScore <= t.maxScore)
    const estMax = matchedTier ? matchedTier.maxValue : selectedLead.estimatedRangeMax
    
    if (!estMax) {
      alert("Não há valor máximo estimado para gerar a proposta.")
      return
    }

    const proposalValue = estMax * 0.87
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposalValue)
    const currentDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

    let logoBuffer = null
    let logoWidth = 200
    let logoHeight = 100
    try {
      const res = await fetch('/logo.png')
      if (res.ok) {
        logoBuffer = await res.arrayBuffer()
        
        // Pega as proporções exatas da imagem usando o browser
        const blob = new Blob([logoBuffer])
        const url = URL.createObjectURL(blob)
        const img = new window.Image()
        img.src = url
        await new Promise((resolve) => {
          img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight
            logoWidth = 200
            logoHeight = 200 / ratio
            resolve(true)
          }
          img.onerror = () => resolve(false)
        })
      }
    } catch (e) {
      console.log("Logo fetch failed", e)
    }

    const headerParagraphs = []
    if (logoBuffer) {
      headerParagraphs.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new ImageRun({
              data: logoBuffer,
              transformation: { width: logoWidth, height: logoHeight },
            }),
          ],
          spacing: { after: 1000 }
        })
      )
    }

    const brandColor = "1A365D"
    const accentColor = "2563EB"

    const doc = new Document({
      creator: "Hands On!",
      title: "Proposta Comercial",
      styles: {
        default: {
          document: {
            run: { font: "Arial", size: 24, color: "333333" }
          }
        }
      },
      sections: [
        {
          properties: { type: SectionType.NEXT_PAGE },
          children: [
            new Paragraph({ spacing: { before: 2000 } }),
            ...headerParagraphs,
            new Paragraph({
              children: [new TextRun({ text: "PROPOSTA DE PRESTAÇÃO DE SERVIÇOS TÉCNICOS", color: brandColor, bold: true, size: 36 })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 800, after: 1200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "PARA: ", bold: true, size: 28, color: brandColor }),
                new TextRun({ text: selectedLead.company || "Não informado", size: 28 }),
              ],
              spacing: { after: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "A/C: ", bold: true, size: 24, color: brandColor }),
                new TextRun({ text: selectedLead.name || "Não informado", size: 24 }),
              ],
              spacing: { after: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "DOCUMENTO (CPF/CNPJ): ", bold: true, size: 24, color: brandColor }),
                new TextRun({ text: selectedLead.document || docValue || "Não informado", size: 24 }),
              ],
              spacing: { after: 800 }
            }),
            new Paragraph({
              children: [new TextRun({ text: `Data: ${currentDate}`, italics: true })],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 1200 }
            }),
          ],
        },
        {
          properties: { type: SectionType.NEXT_PAGE },
          children: [
            new Paragraph({
              children: [new TextRun({ text: "1. APRESENTAÇÃO E OBJETIVO", color: brandColor, bold: true, size: 32 })],
              spacing: { before: 400, after: 300 }
            }),
            new Paragraph({
              text: "A Hands On! apresenta esta proposta técnica e comercial visando a prestação de serviços especializados em Modernização de Sistemas Legados e Engenharia Reversa de Software.",
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun("O principal objetivo deste projeto é atuar sobre o sistema alvo identificado como "),
                new TextRun({ text: selectedLead.targetSystem || "Não especificado", bold: true, color: accentColor }),
                new TextRun(", mitigando riscos operacionais e garantindo a continuidade do negócio através de uma nova arquitetura moderna e escalável."),
              ],
              spacing: { after: 600 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "2. METODOLOGIA DE TRABALHO", color: brandColor, bold: true, size: 32 })],
              spacing: { before: 400, after: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Fase 1: Diagnóstico e Descoberta - ", bold: true }),
                new TextRun("Mapeamento completo das regras de negócio, fluxos e rotinas do sistema atual."),
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Fase 2: Arquitetura e Engenharia Reversa - ", bold: true }),
                new TextRun("Desenho da nova solução tecnológica e documentação da estrutura de dados."),
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Fase 3: Desenvolvimento e Testes - ", bold: true }),
                new TextRun("Construção modular do novo sistema na pilha tecnológica aprovada e homologação rigorosa."),
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Fase 4: Implantação e Treinamento - ", bold: true }),
                new TextRun("Go-live acompanhado, migração de dados final e capacitação da equipe técnica e operacional do cliente."),
              ],
              spacing: { after: 600 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "3. ESCOPO TÉCNICO BASE", color: brandColor, bold: true, size: 32 })],
              spacing: { before: 400, after: 300 }
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: brandColor },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: brandColor },
                left: { style: BorderStyle.SINGLE, size: 1, color: brandColor },
                right: { style: BorderStyle.SINGLE, size: 1, color: brandColor },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E5E7EB" },
                insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "E5E7EB" },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ shading: { fill: brandColor }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: "Item Avaliado", bold: true, color: "FFFFFF" })] })] }),
                    new TableCell({ shading: { fill: brandColor }, margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: "Situação Identificada", bold: true, color: "FFFFFF" })] })] }),
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph("Tecnologia Atual")] }),
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph(selectedLead.technology || "Não informado")] }),
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph("Banco de Dados Atual")] }),
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph(selectedLead.database || "Não informado")] }),
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph("Possui Código-fonte")] }),
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph(selectedLead.hasSourceCode || "Não informado")] }),
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph("Possui Documentação")] }),
                    new TableCell({ margins: { top: 100, bottom: 100, left: 100, right: 100 }, children: [new Paragraph(selectedLead.documentation || "Não informado")] }),
                  ]
                }),
              ]
            }),
          ]
        },
        {
          properties: { type: SectionType.NEXT_PAGE },
          children: [
            new Paragraph({
              children: [new TextRun({ text: "4. INVESTIMENTO E PRAZOS", color: brandColor, bold: true, size: 32 })],
              spacing: { before: 400, after: 300 }
            }),
            new Paragraph({
              children: [
                new TextRun("O valor total estimado para a execução dos serviços descritos é de "),
                new TextRun({ text: formattedValue, bold: true, color: accentColor, size: 28 }),
                new TextRun(". Este investimento contempla todas as fases (Diagnóstico, Arquitetura, Desenvolvimento e Implantação)."),
              ],
              spacing: { after: 400 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "CONDIÇÕES GERAIS:", bold: true, color: brandColor })],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Forma de Pagamento: ", bold: true }),
                new TextRun("A combinar, sugerido faturamento parcelado vinculado à entrega de marcos (Milestones) do projeto."),
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "• Validade da Proposta: ", bold: true }),
                new TextRun("15 dias contados a partir da data de emissão."),
              ],
              spacing: { after: 600 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "5. TERMO DE CONFIDENCIALIDADE (NDA) E ASSINATURAS", color: brandColor, bold: true, size: 32 })],
              spacing: { before: 400, after: 300 }
            }),
            new Paragraph({
              text: "A Hands On! compromete-se a manter em absoluto sigilo e confidencialidade todas as informações operacionais, estratégicas, banco de dados e regras de negócio do cliente, comprometendo-se a utilizá-las unicamente para os fins desta proposta de prestação de serviços.",
              spacing: { after: 800 }
            }),
            new Paragraph({
              text: "_______________________________________________________",
              alignment: AlignmentType.CENTER,
              spacing: { before: 1000, after: 100 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "Hands On! Modernização de Sistemas", bold: true, color: brandColor })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 }
            }),
            new Paragraph({
              text: "_______________________________________________________",
              alignment: AlignmentType.CENTER,
              spacing: { before: 800, after: 100 }
            }),
            new Paragraph({
              children: [new TextRun({ text: selectedLead.company || "Cliente", bold: true, color: brandColor })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 }
            }),
            new Paragraph({
              children: [new TextRun({ text: selectedLead.name || "Representante" })],
              alignment: AlignmentType.CENTER,
            }),
          ]
        }
      ]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Proposta_${selectedLead.company?.replace(/\s+/g, '_') || 'Comercial'}.docx`)
  }

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdating(leadId)
    // Optimistic UI update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
    
    const res = await updateLeadStatus(leadId, newStatus)
    if (!res.success) {
      alert("Erro ao atualizar status.")
      // Revert if error
      setLeads(initialLeads)
    }
    setUpdating(null)
  }

  return (
    <>
      <div className="flex overflow-x-auto pb-8 gap-4 min-h-[600px]">
        {FUNNEL_STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage.id)
          
          return (
            <div key={stage.id} className="min-w-[300px] w-[300px] bg-slate-100/50 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-700 text-sm">{stage.title}</h3>
                <span className="bg-white text-slate-500 text-xs px-2 py-1 rounded-full shadow-sm">{stageLeads.length}</span>
              </div>
              
              <div className="flex flex-col gap-3 flex-grow">
                {stageLeads.map(lead => {
                  const isHot = lead.leadIntentScore > 75 && lead.businessCriticalityScore > 80;
                  
                  return (
                    <div 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className={`bg-white p-4 rounded-xl shadow-sm border ${isHot ? 'border-red-200' : 'border-slate-200'} flex flex-col gap-3 relative cursor-pointer hover:shadow-md transition hover:-translate-y-1 ${updating === lead.id ? 'opacity-50' : ''}`}
                    >
                      {isHot && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">HOT 🔥</span>}
                      
                      <div>
                        <p className="font-bold text-slate-800 text-sm line-clamp-1" title={lead.company}>{lead.company}</p>
                        <p className="text-xs text-slate-500 line-clamp-1">{lead.name}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 mt-1">
                        <div className="flex flex-col gap-2 text-xs">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block w-fit">
                            Score Técnico: {((lead.legacyComplexityScore + lead.reverseEngineeringRisk) / 2).toFixed(0)}/100
                          </span>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded inline-block w-fit">
                            Interesse de Compra: {lead.leadIntentScore}/100
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-1" onClick={(e) => e.stopPropagation()}>
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={updating === lead.id}
                          className="w-full text-xs bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2 text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          {FUNNEL_STAGES.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )
                })}
                
                {stageLeads.length === 0 && (
                  <div className="flex-grow flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-6">
                    <p className="text-xs text-slate-400 font-medium text-center">Nenhum lead</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedLead.company}</h2>
                <p className="text-sm text-slate-500">{selectedLead.name} - {selectedLead.jobTitle}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-700 transition p-2 hover:bg-slate-200 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contato & Perfil */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contato</h3>
                    <div className="space-y-3 text-sm text-slate-700">
                      <p><strong className="text-slate-900">E-mail:</strong> {selectedLead.email}</p>
                      <p><strong className="text-slate-900">Telefone:</strong> {selectedLead.phone}</p>
                      <p><strong className="text-slate-900">Tamanho da Empresa:</strong> {selectedLead.companySize}</p>
                      <div className="flex flex-col gap-1">
                        <strong className="text-slate-900">CPF/CNPJ:</strong>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="border border-slate-200 rounded px-2 py-1 flex-grow focus:outline-none focus:border-blue-400 text-sm"
                            value={docValue}
                            onChange={(e) => setDocValue(formatDocument(e.target.value))}
                            placeholder="000.000.000-00 ou 00.000.000/0000-00"
                          />
                          <button 
                            onClick={handleSaveDocument}
                            disabled={updating === selectedLead.id || docValue === selectedLead.document}
                            className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-medium disabled:opacity-50 hover:bg-slate-700 transition"
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tecnologia</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong className="text-slate-900">Sistema Alvo:</strong> {selectedLead.targetSystem}</p>
                      <p><strong className="text-slate-900">Tech Stack:</strong> {selectedLead.technology}</p>
                      <p><strong className="text-slate-900">Banco de Dados:</strong> {selectedLead.database}</p>
                      <p><strong className="text-slate-900">Possui Código-fonte:</strong> {selectedLead.hasSourceCode}</p>
                      <p><strong className="text-slate-900">Documentação:</strong> {selectedLead.documentation}</p>
                    </div>
                  </div>
                </div>

                {/* Negócio & Dores */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Negócio</h3>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong className="text-slate-900">Nível de Criticidade:</strong> {selectedLead.businessCriticality}</p>
                      <p><strong className="text-slate-900">Centralização de Conhecimento:</strong> {selectedLead.knowledgeCentralization}</p>
                      {selectedLead.legacyComplexityScore !== undefined && selectedLead.reverseEngineeringRisk !== undefined && (
                        <p>
                          <strong className="text-slate-900">Score Técnico (Diagnóstico):</strong>{' '}
                          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {((selectedLead.legacyComplexityScore + selectedLead.reverseEngineeringRisk) / 2).toFixed(0)}/100
                          </span>
                        </p>
                      )}
                      {(() => {
                        const totalScore = (selectedLead.legacyComplexityScore + selectedLead.reverseEngineeringRisk) / 2;
                        const matchedTier = pricingTiers.find((t: any) => totalScore >= t.minScore && totalScore <= t.maxScore);
                        const estMin = matchedTier ? matchedTier.minValue : selectedLead.estimatedRangeMin;
                        const estMax = matchedTier ? matchedTier.maxValue : selectedLead.estimatedRangeMax;
                        
                        if (estMin !== null && estMax !== null) {
                          return (
                            <p>
                              <strong className="text-slate-900">Valor Estimado:</strong>{' '}
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estMin)}
                              {' - '}
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estMax)}
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Dores e Motivação</h3>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-amber-900">
                      <p className="mb-2"><strong className="font-semibold">Urgência:</strong> {selectedLead.urgency}</p>
                      <p><strong className="font-semibold">Motivação:</strong> {selectedLead.motivation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalhes Adicionais se houver */}
              {selectedLead.details && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Detalhes Adicionais</h3>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
                    {selectedLead.details}
                  </p>
                </div>
              )}
            </div>

            {/* Footer / Actions */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center gap-3">
              <div>
                <button 
                  onClick={handleGenerateProposal}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  Gerar Proposta (DOCX)
                </button>
              </div>
              <div className="flex gap-3">
              <a 
                href={`mailto:${selectedLead.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Enviar E-mail
              </a>
              <a 
                href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '') || ''}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  )
}
