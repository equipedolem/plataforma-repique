'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, MessageCircle, Users, Flame, Clock, CheckCircle2, AlertTriangle, Send, Search, Filter, Bot, Phone, UserCheck } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const initialLeads = [
  { id: 1, nome: 'João Ricardo', telefone: '21999887766', produto: 'Luzes do Rio', origem: 'Meta Ads', ultimaMensagem: 'Ainda estou procurando, mas depende da entrada.', status: 'Quente', score: 86, perfil: 'MCMV / Entrada baixa', decisao: 'Enviar para corretor especialista em simulação', corretor: 'Caroline Barros', sla: '02:00' },
  { id: 2, nome: 'Mariana Costa', telefone: '21988776655', produto: 'Pixinguinha', origem: 'Leadfy', ultimaMensagem: 'Queria saber se ainda tem unidade para investir.', status: 'Quente', score: 94, perfil: 'Investidor', decisao: 'Enviar condição e potencial de locação', corretor: 'Rodrigo Nery', sla: '02:00' },
  { id: 3, nome: 'Carlos André', telefone: '21977665544', produto: 'Caminhos da Guanabara', origem: 'Google Ads', ultimaMensagem: 'Talvez mais pra frente, agora estou organizando renda.', status: 'Morno', score: 52, perfil: 'Moradia / Sem urgência', decisao: 'Manter na régua de aquecimento', corretor: 'Aguardando', sla: '10:00' },
  { id: 4, nome: 'Fernanda Lima', telefone: '21966554433', produto: 'Heitor dos Prazeres', origem: 'Base antiga', ultimaMensagem: 'Já comprei, obrigado.', status: 'Frio', score: 12, perfil: 'Comprou imóvel', decisao: 'Encerrar contato e marcar como não abordar', corretor: 'Não distribuir', sla: '--' },
  { id: 5, nome: 'Rafael Martins', telefone: '21955443322', produto: 'Luzes do Rio', origem: 'Meta Ads', ultimaMensagem: 'Qual seria o valor de entrada hoje?', status: 'Quente', score: 89, perfil: 'MCMV / Sensível a preço', decisao: 'Enviar para atendimento imediato', corretor: 'Amanda Duarte', sla: '02:00' },
];

const equipe = [
  { nome: 'Caroline Barros', especialidade: 'MCMV', ativos: 8, conversao: '18%' },
  { nome: 'Rodrigo Nery', especialidade: 'Investidor', ativos: 6, conversao: '22%' },
  { nome: 'Amanda Duarte', especialidade: 'Entrada baixa', ativos: 5, conversao: '16%' },
  { nome: 'Rafael Grande', especialidade: 'Niterói', ativos: 4, conversao: '14%' },
];

function statusClass(status) {
  if (status === 'Quente') return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  if (status === 'Morno') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  return 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30';
}

function scoreBar(score) {
  if (score >= 80) return 'bg-emerald-400';
  if (score >= 45) return 'bg-amber-400';
  return 'bg-zinc-500';
}

