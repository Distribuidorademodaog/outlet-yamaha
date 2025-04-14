import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import modelo from './assets/camisas.jpg';
import modelo2 from './assets/camisa2.jpg';
import tabla from './assets/tabla.jpg';
import uno from './assets/1camisa.png';
import tres from './assets/3camisas.png';
import seis from './assets/6camisas.png';
import oferta from './assets/oferta.png';

import amarillo from './assets/camisas/camisa-amarillo.jpg';
import azulclaro from './assets/camisas/camisa-azulclaro.jpg';
import azulmedio from './assets/camisas/camisa-azulmedio.jpg';
import azuloscuro from './assets/camisas/camisa-azuloscuro.jpg';
import azulrey from './assets/camisas/camisa-azulrey.jpg';
import azulturquesa from './assets/camisas/camisa-azulturquesa.jpg';
import beige from './assets/camisas/camisa-beige.jpg';
import blanco from './assets/camisas/camisa-blanco.jpg';
import naranja from './assets/camisas/camisa-naranja.jpg';
import negro from './assets/camisas/camisa-negro.jpg';
import rojo from './assets/camisas/camisa-rojo.jpg';
import verde from './assets/camisas/camisa-verde.jpg';

const tallas = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
const colores = [
  { nombre: 'Negro', img: negro },
  { nombre: 'Blanco', img: blanco },
  { nombre: 'Beige', img: beige },
  { nombre: 'Rojo', img: rojo },
  { nombre: 'Azul claro', img: azulclaro },
  { nombre: 'Azul medio', img: azulmedio },
  { nombre: 'Azul oscuro', img: azuloscuro },
  { nombre: 'Azul rey', img: azulrey },
  { nombre: 'Azul turquesa', img: azulturquesa },
  { nombre: 'Naranja', img: naranja },
  { nombre: 'Verde', img: verde },
  { nombre: 'Amarillo', img: amarillo }
];

export default function App() {
  const [step, setStep] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const [camisas, setCamisas] = useState([{ color: '', talla: '' }]);
  const [datos, setDatos] = useState({ nombre: '', cedula: '', ciudad: '', direccion: '', barrio: '', celular: '', correo: '' });
  const [tiempoRestante, setTiempoRestante] = useState(73800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempoRestante(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatoTiempo = (segundos) => {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePackSelect = (n) => {
    setCantidad(n);
    setCamisas(Array(n).fill({ color: '', talla: '' }));
    setStep(2);
  };

  const handleCamisaChange = (index, field, value) => {
    const nuevas = [...camisas];
    nuevas[index] = { ...nuevas[index], [field]: value };
    setCamisas(nuevas);
  };

  const handleDatosChange = (field, value) => {
    setDatos({ ...datos, [field]: value });
  };

  const obtenerImagenColor = (nombreColor) => {
    const encontrado = colores.find(c => c.nombre === nombreColor);
    return encontrado ? encontrado.img : null;
  };

  const handleSubmit = () => {
    const detalle = camisas.map((c, i) => `Camisa ${i + 1}: ${c.color} - ${c.talla}`).join("\n");
    const templateParams = {
      ...datos,
      cantidad,
      detalle
    };

    emailjs.send('service_6ky78ug', 'template_gjb5ogc', templateParams, 'U0jIWruEWKvne7-ss')
      .then(() => setStep(4))
      .catch(() => alert('Error al enviar el pedido.'));
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto' }}>
      {step === 1 && (
        <>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Haz tu pedido fácil y rápido</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            <img src={modelo} style={{ width: '45%', maxWidth: 300 }} alt="camisas" />
            <img src={modelo2} style={{ width: '45%', maxWidth: 300 }} alt="camisa2" />
          </div>

          <div style={{ backgroundColor: '#001f3f', color: 'white', padding: 12, margin: '20px 0', textAlign: 'center', borderRadius: 6 }}>
            <h2>Selecciona un pack</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 15 }}>
            {[{ img: uno, cant: 1 }, { img: tres, cant: 3 }, { img: seis, cant: 6 }].map((p, i) => (
              <div key={i} onClick={() => handlePackSelect(p.cant)} style={{ maxWidth: 200, cursor: 'pointer', textAlign: 'center' }}>
                <img src={p.img} alt={p.cant} style={{ width: '100%', borderRadius: 10 }} />
                <button style={{ marginTop: 8, background: '#001f3f', color: 'white', padding: 6, border: 'none', borderRadius: 6 }}>Seleccionar</button>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#001f3f', color: 'white', margin: '25px 0', padding: 12, borderRadius: 6, textAlign: 'center' }}>
            <h2>Pago contraentrega</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 15 }}>
            {colores.map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={c.img} alt={c.nombre} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #ccc' }} />
                <div style={{ fontSize: 12 }}>{c.nombre}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', color: '#001f3f' }}>
            Oferta finaliza en:
            <span style={{ background: '#001f3f', color: '#fff', padding: '8px 16px', borderRadius: 8, marginLeft: 10 }}>{formatoTiempo(tiempoRestante)}</span>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <img src={oferta} alt="Oferta" style={{ maxWidth: 320, width: '100%', borderRadius: 10 }} />
            <div style={{ backgroundColor: '#001f3f', color: 'white', padding: 20, borderRadius: 10, maxWidth: 320 }}>
              <p><strong>• 98% Algodón</strong></p>
              <p><strong>• Calidad Premium</strong></p>
              <p><strong>• Tallas de la S a la XXXL</strong></p>
              <p><strong>• Tallaje normal</strong></p>
              <p><strong>• Cambios por tallas</strong></p>
              <p><strong>• Garantía de 30 días por imperfectos</strong></p>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <div>
          <h2>Selecciona color y talla</h2>
          {camisas.map((camisa, i) => {
            const imgColor = obtenerImagenColor(camisa.color);
            return (
              <div key={i} style={{ marginBottom: 30 }}>
                <p>Camisa {i + 1}</p>
                <select onChange={(e) => handleCamisaChange(i, 'color', e.target.value)}>
                  <option value=''>Selecciona color</option>
                  {colores.map(c => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
                </select>
                <select style={{ marginLeft: 10 }} onChange={(e) => handleCamisaChange(i, 'talla', e.target.value)}>
                  <option value=''>Selecciona talla</option>
                  {tallas.map(t => <option key={t}>{t}</option>)}
                </select>
                {camisa.color && imgColor && (
                  <div style={{ marginTop: 10 }}>
                    <img src={imgColor} alt={camisa.color} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                    <p style={{ fontSize: 14 }}>{camisa.color}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 15, marginTop: 20 }}>
            {colores.map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={c.img} alt={c.nombre} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ fontSize: 12 }}>{c.nombre}</div>
              </div>
            ))}
          </div>

          <img src={tabla} alt="Tabla medidas" style={{ width: '100%', marginTop: 20 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button onClick={() => setStep(1)}>Atrás</button>
            <button onClick={() => setStep(3)}>Siguiente</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Datos personales</h2>
          {["nombre", "cedula", "ciudad", "direccion", "barrio", "celular", "correo"].map((f, i) => (
            <input key={i} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} onChange={(e) => handleDatosChange(f, e.target.value)} style={{ display: 'block', margin: '10px 0', width: '100%', padding: 8 }} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <button onClick={() => setStep(2)}>Atrás</button>
            <button onClick={handleSubmit}>Confirmar pedido</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h2>¡Gracias por tu pedido!</h2>
          <p>Te contactaremos pronto por correo o WhatsApp.</p>
        </div>
      )}
    </div>
  );
}
