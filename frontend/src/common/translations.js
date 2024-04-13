const intakeQs = {
  firstName: {
    english: "First Name",
    spanish: "Nombre de pila",
    chinese: "名",
    armenian: "translationMissing",
  },
  lastName: {
    english: "Last Name",
    spanish: "Apellido",
    chinese: "姓",
    armenian: "translationMissing",
  },
  middleName: {
    english: "Middle Name",
    spanish: "translationMissing",
    chinese: "中间初始",
    armenian: "translationMissing",
  },
  dob: {
    english: "Date of Birth",
    spanish: "Fecha de nacimiento",
    chinese: "出生日期 ",
    armenian: "translationMissing",
  },
  sex: {
    english: "Sex",
    spanish: "Género",
    chinese: "性别",
    armenian: "translationMissing",
  },
  address1: {
    english: "Address 1",
    spanish: "translationMissing",
    chinese: "家庭地址",
    armenian: "translationMissing",
  },
  address2: {
    english: "Address 2",
    spanish: "translationMissing",
    chinese: "家庭住址二",
    armenian: "translationMissing",
  },
  city: {
    english: "City",
    spanish: "translationMissing",
    chinese: "城市",
    armenian: "translationMissing",
  },
  state: {
    english: "State",
    spanish: "translationMissing",
    chinese: "状态",
    armenian: "translationMissing",
  },
  zip: {
    english: "Zip Code",
    spanish: "translationMissing",
    chinese: "邮政编码",
    armenian: "translationMissing",
  },
  insurance: {
    english: "Do you Have Insurance?",
    spanish: "translationMissing",
    chinese: "你有保险吗?",
    armenian: "translationMissing",
  },
  phone1: {
    english: "Cell Phone",
    spanish: "translationMissing",
    chinese: "手机",
    armenian: "translationMissing",
  },
  phone2: {
    english: "Secondary Phone",
    spanish: "translationMissing",
    chinese: "辅助电话号码",
    armenian: "translationMissing",
  },
  email: {
    english: "Email",
    spanish: "Correo electrónico",
    chinese: "电子邮件地址",
    armenian: "translationMissing",
  },
  insRelationship: {
    english: "Relationship to Policy Holder",
    spanish: "translationMissing",
    chinese: "与保单持有人的关系是什么?",
    armenian: "translationMissing",
  },
  insFirstName: {
    english: "First Name of Policy Holder",
    spanish: "translationMissing",
    chinese: "保单持有人的名字",
    armenian: "translationMissing",
  },
  insLastName: {
    english: "Last Name of Policy Holder",
    spanish: "translationMissing",
    chinese: "保单持有人的姓氏",
    armenian: "translationMissing",
  },
  insDob: {
    english: "Birthdate of Policy Holder",
    spanish: "translationMissing",
    chinese: "保单持有人的出生日期",
    armenian: "translationMissing",
  },
  insProvider: {
    english: "Insurance Provider",
    spanish: "translationMissing",
    chinese: "谁是您的保险提供商?",
    armenian: "translationMissing",
  },
  insOtherProvider: {
    english: "Other Insurance Provider",
    spanish: "translationMissing",
    chinese: "translationMissing",
    armenian: "translationMissing",
  },
  insuranceId: {
    english: "Insurance ID #",
    spanish: "translationMissing",
    chinese: "保险识别号码",
    armenian: "translationMissing",
  },
  insGroupName: {
    english: "Group Name",
    spanish: "translationMissing",
    chinese: "什么是保险团体号码?",
    armenian: "translationMissing",
  },
  insGroupNumber: {
    english: "Group Number",
    spanish: "translationMissing",
    chinese: "保险集团名称是什么?",
    armenian: "translationMissing",
  },
  insPhotoFront: {
    english: "Upload front of insurance card",
    spanish: "translationMissing",
    chinese: "保险卡正面图片",
    armenian: "translationMissing",
  },
  insPhotoBack: {
    english: "Upload back of insurance card",
    spanish: "translationMissing",
    chinese: "保险卡背面图片",
    armenian: "translationMissing",
  },
  tobaccoUse: {
    english: "Tobacco Use",
    spanish: "translationMissing",
    chinese: "你使用烟草吗？",
    armenian: "translationMissing",
  },
  alcoholUse: {
    english: "Alcohol Use",
    spanish: "translationMissing",
    chinese: "你喝酒吗？",
    armenian: "translationMissing",
  },
  drugUse: {
    english: "Drug Use",
    spanish: "translationMissing",
    chinese: "你使用毒品吗？",
    armenian: "translationMissing",
  },
  otherDrugUse: {
    english: "(Drug Use) If so, Explain:",
    spanish: "translationMissing",
    chinese: "请解释更多?",
    armenian: "translationMissing",
  },
};

