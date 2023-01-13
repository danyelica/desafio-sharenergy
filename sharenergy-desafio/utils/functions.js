export function maskTel(telephone) {
  let value = `${telephone}`;
  value = value.replace(/\D/g, "");
  if (value.length < 5) {
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
  }
  if (value.length < 8) {
    value = value.replace(/^(\d{2})(\d{1})(\d)/, "($1) $2 $3");
  }
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4");
  }

  return value;
}

export function maskCpf(cpf) {
  let value = `${cpf}`;
  value = value.replace(/\D/g, "");
  if (value.length <= 6) {
    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  }
  if (value.length <= 9) {
    value = value.replace(/^(\d{3})(\d{3})(\d)/, "$1.$2-$3");
  }
  if (value.length <= 11) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
  }
  return value;
}

export function maskCep(cep) {
  let value = `${cep}`;
  value = value.replace(/\D/g, "");
  if (value.length < 4) {
    value = value.replace(/^(\d{1})(\d)/, "$1-$2");
  }
  if (value.length < 6) {
    value = value.replace(/^(\d{3})(\d)/, "$1-$2");
  }
  if (value.length <= 8) {
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  }
  return value;
}

export function formatatingNumber(number) {
  let value = `${number}`;
  value = value.replace(/[^0-9]/g, "");

  return Number(value);
}
