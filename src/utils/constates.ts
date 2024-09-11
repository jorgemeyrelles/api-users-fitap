const regex = {
  celular: {
    code: /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
    message: "Celular inválido. XXYYYYYYYYY",
  },
  senha: {
    code: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
    message:
      "A senha deve ter um número, uma letra maiúscula, minúscula, um caractere especial e está entre 3 a 6 caracteres.",
  },
};

export { regex };