function Metric({ icon, label, value }) {
  return (
    <Card className="bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-xl">
      <CardContent className="p-5">
        <div className="text-amber-300 w-6 h-6">{icon}</div>
        <div className="text-3xl font-bold mt-4">{value}</div>
        <div className="text-sm text-zinc-400 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}

export default function PlataformaRepiqueV1() {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [arquivo, setArquivo] = useState(null);
  const [log, setLog] = useState(['Base carregada com 5 leads de teste.', 'IA classificou leads por intenção, objeção e urgência.', 'Leads quentes enviados para fila comercial.']);

  const filtrados = useMemo(() => leads.filter((lead) => {
    const texto = `${lead.nome} ${lead.telefone} ${lead.produto} ${lead.origem} ${lead.status}`.toLowerCase();
    return texto.includes(query.toLowerCase()) && (filtro === 'Todos' || lead.status === filtro);
  }), [leads, query, filtro]);

  const stats = useMemo(() => {
    const total = leads.length;
    return {
      total,
      quentes: leads.filter((l) => l.status === 'Quente').length,
      mornos: leads.filter((l) => l.status === 'Morno').length,
      frios: leads.filter((l) => l.status === 'Frio').length,
      scoreMedio: Math.round(leads.reduce((acc, l) => acc + l.score, 0) / total),
    };
  }, [leads]);

  function simularUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setArquivo(file.name);
    setLog((old) => [`Planilha recebida: ${file.name}`, 'Colunas reconhecidas: Nome, Telefone, Produto e Origem.', 'Telefones normalizados e duplicidades removidas.', ...old]);
  }

  function simularDisparo() {
    setLog((old) => ['Disparo iniciado via WhatsApp Cloud API.', "Mensagem enviada: 'Você conseguiu comprar ou ainda procura oportunidade?'", 'Aguardando respostas para IA classificar automaticamente.', ...old]);
  }

  function simularRespostaIA() {
    const novoLead = { id: Date.now(), nome: 'Lead Teste IA', telefone: '21999990000', produto: 'Luzes do Rio', origem: 'Upload Excel', ultimaMensagem: 'Tenho interesse, queria saber se dá para simular com minha renda.', status: 'Quente', score: 91, perfil: 'MCMV / Pedido de simulação', decisao: 'Distribuir imediatamente por SLA crítico', corretor: 'Caroline Barros', sla: '02:00' };
    setLeads((old) => [novoLead, ...old]);
    setLog((old) => ['Nova resposta recebida no webhook da Meta.', 'IA identificou intenção de simulação e marcou como QUENTE.', 'Lead distribuído para Caroline Barros com SLA de 2 minutos.', ...old]);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-sm text-amber-300 tracking-[0.25em] uppercase">Equipe Dolem</div>
            <h1 className="text-3xl lg:text-5xl font-bold mt-2">Plataforma de Repique IA</h1>
            <p className="text-zinc-400 mt-3 max-w-2xl">Upload de base, disparo via WhatsApp, leitura de intenção, score comercial e distribuição automática para equipe de vendas.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={simularDisparo} className="rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2"><Send className="w-4 h-4 mr-2 inline" /> Disparar teste</Button>
            <Button onClick={simularRespostaIA} className="rounded-2xl bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-2"><Bot className="w-4 h-4 mr-2 inline" /> Simular resposta IA</Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Metric icon={<Users />} label="Leads na base" value={stats.total} />
          <Metric icon={<Flame />} label="Quentes" value={stats.quentes} />
          <Metric icon={<Clock />} label="Mornos" value={stats.mornos} />
          <Metric icon={<AlertTriangle />} label="Frios" value={stats.frios} />
          <Metric icon={<CheckCircle2 />} label="Score médio" value={stats.scoreMedio} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-xl"><CardContent className="p-5 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div><h2 className="text-xl font-bold">Base de leads e tomada de decisão</h2><p className="text-sm text-zinc-400">A IA lê resposta, identifica perfil, calcula score e decide o próximo passo.</p></div>
              <label className="cursor-pointer inline-flex items-center justify-center rounded-2xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"><Upload className="w-4 h-4 mr-2" /> Upload Excel/CSV<input type="file" accept=".csv,.xlsx,.xls" onChange={simularUpload} className="hidden" /></label>
            </div>
            {arquivo && <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3">Arquivo carregado: {arquivo}</div>}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative"><Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome, produto, origem..." className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2 outline-none focus:border-amber-400" /></div>
              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-2xl px-3"><Filter className="w-4 h-4 text-zinc-500" /><select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="bg-transparent outline-none py-2 text-sm"><option className="bg-zinc-900">Todos</option><option className="bg-zinc-900">Quente</option><option className="bg-zinc-900">Morno</option><option className="bg-zinc-900">Frio</option></select></div>
            </div>

            <div className="space-y-3">
              {filtrados.map((lead) => (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold">{lead.nome}</h3><span className={`text-xs border rounded-full px-3 py-1 ${statusClass(lead.status)}`}>{lead.status}</span></div>
                      <div className="flex flex-wrap gap-3 text-sm text-zinc-400"><span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.telefone}</span><span>{lead.produto}</span><span>{lead.origem}</span></div>
                      <p className="text-sm text-zinc-300 border-l-2 border-amber-400 pl-3">{lead.ultimaMensagem}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm"><div className="bg-zinc-900 rounded-2xl p-3"><span className="text-zinc-500">Perfil:</span><br />{lead.perfil}</div><div className="bg-zinc-900 rounded-2xl p-3"><span className="text-zinc-500">Decisão:</span><br />{lead.decisao}</div></div>
                    </div>
                    <div className="lg:w-56 space-y-3"><div><div className="flex justify-between text-sm mb-1"><span>Score</span><strong>{lead.score}</strong></div><div className="h-2 bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full ${scoreBar(lead.score)}`} style={{ width: `${lead.score}%` }} /></div></div><div className="bg-zinc-900 rounded-2xl p-3 text-sm"><div className="text-zinc-500">Responsável</div><div className="font-semibold flex items-center gap-2 mt-1"><UserCheck className="w-4 h-4 text-amber-300" /> {lead.corretor}</div><div className="text-zinc-500 mt-2">SLA</div><div className="font-bold text-emerald-300">{lead.sla}</div></div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent></Card>

          <div className="space-y-6">
            <Card className="bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-xl"><CardContent className="p-5"><h2 className="text-xl font-bold mb-4">Equipe de vendas</h2><div className="space-y-3">{equipe.map((pessoa) => (<div key={pessoa.nome} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4"><div className="font-bold">{pessoa.nome}</div><div className="text-sm text-zinc-400">{pessoa.especialidade}</div><div className="flex justify-between mt-3 text-sm"><span>Ativos: <strong>{pessoa.ativos}</strong></span><span>Conversão: <strong className="text-emerald-300">{pessoa.conversao}</strong></span></div></div>))}</div></CardContent></Card>
            <Card className="bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-xl"><CardContent className="p-5"><h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5 text-emerald-300" /> Log operacional</h2><div className="space-y-2 max-h-80 overflow-auto pr-1">{log.map((item, index) => (<div key={index} className="text-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-3 text-zinc-300">{item}</div>))}</div></CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
