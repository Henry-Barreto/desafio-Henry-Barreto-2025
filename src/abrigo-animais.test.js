import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  // 🔹 Teste extra: limite de 3 animais por pessoa
  test('Não deve permitir mais de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,NOVELO,CAIXA,SKATE',
      '',
      'Rex,Mimi,Fofo,Zero,Bebe'
    );
    // A pessoa 1 adota só 3, os outros ficam no abrigo
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.lista).toContain('Fofo - pessoa 1');
    expect(resultado.lista).toContain('Zero - abrigo');
    expect(resultado.lista).toContain('Bebe - abrigo');
  });

  // 🔹 Teste extra: Loco precisa de companhia
  test('Loco só pode ser adotado se houver companhia', () => {
    const resultado1 = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      '',
      'Loco'
    );
    expect(resultado1.lista).toContain('Loco - abrigo'); // sozinho não vai

    const resultado2 = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE',
      '',
      'Rex,Loco'
    );
    expect(resultado2.lista).toContain('Rex - pessoa 1');
    expect(resultado2.lista).toContain('Loco - pessoa 1'); // vem junto porque Rex já foi
  });

});
