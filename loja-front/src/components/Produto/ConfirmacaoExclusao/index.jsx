import React from 'react';

const ConfirmacaoExclusao = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>Deseja realmente excluir este produto?</p>
        <div>
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoExclusao;
