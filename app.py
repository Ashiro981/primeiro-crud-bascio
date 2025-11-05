from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Banco de dados temporário (em memória)
dados = [
    {"id": 1, "nome": "Alice", "email": "alice@email.com"},
    {"id": 2, "nome": "Bruno", "email": "bruno@email.com"}
]
# Home
@app.route('/')
def index():
    return render_template('index.html')
# Ler e adicionar
@app.route('/api/dados', methods=['GET', 'POST'])
def api_dados():
    if request.method == 'POST':
        novo = request.get_json()
        novo['id'] = len(dados) + 1
        dados.append(novo)
        return jsonify(novo), 201
    return jsonify(dados)
# Deletar
@app.route('/api/dados/<int:id_usuario>', methods=['DELETE'])
def deletar_usuario(id_usuario):
    global dados
    for usuario in dados:
        if usuario['id'] == id_usuario:
            dados.remove(usuario)
            return jsonify({'Mensagem':'Usuário deletado com sucesso.'}), 200
    return jsonify({'Mensagem':'Usuário não encontrado.'}), 404
# Atualizar
@app.route('/api/dados/<int:id_usuario>', methods=['PUT'])
def atualizar_usuario(id_usuario):
    novos_dados = request.get_json()
    for usuario in dados:
        if usuario['id'] == id_usuario:
            novos_dados.pop('id', None)
            usuario.update(novos_dados)
            return jsonify({"Mensagem":"Usuário atualizado com sucesso"}), 200
    return jsonify({'Mensagem':"Usuário não encontrado"}), 404


if __name__ == '__main__':
    app.run(debug=True)
