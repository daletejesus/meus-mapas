import { test, expect } from '@playwright/test';
import "dotenv/config";

const URL=process.env["URL"]!

// Teste página inicial- Tela 1
test('Teste página inicial', async ({ page }) => {
  await page.goto(URL);

   await expect(page).toHaveTitle(/Meus Mapas/); // Espera que o título do aba do navegador seja  Meus Mapas
});

// Testa criação de mapa
test('POST /api/mapa deve retornar 200', async ({ request }) => {

  const response = await request.post(`${URL}/api/mapa`, {
    data: {
        id: "TESTE",
        name: 'Mapa de Teste', 
        status: true
    }
  });

  expect(response.status()).toBe(200); // Espera que a resposta seja 200

});

// Testa página do mapa criado- Tela 2
test('Abre mapa criado', async ({ page }) => {
await page.goto(`${URL}/mapa/TESTE`);

  // É esperado que quando a página carregue aparece o título Mapa de Teste
  await expect(page.getByRole('heading', { name: 'Mapa de Teste' })).toBeVisible(); 
});

// Testa retorno de mapas
test('GET /api/mapa deve retornar 200', async ({ request }) => {
  const response = await request.get(`${URL}/api/mapa`);

  expect(response.status()).toBe(200);

  const resposta = await response.json();
  expect(Array.isArray(resposta)).toBe(true); // Espera que a resposta seja um array (lista)
});

// Testa a criação de ponto
test('POST /api/ponto deve retornar 200', async ({ request }) => {

  const response = await request.post(`${URL}/api/ponto`, {
    data: {
        id: "TESTE",
        name: 'Mapa de Teste Playwright',
        idMapa: "TESTE",
        latitude: '-23.510202654001375',
        longitude: '25.-46.888348994959166'
    } // Está enviando dados de teste
  });

  expect(response.status()).toBe(200);

});

// Testa o retorno de pontos
test('GET /api/ponto deve retornar 200', async ({ request }) => {
  const response = await request.get(`${URL}/api/ponto?idMapa=TESTE`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.pontos)).toBe(true);
});

// Testa a exclusão lógica de ponto
test('PATCH /api/ponto deve retornar 200', async ({ request }) => {
  const response = await request.patch(`${URL}/api/ponto`, {
    data: {
        id: "TESTE",
        status: false
    }
  });

  expect(response.status()).toBe(200);
});

// Testa a exclusão lógica de mapa
test('PATCH /api/mapa deve retornar 200', async ({ request }) => {
  const response = await request.patch(`${URL}/api/mapa`, {
    data: {
        id: "TESTE",
        status: false
    }
  });

  expect(response.status()).toBe(200);
});