const pBintakeQs = {
  firstName: {
    english: "First Name",
    spanish: "Nombre de pila",
  },
  lastName: {
    english: "Last Name",
    spanish: "Apellido",
  },
  promoter: {
    english: "Promoter",
    spanish: "Promotor",
  },
  physicianName: {
    english: "Physicians Name",
    spanish: "Nombre del médico",
  },
  idPid: {
    english: "Picture of Identification",
    spanish: "Imagen de identificación",
  },
  dof: {
    english: "Date of Fight",
    spanish: "Fecha de la pelea",
  },
  location: {
    english: "Location of Fight",
    spanish: "Ubicación de la pelea",
  },
  result: {
    english: "Fight Result",
    spanish: "Resultado de la pelea",
  },
  status: {
    english: "Your Status after Fight",
    spanish: "Tu estado después de la pelea",
  },
  hospitalName: {
    english: "Name of Hospital",
    spanish: "Nombre del hospital",
  },
  visitLength: {
    english: "Length of Hospital Stay (Hours)",
    spanish: "Duración de la estancia hospitalaria (horas)",
  },
  concussion: {
    english: "Have you had a Head Injury before?",
    spanish: "¿Ha tenido una lesión en la cabeza antes?",
  },
  concussionNum: {
    english: "How many? : select number 1-10",
    spanish: "Cuantas: seleccione el número 1-10",
  },
  alertnessLoss: {
    english: "Did you feel any changes in your awareness during the fight?",
    spanish: "¿Sentiste algún cambio en tu conciencia durante la pelea?",
  },
  alertnessLossRound: {
    english: "What Round?",
    spanish: "¿Qué round?",
  },
  alertnessLossLength: {
    english: "How Long? (seconds)",
    spanish: "¿cuánto tiempo? (segundos)",
  },
  drugsOrAlcohol: {
    english: "Any Alcohol or Drug Use since time of Fight?",
    spanish: "¿Algún consumo de alcohol o drogas posterior la pelea?",
  },
  headache: {
    english: "Have you felt any Headache(s)?",
    spanish: "¿Sufres algún dolor de cabeza?",
  },
  headachePainScale: {
    english: "On a scale of 1-5 (5 = very painful), rate your Headache(s)",
    spanish:
      "En una escala del 1 al 5 (1 = leve 5 = severo), califique su dolor de cabeza.",
  },
  dizziness: {
    english: "Have you felt any dizziness since the fight?",
    spanish: "¿Has sentido mareos posteriormente a la pelea?",
  },
  dizzinessStart: {
    english: "When after your fight did it start?",
    spanish: "¿Cuándo comensaron después de la pelea?",
  },
  dizzyLying: {
    english: "Are you dizzy when lying down?",
    spanish: "¿Sientes mareos acostado?",
  },
  dizzySitting: {
    english: "Are you dizzy when sitting?",
    spanish: "¿Sientes mareos sentado?",
  },
  dizzyStanding: {
    english: "Are you dizzy when standing up?",
    spanish: "¿Sientes mareos cuando te pones de pie?",
  },
  lightheaded: {
    english: "Have you felt lightheaded any time after the fight?",
    spanish: "¿Te has sentido mareado en algún momento después de la pelea?",
  },
  headSpinning: {
    english:
      "Have you felt like your head is spinning any time after the fight?",
    spanish: "¿Hay algún cambio en su visión o audición durante los mareos?",
  },
  forgetfulness: {
    english: "Have you been forgetful since the fight?",
    spanish: "¿Has sido olvidadizo posteriormente a la pelea?",
  },
  forgetRecentEvents: {
    english: "Are you forgetting recent events?",
    spanish: "¿Olvidas acontecimientos recientes?",
  },
  forgetNames: {
    english: "Difficult to remember names?",
    spanish: "¿Te es difícil recordar nombres?",
  },
  forgetItems: {
    english: "Are you misplacing items?",
    spanish: "¿Extravias artículos personales?",
  },
  moodChanges: {
    english: "Are you experiencing any mood changes?",
    spanish: "¿Experimentas algún cambio de humor?",
  },
  concentrate: {
    english: "Has it been hard for you to Concentrate?",
    spanish: "¿Te es difícil concentrarte?",
  },
  depression: {
    english: "Have you been experiencing any depression since the fight?",
    spanish: "¿Te deprimiste en las 72 horas posteriores a la pelea?",
  },
  depressionExplain: {
    english: "When did it start?",
    spanish: "¿Cuándo empezo?",
  },
  irritable: {
    english: "Have you been feeling easily angered after the fight?",
    spanish: "¿Te has enojado fácilmente en las 72 horas despues de la pelea?",
  },
  ringingEars: {
    english: "Are you suffering from any ringing in the ears?",
    spanish: "¿Sufres algún ruido en los oídos?",
  },
  ringingStart: {
    english: "When did the ringing start?",
    spanish: "¿Cuándo empezó el ruido?",
  },
  hearingBothEars: {
    english: "Can you hear in both ears?",
    spanish: "¿El zumbido es en un oído o en ambos oídos?",
  },
  leftRightEar: {
    english: "Which ear can you hear from?",
    spanish: "¿De qué oído puedes oír?",
  },
  sleeping: {
    english: "On average, how many hours of sleep are you getting per night?",
    spanish: "En promedio, ¿cuántas horas duermes por noche?",
  },
  noiseSensitivity: {
    english: "Have you felt any pain caused by noise after the fight?",
    spanish:
      "¿Has notado alguna sensibilidad al ruido en las 72 horas posteriores a la pelea?",
  },
  noiseSensitivityStart: {
    english: "When did you notice sensitivity to loud sounds?",
    spanish: "¿Cuándo notaste sensibilidad al ruido?",
  },
  noiseSensitivityScale: {
    english:
      "On a scale of 1-5 (5 = very painful), rate the pain caused by loud sounds",
    spanish:
      "En una escala del 1 al 5 (5 = muy doloroso), califica tu dolor por ruido",
  },
  blurredVision: {
    english: "Have you experienced any blurred vision after the fight?",
    spanish:
      "¿Has tenido visión borrosa a las 72 horas posteriores a la pelea?",
  },
  blurredVisionStart: {
    english: "When did Blurred vision start?",
    spanish: "¿Cuándo empezó la visión borrosa?",
  },
  blurredVisionConstant: {
    english: "Is your blurred vision constant?",
    spanish: "¿Tu visión borrosa es constante?",
  },
  blurredVisionOnAndOff: {
    english: "Is your blurriness on-and-off?",
    spanish: "¿Tu vision borrosa es intermitente?",
  },
  blurredVisionOneEye: {
    english: "Is your blurriness in one eye?",
    spanish: "¿Tu visión borrosa está en un ojo?",
  },
  blurredVisionBothEyes: {
    english: "Is your blurriness in both eyes?",
    spanish: "¿Tienes visión borrosa en ambos ojos?",
  },
  doubleVision: {
    english: "Are you experiencing any Double Vision?",
    spanish: "¿Has tenido visión doble en las últimas 72 horas?",
  },
  doubleVisionStart: {
    english: "When did double vision start?",
    spanish: "¿Cuándo empezó la visión doble?",
  },
  doubleVisionConstant: {
    english: "Is your Double Vision constant?",
    spanish: "¿Tu doble visión es constante?",
  },
  doubleVisionOnAndOff: {
    english: "Is your double vision on-and-off?",
    spanish: "¿Tu visión doble es intermitente?",
  },
  lightSensitivity: {
    english: "Are you experiencing any sensitivty to Light after the fight?",
    spanish: "¿Has sido sensible a la Luz en las últimas 72 horas?",
  },
  lightSensitivityStart: {
    english: "When did you notice the eye pain from light?",
    spanish: "¿Cuándo notaste la sensibilidad a la luz?",
  },
  lightSensitivityConstant: {
    english: "Is your Light Sensitivity all the time?",
    spanish: "¿Tu sensibilidad a la luz es todo el tiempo?",
  },
  lightSensitivityOnAndOff: {
    english: "Is your Light Sensitivity on-and-off?",
    spanish: "¿Tu sensibilidad a la luz es intermitente?",
  },
  lightSensitivityScale: {
    english:
      "On a scale of 1-5 (5 = very painful), how painful is Light to your eyes?",
    spanish:
      "En una escala del 1 al 5 (5 = muy doloroso), ¿qué tan dolorosa es la luz para ti?",
  },
  neckPain: {
    english: "Have you experienced any Neck Pain?",
    spanish: "¿Ha experimentado algún dolor de cuello en las últimas 72 horas?",
  },
  neckPainStart: {
    english: "When did your neck pain start?",
    spanish: "¿Cuándo empezó tu dolor de cuello?",
  },
  neckPainScale: {
    english: "On a scale of 1-5 (5 = very painful), rate your Neck Pain",
    spanish:
      "En una escala del 1 al 5 (5 = muy doloroso), califique su dolor de cuello",
  },
  lowerBackPain: {
    english: "Have you experienced any Lower Back Pain?",
    spanish:
      "¿Ha experimentado algún dolor de espalda baja en las últimas 72 horas?",
  },
  lowerBackPainStart: {
    english: "When did your lower back pain start?",
    spanish: "¿Cuándo empezó tu dolor de espalda?",
  },
  lowerBackPainScale: {
    english: "On a scale of 1-5 (5 = very painful), rate your lower back pain",
    spanish:
      "En una escala del 1 al 5 (5 = muy doloroso), califique su dolor de espalda baja",
  },
  symptoms: {
    english: "Select Any other symptoms you have experienced after the fight.",
    spanish:
      "Seleccione Cualquier otro síntoma que haya experimentado después de la pelea.",
  },
  comments: {
    english: "Enter Comments or Details Here: enter (500 characters)",
    spanish: "Ingrese comentarios o detalles aquí",
  },
  additionalPIds: {
    english: "Additional Photos",
    spanish: "Fotos adicionales",
  },
};

