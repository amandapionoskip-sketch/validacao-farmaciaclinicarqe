# To-Do List Application

Uma aplicação moderna de gerenciamento de tarefas com armazenamento local (localStorage).

## ✨ Características

- ✅ **Adicionar Tarefas**: Crie novas tarefas com limite de 100 caracteres
- 🎯 **Prioridades**: Defina prioridades (Baixa, Média, Alta) para cada tarefa
- ✔️ **Marcar Concluídas**: Marque tarefas como concluídas
- ✏️ **Editar Tarefas**: Modifique o texto e prioridade das tarefas
- 🗑️ **Deletar Tarefas**: Remova tarefas individuais
- 📋 **Filtros**: Visualize Todas, Ativas ou Concluídas
- 📊 **Estatísticas**: Total, Ativas, Concluídas e Taxa de Conclusão
- 💾 **Armazenamento Local**: Todas as tarefas são salvas automaticamente
- 📤 **Exportar**: Exporte suas tarefas em formato JSON
- 🎨 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔔 **Notificações**: Feedback visual para cada ação

## 🚀 Como Usar

### Iniciar a Aplicação
1. Abra o arquivo `index.html` em seu navegador web
2. A aplicação carregará suas tarefas salvas automaticamente

### Adicionar uma Tarefa
1. Digite sua tarefa no campo de entrada
2. Clique no botão "Adicionar" ou pressione Enter
3. A tarefa será adicionada à lista

### Editar uma Tarefa
1. Clique no ícone de ✏️ lápis da tarefa
2. Atualize o texto e/ou a prioridade
3. Clique em "Salvar"

### Marcar como Concluída
1. Clique no checkbox à esquerda da tarefa
2. A tarefa será marcada como concluída

### Deletar uma Tarefa
1. Clique no ícone de 🗑️ lixo da tarefa
2. Confirme a exclusão

### Filtrar Tarefas
- 📋 **Todas**: Mostra todas as tarefas
- ⏳ **Ativas**: Mostra apenas tarefas não concluídas
- ✅ **Concluídas**: Mostra apenas tarefas concluídas

### Limpar Tarefas Concluídas
1. Clique no botão "🗑️ Limpar"
2. Confirme a ação
3. Todas as tarefas concluídas serão removidas

### Exportar Tarefas
1. Clique no botão "💾 Exportar"
2. Um arquivo JSON será baixado com todas as suas tarefas

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo com Grid e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação com localStorage
- **LocalStorage API**: Persistência de dados

## 📁 Estrutura de Arquivos

```
todo-app/
├── index.html      # Página principal HTML
├── styles.css      # Estilos CSS responsivos
├── script.js       # Lógica da aplicação
└── README.md       # Este arquivo
```

## 💾 Armazenamento Local

A aplicação usa `localStorage` para salvar as tarefas automaticamente:
- As tarefas são armazenadas com a chave: `todoApp_tasks`
- Os dados são salvos em JSON format
- As tarefas persistem mesmo após fechar o navegador
- Nenhum dado é enviado para servidores

## ⌨️ Atalhos de Teclado

- **Enter**: Adicionar nova tarefa (quando o campo de entrada está focado)
- **Ctrl+S** (ou **Cmd+S** no Mac): Exportar tarefas
- **Escape**: Fechar modal de edição

## 📊 Dados de Cada Tarefa

Cada tarefa armazena:
```json
{
  "id": 1718060400000,
  "text": "Descrição da tarefa",
  "completed": false,
  "priority": "medium",
  "createdAt": "11/06/2026",
  "createdTime": "13:20"
}
```

## 🎨 Prioridades

- 🔴 **Alta**: Urgente
- 🟡 **Média**: Normal (padrão)
- 🟢 **Baixa**: Sem pressa

## 📱 Responsividade

- **Desktop**: Layout completo com todas as informações visíveis
- **Tablet**: Layout adaptado com grid flexível
- **Mobile**: Layout otimizado com elementos empilhados

## 🔒 Privacidade e Segurança

- Todas as tarefas são armazenadas localmente no seu navegador
- Nenhum dado é coletado ou enviado para servidores
- HTML escapeado para prevenir XSS (Cross-Site Scripting)
- Validação de entrada de dados

## 📈 Estatísticas

A aplicação exibe automaticamente:
- **Total**: Número total de tarefas
- **Ativas**: Tarefas não concluídas
- **Concluídas**: Tarefas marcadas como concluídas
- **Taxa**: Percentual de tarefas concluídas

## 🐛 Solução de Problemas

### As tarefas não estão sendo salvas
- Verifique se o localStorage está habilitado no seu navegador
- Certifique-se de que o navegador não está em modo privado
- Verifique se há espaço disponível no localStorage

### Modal de edição não abre
- Pressione Escape para fechar modais anteriores
- Recarregue a página

### Limpar cache/dados
Para limpar todas as tarefas salvas:
1. Abra o DevTools (F12)
2. Vá para Application > LocalStorage
3. Procure por `todoApp_tasks`
4. Delete-o

## 🚀 Melhorias Futuras

- [ ] Sincronização com servidor
- [ ] Categorias/Tags para tarefas
- [ ] Datas de vencimento
- [ ] Notificações de tarefas vencidas
- [ ] Modo escuro
- [ ] Múltiplas listas
- [ ] Importar tarefas de JSON
- [ ] Integração com calendário

## 📝 Notas

- A aplicação funciona completamente offline
- Suporta navegadores modernos (Chrome, Firefox, Safari, Edge)
- Otimizada para velocidade e performance
- Interface intuitiva e acessível

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório GitHub.

---

**Desenvolvido com ❤️ em 2026**  
**Versão**: 1.0.0