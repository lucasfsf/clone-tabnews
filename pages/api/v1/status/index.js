function status(request, response) {
  response.status(200).json({ chave: "Alunos do Curso.dev sao doidos" });
}

export default status;
