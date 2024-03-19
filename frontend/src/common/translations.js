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
  transport: {
    english: "State",
    spanish: "translationMissing",
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
    english: "Have you had a concussion in the past?",
    spanish: "¿Ha tenido una conmoción cerebral en el pasado?",
  },
  concussionNum: {
    english: "How many? : select number 1-10",
    spanish: "Cuantas: seleccione el número 1-10",
  },
  alertnessLoss: {
    english:
      "Did you feel any changes in alertness at any time during the fight?",
    spanish:
      "¿Sentiste algún cambio en tu estado de alerta en algún momento durante la pelea?",
  },
  alertnessLossRound: {
    english: "What Round?",
    spanish: "¿Qué ronda?",
  },
  alertnessLossLength: {
    english: "How Long? (seconds)",
    spanish: "¿cuánto tiempo? (segundos)",
  },
  headache: {
    english: "Suffering any Headache(s)?",
    spanish: "¿Sufres algún dolor de cabeza?",
  },
  headachePain: {
    english:
      "On a scale of 1-10 (10 = painfully sensitive), rate your Headache(s)",
    spanish:
      "En una escala del 1 al 10 (10 = dolorosamente sensible), califique su dolor de cabeza.",
  },
  dizziness: {
    english: "Suffering any Dizziness?",
    spanish: "¿Sufres algún mareo?",
  },
  dizzinessStart: {
    english: "When did it start?",
    spanish: "¿Cuándo empezo?",
  },
  spinning: {
    english: "Are you experiencing spinning?",
    spanish: "¿Estás experimentando giros?",
  },
  lightHead: {
    english: "Are you experiencing Lightheadedness?",
    spanish: "¿Estás experimentando aturdimiento?",
  },
  unsteady: {
    english: "Are you experiencing Unsteadiness?",
    spanish: "¿Estás experimentando inestabilidad?",
  },
  dizzinessComeAndGo: {
    english: "Does dizziness come and go?",
    spanish: "¿Los mareos van y vienen?",
  },
  dizzyChangeInVission: {
    english:
      "Are there any changes in your vision or hearing during dizziness?",
    spanish: "¿Hay algún cambio en su visión o audición durante los mareos?",
  },
  forgetfulness: {
    english: "Have you been forgetful or have Poor Memory?",
    spanish: "¿Ha sido olvidadizo o tiene mala memoria?",
  },
  forgetRecentEvents: {
    english: "Are you forgetting recent events?",
    spanish: "¿Estás olvidando los acontecimientos recientes?",
  },
  forgetNames: {
    english: "Difficult to remember names?",
    spanish: "¿Le resulta difícil recordar nombres?",
  },
  forgetItems: {
    english: "Are you misplacing items?",
    spanish: "¿Estás extraviando artículos?",
  },
  moodChanges: {
    english: "Are you experiencing any mood changes?",
    spanish: "¿Estás experimentando algún cambio de humor?",
  },
  concentrate: {
    english: "Is it difficult to Concentrate?",
    spanish: "¿Es difícil concentrarse?",
  },
  depression: {
    english: "Do you feel Depression or tearfulness?",
    spanish: "¿Sientes depresión o llanto?",
  },
  irritable: {
    english: "How often do you feel irritable or are easily angered?",
    spanish:
      "¿Con qué frecuencia te sientes irritable o estás fácilmente enojado?",
  },
  ringingEars: {
    english: "Are you suffering from any ringing in the ears?",
    spanish: "¿Sufre algún zumbido en los oídos?",
  },
  ringingStart: {
    english: "When did the ringing start?",
    spanish: "¿Cuándo empezó el timbre?",
  },
  buzzing: {
    english: "Are you hearing Buzzing?",
    spanish: "¿Estás escuchando un zumbido?",
  },
  ringing: {
    english: "Are you hearing Ringing?",
    spanish: "¿Estás escuchando un timbre?",
  },
  whistling: {
    english: "Are you hearing Whistling?",
    spanish: "¿Estás escuchando silbidos?",
  },
  hissing: {
    english: "Are you hearing Hissing?",
    spanish: "¿Estás escuchando silbido?",
  },
  ringingConstant: {
    english: "Is the ringing sound constant or On-and-off?",
    spanish: "¿El sonido del timbre es constante o intermitente?",
  },
  ringingBothEars: {
    english: "Is the ringing in one ear or both? ",
    spanish: "¿El zumbido es en un oído o en ambos?",
  },
  sleeping: {
    english: "How are you Sleeping?",
    spanish: "¿Cómo estás durmiendo?",
  },
  noiseSensitivity: {
    english: "Are you suffering from Noise sensitivity?",
    spanish: "¿Sufres de sensibilidad al ruido?",
  },
  noiseSensitivityStart: {
    english: "When did you notice sensitivity to noise?",
    spanish: "¿Cuándo notaste sensibilidad al ruido?",
  },
  noiseSensitivityTrigger: {
    english: "Are there specific sounds that trigger sensitivity?",
    spanish: "¿Hay sonidos específicos que desencadenan la sensibilidad?",
  },
  noiseSensitivityPain: {
    english: "Do you experience pain in your ears with noise?",
    spanish: "¿Siente dolor en los oídos con el ruido?",
  },
  noiseSensitivityDizziness: {
    english:
      "Are you having symptoms of Dizziness, Ringing in ears, or Headaches?",
    spanish:
      "¿Tiene síntomas de mareos, zumbidos en los oídos o dolores de cabeza?",
  },
  noiseSensitivityScale: {
    english:
      "On a scale of 1-10 (10 = painfully sensitive), rate your sensitivity",
    spanish: "TranslationMissing",
  },
  blurredVision: {
    english: "Are you suffering from any Blurred Vision?",
    spanish: "wad",
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
    spanish: "¿Tu borrosidad es intermitente?",
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
    english: "¿Sufres de alguna visión doble?",
    spanish: "¿Sufres de alguna visión doble?",
  },
  doubleVisionStart: {
    english: "When did Double vision start?",
    spanish: "¿Cuándo empezó la visión doble?",
  },
  doubleVisionConstant: {
    english: "Is your Double Vision constant?",
    spanish: "¿Tu doble visión es constante?",
  },
  doubleVisionOnAndOff: {
    english: "Is your Double Vision on-and-off?",
    spanish: "¿Su visión doble se enciende y apaga?",
  },
  doubleVisionOneEye: {
    english: "Is your Double Vision in one eye?",
    spanish: "¿Tu Visión Doble está en un ojo?",
  },
  doubleVisionBothEyes: {
    english: "Is your Double Vision in both eyes?",
    spanish: "¿Tu Visión Doble es en ambos ojos?",
  },
  lightSensitivity: {
    english: "Are you suffering from any Light sensitivity?",
    spanish: "¿Sufres de alguna sensibilidad a la luz?",
  },
  lightSensitivityStart: {
    english: "When did you notice Light Sensitivity?",
    spanish: "¿Cuándo notaste la sensibilidad a la luz?",
  },
  lightSensitivityConstant: {
    english: "Is your Light Sensitivity constant?",
    spanish: "¿Tu sensibilidad a la luz es constante?",
  },
  lightSensitivityOnAndOff: {
    english: "Is your Light Sensitivity on-and-off?",
    spanish: "¿Está activada y desactivada su sensibilidad a la luz?",
  },
  lightSensitivityTrigger: {
    english: "Do certain types of light affect your Light Sensitivity",
    spanish: "¿Ciertos tipos de luz afectan su sensibilidad a la luz?",
  },
  lightSensitivityScale: {
    english:
      "On a scale of 1-10 (10 = painfully sensitive), rate your sensitivity",
    spanish:
      "En una escala del 1 al 10 (10 = dolorosamente sensible), califique su sensibilidad",
  },
  neckPain: {
    english: "Have you experienced any Neck Pain?",
    spanish: "¿Ha experimentado algún dolor de cuello?",
  },
  neckPainScale: {
    english: "On a scale of 1-10 (10 = very painful), rate your neck pain",
    spanish:
      "En una escala de 1 a 10 (10 = muy doloroso), califique su dolor de cuello",
  },
  lowerBackPain: {
    english: "Have you experienced any Lower Back Pain?",
    spanish: "¿Ha experimentado algún dolor lumbar?",
  },
  lowerBackPainScale: {
    english:
      "On a scale of 1-10 (10 = very painful), rate your lower back pain",
    spanish:
      "En una escala de 1 a 10 (10 = muy doloroso), califique su dolor de espalda baja",
  },
};

