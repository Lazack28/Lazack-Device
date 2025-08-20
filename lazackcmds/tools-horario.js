import moment from 'moment-timezone';

const handler = async (m, {conn}) => {
  const timePeru = moment().tz('America/Lima').format('DD/MM HH:mm');
  const timeMexico = moment().tz('America/Mexico_City').format('DD/MM HH:mm');
  const timeBolivia = moment().tz('America/La_Paz').format('DD/MM HH:mm');
  const timeChile = moment().tz('America/Santiago').format('DD/MM HH:mm');
  const timeArgentina = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM HH:mm');
  const timeColombia = moment().tz('America/Bogota').format('DD/MM HH:mm');
  const timeEcuador = moment().tz('America/Guayaquil').format('DD/MM HH:mm');
  const timeCostaRica = moment().tz('America/Costa_Rica').format('DD/MM HH:mm');
  const timeCuba = moment().tz('America/Havana').format('DD/MM HH:mm');
  const timeGuatemala = moment().tz('America/Guatemala').format('DD/MM HH:mm');
  const timeHonduras = moment().tz('America/Tegucigalpa').format('DD/MM HH:mm');
  const timeNicaragua = moment().tz('America/Managua').format('DD/MM HH:mm');
  const timePanama = moment().tz('America/Panama').format('DD/MM HH:mm');
  const timeUruguay = moment().tz('America/Montevideo').format('DD/MM HH:mm');
  const timeVenezuela = moment().tz('America/Caracas').format('DD/MM HH:mm');
  const timeParaguay = moment().tz('America/Asuncion').format('DD/MM HH:mm');
  const timeNewYork = moment().tz('America/New_York').format('DD/MM HH:mm');
  const timeAsia = moment().tz('Asia/Jakarta').format('DD/MM HH:mm');
  const timeBrazil = moment().tz('America/Sao_Paulo').format('DD/MM HH:mm');
  const timeAfrica = moment().tz('Africa/Malabo').format('DD/MM HH:mm');

  await conn.sendMessage(m.chat, {
    text: `「 TIME ZONES ⏰ 」
⏱️ Peru       : ${timePeru}
⏱️ Mexico     : ${timeMexico}
⏱️ Bolivia    : ${timeBolivia}
⏱️ Chile      : ${timeChile}
⏱️ Argentina  : ${timeArgentina}
⏱️ Colombia   : ${timeColombia}
⏱️ Ecuador    : ${timeEcuador}
⏱️ Costa Rica : ${timeCostaRica}
⏱️ Cuba       : ${timeCuba}
⏱️ Guatemala  : ${timeGuatemala}
⏱️ Honduras   : ${timeHonduras}
⏱️ Nicaragua  : ${timeNicaragua}
⏱️ Panama     : ${timePanama}
⏱️ Uruguay    : ${timeUruguay}
⏱️ Venezuela  : ${timeVenezuela}
⏱️ Paraguay   : ${timeParaguay}
⏱️ New York   : ${timeNewYork}
⏱️ Asia (Jakarta): ${timeAsia}
⏱️ Brazil     : ${timeBrazil}
⏱️ Equatorial Guinea : ${timeAfrica}
${String.fromCharCode(8206).repeat(850)}
Server’s current timezone:\n[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ] ${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}`
  }, {quoted: m});
};

handler.help = ['timezones'];
handler.tags = ['info'];
handler.command = ['timezones']

export default handler;
