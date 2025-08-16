const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

conn.reply(m.chat, `${emoji2} Buscando una frase, espere un momento...`, m)

conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.frases)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m)

}
handler.help = ['frase']
handler.tags = ['fun']
handler.command = ['frase']
handler.fail = null
handler.exp = 0
handler.group = true;
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

global.frases = [
    "Recuerda que no puedes fallar en ser tú mismo (Wayne Dyer)",
    "Siempre es temprano para rendirse (Jorge Álvarez Camacho)",
    "Sólo una cosa convierte en imposible un sueño: el miedo a fracasar (Paulo Coelho)",
    "Lo que haces hoy puede mejorar todos tus mañanas (Ralph Marston)",
    "Cáete siete veces y levántate ocho (Proverbio japonés)",
    "Nada sucede hasta que algo se mueve (Albert Einstein)",
    "La felicidad está escondida en la sala de espera de la felicidad (Eduard Punset)",
    "El verdadero buscador crece y aprende, y descubre que siempre es el principal responsable de lo que sucede (Jorge Bucay)",
    "La vida comienza al final de la zona de confort (Neale Donald Walsch)",
    "La confianza en sí mismo es el primer secreto del éxito (Ralph Waldo Emerson)",
    "No hay camino para la paz, la paz es el camino. (Mahatma Gandhi)",
    "La vida es lo que pasa mientras estás ocupado haciendo otros planes. (John Lennon)",
    "La vida es un 10% lo que me ocurre y un 90% cómo reacciono a ello. (Charles R. Swindoll)",
    "El único modo de hacer un gran trabajo es amar lo que haces. (Steve Jobs)",
    "No importa qué tan lento vayas, siempre y cuando no te detengas. (Confucio)",
    "No te preocupes si no tienes éxito, siempre puedes ser un buen ejemplo de cómo no hacerlo.",
    "La única razón por la que estoy en forma es porque redondeo.",
    "Soy multitarea: puedo procrastinar, ignorar y olvidarme al mismo tiempo.",
    "Si la vida te da limones, pide sal y tequila.",
    "La risa es la distancia más corta entre dos personas.",
    "No soy un completo inútil, al menos sirvo de mal ejemplo.",
    "A veces la mayor aventura es simplemente un acto de valentía.",
    "Soy vago, pero no me gusta que digan que soy perezoso.",
    "Si no puedes convencerlos, confúndelos.",
    "La vida es corta, haz que cuente.",
    "La vida es una comedia escrita por un dramaturgo que es un poco sordo.",
    "Hazlo o no lo hagas, pero no lo intentes.",
    "La felicidad no es un destino, es una forma de viajar. (Margaret Lee Runbeck)",
    "El tiempo vuela, pero yo soy el piloto.",
    "No soy vago, estoy en modo de ahorro de energía.",
    "La vida es como montar en bicicleta. Para mantener el equilibrio, debes seguir adelante. (Albert Einstein)",
    "Nunca discutas con un tonto, te arrastrará a su nivel y te ganará por experiencia.",
    "Ayer era la fecha límite para todos mis problemas.",
    "La única forma de hacer un gran trabajo es amar lo que haces. (Steve Jobs)",
    "La vida es un reto, enfréntalo.",
    "Si no tienes un plan, estás planeando fracasar.",
    "La vida es una aventura, atrévete a vivirla."
];