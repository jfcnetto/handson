import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PrintButton from '@/components/PrintButton'

export default async function ContratoPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id: id }
  })

  if (!lead) return notFound()

  const dataAtual = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
  const valorFechado = lead.closedValue ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.closedValue) : 'R$ [VALOR A DEFINIR]'
  const valorManutencao = lead.maintenanceMrr ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lead.maintenanceMrr) : 'R$ 0,00'

  return (
    <div className="bg-white min-h-screen p-8 text-black font-serif print:p-0 print:bg-white max-w-4xl mx-auto shadow-lg print:shadow-none my-8 print:my-0">
      <div className="flex justify-between items-center mb-10 print:hidden">
        <h1 className="text-2xl font-bold font-sans">Visualização de Contrato</h1>
        <PrintButton />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase underline">Contrato de Prestação de Serviços de Desenvolvimento Web</h1>
      </div>

      <div className="text-justify leading-relaxed space-y-4">
        <p>
          Pelo presente instrumento particular, de um lado <strong>Hands On! Soluções Digitais LTDA</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 00.000.000/0001-00, com sede em Brasília/DF, doravante denominada <strong>CONTRATADA</strong>, e de outro lado:
        </p>
        <p>
          <strong>{lead.company}</strong>, pessoa jurídica/física, inscrita no CNPJ/CPF sob o nº _____________________, com sede/residência em __________________________________________, representada por <strong>{lead.name}</strong>, doravante denominada <strong>CONTRATANTE</strong>.
        </p>
        <p>
          Têm entre si, justo e contratado, o presente contrato de prestação de serviços, que se regerá pelas seguintes cláusulas e condições:
        </p>

        <h2 className="font-bold text-lg mt-6 mb-2">Cláusula 1ª - Do Objeto</h2>
        <p>
          O presente contrato tem como objeto a prestação de serviços de desenvolvimento, modernização e publicação de website e/ou funil de vendas digital para a CONTRATANTE, de acordo com as especificações previamente alinhadas e aprovadas entre as partes.
        </p>

        <h2 className="font-bold text-lg mt-6 mb-2">Cláusula 2ª - Dos Valores e Pagamento</h2>
        <p>
          Pelos serviços de desenvolvimento e implementação objeto deste contrato, a CONTRATANTE pagará à CONTRATADA o valor total de <strong>{valorFechado}</strong>.
        </p>
        <p>
          Além disso, fica acordado o pagamento mensal de <strong>{valorManutencao}</strong> a título de manutenção preventiva, hospedagem e suporte técnico contínuo.
        </p>

        <h2 className="font-bold text-lg mt-6 mb-2">Cláusula 3ª - Dos Prazos</h2>
        <p>
          A CONTRATADA compromete-se a entregar a versão inicial do projeto no prazo de 15 (quinze) dias úteis a contar da assinatura deste instrumento e do envio de todos os materiais necessários pela CONTRATANTE.
        </p>

        <h2 className="font-bold text-lg mt-6 mb-2">Cláusula 4ª - Do Foro</h2>
        <p>
          Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem o foro da comarca de Brasília/DF.
        </p>

        <div className="mt-16">
          <p className="text-center">Brasília, {dataAtual}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-20 gap-16">
          <div className="w-full text-center border-t border-black pt-2">
            <p className="font-bold">Hands On! Soluções Digitais</p>
            <p className="text-sm">CONTRATADA</p>
          </div>
          <div className="w-full text-center border-t border-black pt-2">
            <p className="font-bold">{lead.company}</p>
            <p className="text-sm">CONTRATANTE</p>
          </div>
        </div>
      </div>
    </div>
  )
}