const PbIntakeOptions = {
  result: [
    { english: "Decision", spanish: "Decisión" },
    { english: "TKO", spanish: "TKO" },
    { english: "KO", spanish: "KO" },
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
  headacheExplain: [
    { english: "Mild headaches", spanish: "Dolores de cabeza leves" },
    { english: "Moderate headaches", spanish: "Dolores de cabeza moderados" },
    {
      english: "Severe headaches",
      spanish: "Dolores de cabeza severos",
    },
  ],
  concentrateExplain: [
    { english: "Sometimes", spanish: "A veces" },
    { english: "Often", spanish: "A menudo" },
    {
      english: "All the time",
      spanish: "Todo el tiempo",
    },
  ],
  depressionExplain: [
    { english: "Sometimes", spanish: "A veces" },
    { english: "Often", spanish: "A menudo" },
    {
      english: "All the time",
      spanish: "Todo el tiempo",
    },
  ],
  irritable: [
    { english: "Not at all", spanish: "Para nada" },
    {
      english: "Sometimes I feel irritable and easily get angered",
      spanish: "A veces me siento irritable y me enojo fácilmente.",
    },
    {
      english: "Often I feel irritable and easily get angered",
      spanish: "A menudo me siento irritable y me enojo fácilmente.",
    },
    {
      english: "I feel irritable and I get easily get angered all the time",
      spanish: "Me siento irritable y me enojo fácilmente todo el tiempo.",
    },
  ],
  sleeping: [
    { english: "I sleep very well", spanish: "Duermo muy bien." },
    {
      english: "I sleep good most of the time",
      spanish: "Duermo bien la mayor parte del tiempo.",
    },
    {
      english: "I hardly get good sleep",
      spanish: "casi no duermo bien.",
    },
    {
      english: "Im not sleeping",
      spanish: "No estoy durmiendo.",
    },
  ],
  neckPainExplain: [
    { english: "Sometimes", spanish: "A veces" },
    { english: "Often", spanish: "A menudo" },
    {
      english: "All the time",
      spanish: "Todo el tiempo",
    },
    { english: "Right now", spanish: "Ahora mismo" },
  ],
  lowerBackPainExplain: [
    { english: "Sometimes", spanish: "A veces" },
    { english: "Often", spanish: "A menudo" },
    {
      english: "All the time",
      spanish: "Todo el tiempo",
    },
    { english: "Right now", spanish: "Ahora mismo" },
  ],
};
export { intakeQs, pBintakeQs, PbIntakeOptions };
