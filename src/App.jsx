import { useState } from 'react';

const packs = [1, 3, 6];
const tallas = ["S", "M", "L", "XL", "XXL", "3XL"];
const colores = [
  "Negro", "Blanco", "Beige", "Rojo", "Azul cielo",
  "Verde oliva", "Mora rosa", "Azul navy", "Crema"
];

export default function App() {
  const [step, setStep] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const [camisas, setCamisas] = useState([{ color: "", talla: "" }]);
  const [datos, setDatos] = useState({ nombre: "", cedula: "", ciudad: "", direccion: "", barrio: "", celular: "" });

  const handlePackSelect = (n) => {
    setCantidad(n);
    setCamisas(Array(n).fill({ color: "", talla: "" }));
    setStep(2);
  };

  const handleCamisaChange = (index, field, value) => {
    const nuevasCamisas = [...camisas];
    nuevasCamisas[index] = { ...nuevasCamisas[index], [field]: value };
    setCamisas(nuevasCamisas);
  };

  const handleDatosChange = (field, value) => {
    setDatos({ ...datos, [field]: value });
  };

  const handleSubmit = () => {
    const pedido = {
      cantidad,
      camisas,
      datos,
    };
    console.log("Pedido enviado:", pedido);
    setStep(4);
    // Envío a correo o WhatsApp se puede conectar aquí
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: 'sans-serif' }}>
      {step === 1 && (
        <div>
          <h1>Haz tu pedido fácil y rápido</h1>
          <p>Selecciona un pack:</p>
          <div style={{ display: "flex", gap: 10 }}>
            {packs.map((n) => (
              <button key={n} onClick={() => handlePackSelect(n)}>
                {n} Camisa{n > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Selecciona color y talla</h2>
          {camisas.map((_, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <p>Camisa {i + 1}</p>
              <select onChange={(e) => handleCamisaChange(i, 'color', e.target.value)}>
                <option value="">Selecciona color</option>
                {colores.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select onChange={(e) => handleCamisaChange(i, 'talla', e.target.value)} style={{ marginLeft: 10 }}>
                <option value="">Selecciona talla</option>
                {tallas.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setStep(3)}>Siguiente</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Datos personales</h2>
          {["nombre", "cedula", "ciudad", "direccion", "barrio", "celular"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={(e) => handleDatosChange(field, e.target.value)}
              style={{ display: "block", margin: "10px 0", width: "100%", padding: 8 }}
            />
          ))}
          <button onClick={handleSubmit}>Confirmar pedido</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>¡Gracias por tu pedido!</h2>
          <p>Te contactaremos pronto por correo o WhatsApp.</p>
        </div>
      )}
    </div> // cierre del div principal
  );
}