const PbIntakeOptions = {
  result: [
    { english: "Decision", spanish: "Decisión" },
    { english: "TKO", spanish: "Nocaut tecnico" },
    { english: "KO", spanish: "Nocaut" },
    { english: "Submission", spanish: "Envío" },
    { english: "Tap Out", spanish: "Rendirse" },
  ],
  status: [
    { english: "Sent Home", spanish: "Enviado a casa" },
    { english: "Sent to Hospital", spanish: "Enviado al hospital" },
  ],
  transport: [
    { english: "By Ambulance", spanish: "En ambulancia" },
    { english: "Private Transportation", spanish: "Transporte Privado" },
    {
      english: "Left without being examined",
      spanish: "Se fue sin ser examinado",
    },
    {
      english: "Refused Medical Advice/Treatment",
      spanish: "Asesoramiento/tratamiento médico rechazado",
    },
  ],
  drugsOrAlcohol: [
    { english: "Not at all", spanish: "Para nada" },
    { english: "Day 1", spanish: "Día 1" },
    { english: "Day 2", spanish: "Día 2" },
    { english: "Day 3", spanish: "Día 3" },
    { english: "All Days", spanish: "Todos los días" },
  ],
  headacheExplain: [
    { english: "Mild headaches", spanish: "Dolores de cabeza leves" },
    { english: "Moderate headaches", spanish: "Dolores de cabeza moderados" },
    {
      english: "Severe headaches",
      spanish: "Dolores de cabeza severos",
    },
  ],
  daysOneToThree: [
    { english: "Day 1", spanish: "Día 1" },
    { english: "Day 2", spanish: "Día 2" },
    { english: "Day 3", spanish: "Día 3" },
  ],
  concentrateExplain: [
    { english: "Sometimes", spanish: "A veces" },
    { english: "Often", spanish: "A menudo" },
    { english: "All the time", spanish: "Todo el tiempo" },
  ],
  irritable: [
    { english: "Not at all", spanish: "Para nada" },
    { english: "Sometimes", spanish: "A veces." },
    { english: "Often", spanish: "A menudo." },
    { english: "All the time", spanish: "Todo el tiempo." },
  ],
  ringingConstant: [
    { english: "A lot", spanish: "Mucho" },
    { english: "Sometimes", spanish: "A veces" },
  ],
  hearingBothEars: [
    { english: "One ear", spanish: "Un oído" },
    { english: "Both ears", spanish: "Ambos oídos" },
  ],
  sleeping: [
    { english: "0-1", spanish: "0-1" },
    { english: "1-3", spanish: "1-3" },
    { english: "4-6", spanish: "4-6" },
    { english: "7-9", spanish: "7-9" },
    { english: "More", spanish: "Mas" },
  ],
};

