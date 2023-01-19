import { useEffect } from "react";
import { useClient } from "../contexts/ClientsContexts";
import { Input, inputStyles } from "../styles/styledcomponents";
import { maskCep, maskCpf, maskTel } from "../utils/functions";

export default function ClientForm() {
  const { form, setForm } = useClient();

  function handleEditForm(target) {
    const value = `${target.value}`;
    if (target.id === "cpf" && value.length > 14) return;
    if (target.id === "telefone" && value.length > 16) return;
    if (target.id === "cep" && value.length > 9) return;
    if (target.id === "estado" && value.length > 2) return;
    setForm({ ...form, [target.id]: target.value });
  }

  return (
    <>
      <Input
        id='nome'
        label='Nome'
        variant='outlined'
        value={form.nome || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='email'
        label='E-mail'
        variant='outlined'
        placeholder='email@example.com'
        value={form.email || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cpf'
        label='CPF'
        variant='outlined'
        value={maskCpf(form.cpf) || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='telefone'
        label='Telefone'
        variant='outlined'
        value={maskTel(form.telefone) || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cep'
        label='CEP'
        variant='outlined'
        value={maskCep(form.cep) || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='logradouro'
        label='Rua'
        variant='outlined'
        value={form.logradouro || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='bairro'
        label='Bairro'
        variant='outlined'
        value={form.bairro || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='complemento'
        label='Complemento'
        variant='outlined'
        value={form.complemento || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='cidade'
        label='Cidade'
        variant='outlined'
        value={form.cidade || ""}
        sx={{ marginTop: "30px", marginRight: "20px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
      <Input
        id='estado'
        label='Estado'
        variant='outlined'
        placeholder='UF'
        value={form.estado || ""}
        sx={{ marginTop: "30px" }}
        inputProps={{
          style: inputStyles,
        }}
        multiline={true}
        required
        onChange={(event) => handleEditForm(event.target)}
      />
    </>
  );
}
