<template>
  <footer class="bg-surface-800 border-t border-gray-700/50 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-white font-semibold mb-3">Transparência Política</h3>
          <p class="text-gray-400 text-sm">
            Plataforma open source que agrega e disponibiliza informações políticas
            brasileiras em tempo real.
          </p>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">Fontes</h3>
          <ul class="text-gray-400 text-sm space-y-1">
            <li>API Oficial do Senado Federal</li>
            <li>API Oficial da Câmara dos Deputados</li>
            <li>Agência Brasil (EBC)</li>
            <li>LexML — Base Legal</li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">API Pública</h3>
          <p class="text-gray-400 text-sm mb-2">Dados disponíveis via REST API:</p>
          <code class="text-primary-400 text-xs bg-surface-900 px-2 py-1 rounded">
            /api/v1/...
          </code>
        </div>
      </div>
      <div class="border-t border-gray-700/50 mt-8 pt-4 text-center text-gray-500 text-xs">
        © {{ new Date().getFullYear() }} Transparência Política — Dados Abertos para o Cidadão
      </div>
    </div>
  </footer>
</template>
