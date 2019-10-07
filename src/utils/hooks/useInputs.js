// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function useInputs(defaults) {
  const [inputs, setInputs] = useState(defaults);

  const handleInput = ({ target: { type, name, value, step } }) => {
    if (type === 'number') {
      if (step) {
        return setInputs((prev) => ({ ...prev, [name]: Number.parseFloat(value, 10) || '' }));
      }
      return setInputs((prev) => ({ ...prev, [name]: Number.parseInt(value, 10) || '' }));
    }

    return setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return [inputs, handleInput, setInputs];
}