const pbHeaders = {
  pgOne: {
    english:
      "Head injuries are serious. Answer the following questions for tonight and the next 3 days after your fight.",
    spanish:
      "Las lesiones en la cabeza son graves. Responda las siguientes preguntas para esta noche y los próximos 3 días después de su pelea.",
  },
  pgTwo: {
    english:
      "For tonight and the next 3 days, answer the below questions to see if you have suffered a head injury after your fight.",
    spanish:
      "Para esta noche y los próximos 3 días, responda las siguientes preguntas para ver si sufrió una lesión en la cabeza después de su pelea.",
  },
  pgThree: {
    english:
      "For tonight and th next 3 days, answer the questions below to monitor your headache(s) and dizziness after the fight.",
    spanish:
      "En los 3 días posteriores a su pelea, las siguientes preguntas son para controlar sus dolores de cabeza y mareos.",
  },
  pgFour: {
    english:
      "For tonight and the next 3 days, answer the questions below to monitor your memory and mood.",
    spanish:
      "En los 3 días posteriores a tu pelea, las siguientes preguntas son para controlar tu memoria y estado de ánimo.",
  },
  pgFive: {
    english:
      "For tonight and the next 3 days, answer the below questions to monitor your hearing.",
    spanish:
      "En los 3 días posteriores a su pelea, las siguientes preguntas son para controlar su audición.",
  },
  pgSix: {
    english:
      "For tonight and the next 3 days, answer the below questions to monitor your sleep habits.",
    spanish:
      "En los 3 días posteriores a tu pelea, las siguientes preguntas son para controlar tus hábitos de sueño.",
  },
  pgSeven: {
    english:
      "For tonight and the next 3 days, answer the below questions to monitor how you respond to Loud Sounds.",
    spanish:
      "En los 3 días posteriores a tu pelea, las siguientes preguntas son para monitorear cómo respondes al ruido.",
  },
  pgEight: {
    english:
      "In the 3 days after your fight, the below questions are to monitor your vision.",
    spanish:
      "En los 3 días posteriores a tu pelea, las siguientes preguntas son para controlar tu visión.",
  },
  pgNine: {
    english:
      "In the 3 days after your fight, the below questions are to monitor your neck and back pain.",
    spanish:
      "En los 3 días posteriores a tu pelea, las siguientes preguntas son para identificar tu dolor de cuello y espalda.",
  },
  pgTen: {
    english:
      "In the 3 day after your fight, Select Any other symptoms you have experienced.",
    spanish:
      "En los 3 días posteriores a su pelea, seleccione Cualquier otro síntoma que haya experimentado.",
  },
};

export { intakeQs, pBintakeQs, PbIntakeOptions, pbHeaders };
