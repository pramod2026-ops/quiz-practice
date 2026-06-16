const startScreen = document.getElementById("start-screen");

const quizScreen = document.getElementById("quiz-screen");

const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");

const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");

const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");

const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");

const restartButton = document.getElementById("restart-btn");

const progressBar = document.getElementById("progress");
 



const QUESTIONS_PER_SET = 25;

let currentSetQuestions = [];
let currentSetIndex = 0;
let playedSets = [];

const questionsBank = [
  {
    question: "Florence Nightingale's Nursing Theory focused on:",
    options: [
      { text: "Problem solving", correct: false },
      { text: "Environment", correct: true },
      { text: "Adaptation", correct: false },
      { text: "Self-care", correct: false }
    ]
  },
  {
    question: "Abdellah's Nursing Theory focused on:",
    options: [
      { text: "Environment", correct: false },
      { text: "Adaptation", correct: false },
      { text: "Self-care", correct: false },
      { text: "Problem solving", correct: true }
    ]
  },
  {
    question: "Which nursing theorist considered nursing as assisting sick people for recovery or peaceful death?",
    options: [
      { text: "Florence Nightingale", correct: false },
      { text: "Dorothea E. Orem", correct: false },
      { text: "Dorothy Johnson", correct: false },
      { text: "Virginia Henderson", correct: true }
    ]
  },
  {
    question: "Sister Callista Roy considered following adaptive modes except:",
    options: [
      { text: "Physiologic mode", correct: false },
      { text: "Role diffusion mode", correct: true },
      { text: "Self concept mode", correct: false },
      { text: "Interdependence mode", correct: false }
    ]
  },
  {
    question: "Nursing is a non-curative practice in which the individual is put in the best possible condition for nature to act. This definition was given by:",
    options: [
      { text: "Florence Nightingale", correct: true },
      { text: "Sister Callista Roy", correct: false },
      { text: "Virginia Henderson", correct: false },
      { text: "Dorothea E. Orem", correct: false }
    ]
  },
  {
    question: "A patient with hemiplegia on NG tube feeding and catheter requires which type of nursing system?",
    options: [
      { text: "Wholly compensatory nursing system", correct: true },
      { text: "Partly compensatory nursing system", correct: false },
      { text: "Data validation", correct: false },
      { text: "Data recording", correct: false }
    ]
  },
  {
    question: "The theory that nurses assist individuals to perform activities contributing to health, recovery or peaceful death was developed by:",
    options: [
      { text: "E. Wiedenbach", correct: false },
      { text: "Virginia Henderson", correct: true },
      { text: "L.E. Hall", correct: false },
      { text: "M.E. Rogers", correct: false }
    ]
  },
  {
    question: "The practice of activities individuals initiate and perform on their own behalf in maintaining life, health and wellbeing is:",
    options: [
      { text: "Therapeutic self-care demand", correct: false },
      { text: "Self-care", correct: true },
      { text: "Self-care agency", correct: false },
      { text: "Nursing system", correct: false }
    ]
  },
  {
    question: "All are major concepts of Nursing Theories except:",
    options: [
      { text: "Human", correct: false },
      { text: "Health", correct: false },
      { text: "Environment", correct: false },
      { text: "Disease", correct: true }
    ]
  },
  {
    question: "Who is known as the Nightingale of Modern Nursing?",
    options: [
      { text: "Virginia Henderson", correct: true },
      { text: "Abdellah", correct: false },
      { text: "Sister Callista Roy", correct: false },
      { text: "Peplau", correct: false }
    ]
  },
  {
    question: "The first nurse and woman to serve as deputy surgeon general was:",
    options: [
      { text: "Virginia Henderson", correct: false },
      { text: "Faye Glenn Abdellah", correct: true },
      { text: "Sister Callista Roy", correct: false },
      { text: "Florence Nightingale", correct: false }
    ]
  },
  {
    question: "Which theory belongs to the nurse whose work later became the first theoretical model in nursing?",
    options: [
      { text: "Self-care theory of Orem", correct: false },
      { text: "Theory of Independence by Henderson", correct: false },
      { text: "Environmental theory of Nightingale", correct: true },
      { text: "Theory of Adaptation by Roy", correct: false }
    ]
  },
  {
    question: "The 14 basic components of nursing care were developed by:",
    options: [
      { text: "Florence Nightingale", correct: false },
      { text: "Callista Roy", correct: false },
      { text: "Dorothea Orem", correct: false },
      { text: "Virginia Henderson", correct: true }
    ]
  },
  {
    question: "The theory emphasizing interpersonal relationships between nurse and patient was developed by:",
    options: [
      { text: "Roy", correct: false },
      { text: "Leininger", correct: false },
      { text: "Henderson", correct: false },
      { text: "Peplau", correct: true }
    ]
  },
  {
    question: "Which theory best describes the environment theory?",
    options: [
      { text: "Roy's adaptation model", correct: false },
      { text: "Orem's self-care deficit theory", correct: false },
      { text: "Nightingale's theory", correct: true },
      { text: "Henderson's theory", correct: false }
    ]
  },
  {
    question: "Henderson's theory focuses on:",
    options: [
      { text: "Environmental factors", correct: false },
      { text: "Self-care deficits", correct: false },
      { text: "Nursing functions", correct: true },
      { text: "Adaptive responses", correct: false }
    ]
  },
  {
    question: "The four paradigms of Nursing Theories are:",
    options: [
      { text: "Person, Health, Nursing and Existence", correct: false },
      { text: "Person, Health, Nurturing and Environment", correct: false },
      { text: "Person, Healing, Nursing and Environment", correct: false },
      { text: "Person, Health, Nursing and Environment", correct: true }
    ]
  },
  {
    question: "Which theory contains the Sunrise Model as its conceptual framework?",
    options: [
      { text: "Leininger's Transcultural Nursing Theory", correct: true },
      { text: "Henderson's Theory of Independence", correct: false },
      { text: "Peplau's Theory of Nurse-Patient Relation", correct: false },
      { text: "Orem's Theory of Self Care", correct: false }
    ]
  },
  {
    question: "Which theory defines nursing as the science and practice that expands adaptive abilities and enhances person and environment transformation?",
    options: [
      { text: "Goal attainment theory", correct: false },
      { text: "Henderson's definition of nursing", correct: false },
      { text: "Roy's adaptation model", correct: true },
      { text: "Faye Glenn Abdellah's theory", correct: false }
    ]
  },
  {
    question: "Which is NOT a concept explained in Dorothy Johnson's Behavioral Systems Model?",
    options: [
      { text: "Affiliation", correct: false },
      { text: "Dependency", correct: false },
      { text: "Achievement", correct: false },
      { text: "Energy fields", correct: true }
    ]
  },
  {
    question: "Which theory used General Systems Theory as a framework for its development?",
    options: [
      { text: "Florence Nightingale's Environment Theory", correct: false },
      { text: "Peplau's Psychodynamic Nursing Theory", correct: false },
      { text: "Martha Rogers' Science of Unitary Human Beings", correct: false },
      { text: "Neuman's Model", correct: true }
    ]
  },
  {
    question: "The humanistic science of nursing was explained by:",
    options: [
      { text: "Rogers", correct: true },
      { text: "Ida Orlando", correct: false },
      { text: "Nightingale", correct: false },
      { text: "Neuman", correct: false }
    ]
  },
  {
    question: "According to Roy's adaptation theory, which subsystem responds through cognitive-emotive channels?",
    options: [
      { text: "Regulator subsystem", correct: false },
      { text: "Cognator subsystem", correct: true },
      { text: "Physiologic mode", correct: false },
      { text: "Self-concept mode", correct: false }
    ]
  },
  {
    question: "\"Nursing is a therapeutic interpersonal process\" was stated by:",
    options: [
      { text: "Hildegard Peplau", correct: true },
      { text: "Jean Watson", correct: false },
      { text: "Faye Glenn Abdellah", correct: false },
      { text: "Martha Rogers", correct: false }
    ]
  },
  {
    question: "The typology of twenty-one nursing problems was explained by:",
    options: [
      { text: "Imogene King", correct: false },
      { text: "Virginia Henderson", correct: false },
      { text: "Faye G. Abdellah", correct: true },
      { text: "Lydia E. Hall", correct: false }
    ]
  },

  {
  question: "Which statement is related to Florence Nightingale?",
  options: [
    { text: "Nursing is a therapeutic interpersonal process.", correct: false },
    { text: "The role of nursing is to facilitate the body's reparative processes by manipulating the client's environment.", correct: true },
    { text: "Nursing expands adaptive abilities and enhances person and environment transformation.", correct: false },
    { text: "Nursing care becomes necessary when a client cannot fulfill biological, psychological, developmental, or social needs.", correct: false }
  ]
},
{
  question: "The Environmental Theory was developed by:",
  options: [
    { text: "Florence Nightingale", correct: true },
    { text: "Abdellah", correct: false },
    { text: "Dorothea Orem", correct: false },
    { text: "Virginia Henderson", correct: false }
  ]
},
{
  question: "Who emphasized the patient's independence and identified 14 basic needs of nursing care?",
  options: [
    { text: "Florence Nightingale", correct: false },
    { text: "Virginia Henderson", correct: true },
    { text: "Sister Callista Roy", correct: false },
    { text: "Dorothea E. Orem", correct: false }
  ]
},
{
  question: "Who developed the Self-Care Theory in nursing?",
  options: [
    { text: "Florence Nightingale", correct: false },
    { text: "Virginia Henderson", correct: false },
    { text: "Sister Callista Roy", correct: false },
    { text: "Dorothea E. Orem", correct: true }
  ]
},
{
  question: "According to Virginia Henderson's definition, how many fundamental needs does a person have?",
  options: [
    { text: "7", correct: false },
    { text: "14", correct: true },
    { text: "18", correct: false },
    { text: "22", correct: false }
  ]
},
{
  question: "Who proposed the Self-Care Deficit Theory?",
  options: [
    { text: "Virginia Henderson", correct: false },
    { text: "Dorothea Orem", correct: true },
    { text: "Betty Neuman", correct: false },
    { text: "Florence Nightingale", correct: false }
  ]
},
{
  question: "Which theory defines nursing as expanding adaptive abilities and enhancing person-environment transformation?",
  options: [
    { text: "Goal Attainment Theory", correct: false },
    { text: "Henderson's Definition", correct: false },
    { text: "Roy's Adaptation Model", correct: true },
    { text: "Faye Glenn Abdellah's Theory", correct: false }
  ]
},
{
  question: "Client-centered comprehensive care based on problem solving was generated by:",
  options: [
    { text: "Florence Nightingale", correct: false },
    { text: "Virginia Henderson", correct: false },
    { text: "Dorothea Orem", correct: false },
    { text: "Faye G. Abdellah", correct: true }
  ]
},
{
  question: "A myocardial infarction patient who can eat and brush independently but needs help with toileting requires:",
  options: [
    { text: "Wholly compensatory nursing system", correct: false },
    { text: "Partly compensatory nursing system", correct: true },
    { text: "Supportive educative nursing system", correct: false },
    { text: "Self-care system", correct: false }
  ]
},
{
  question: "The 14 components of basic nursing care were proposed by:",
  options: [
    { text: "Virginia Henderson", correct: true },
    { text: "Dorothea Orem", correct: false },
    { text: "Roy", correct: false },
    { text: "Florence Nightingale", correct: false }
  ]
},
{
  question: "Roy's Adaptation Model defines a person as:",
  options: [
    { text: "A biopsychosocial being", correct: true },
    { text: "A multidimensional being", correct: false },
    { text: "A human being", correct: false },
    { text: "An organized energy field", correct: false }
  ]
},
{
  question: "The practice of activities performed on one's own behalf to maintain life and health is:",
  options: [
    { text: "Self-care", correct: true },
    { text: "Self-care agency", correct: false },
    { text: "Therapeutic self-care demand", correct: false },
    { text: "Self-care requisites", correct: false }
  ]
},
{
  question: "Who stated that nursing's goal is to put the patient in the best possible condition for nature to act?",
  options: [
    { text: "Henderson", correct: false },
    { text: "Jean Watson", correct: false },
    { text: "Martha Rogers", correct: false },
    { text: "Florence Nightingale", correct: true }
  ]
},
{
  question: "The ethical principle 'Above all, do no harm' refers to:",
  options: [
    { text: "Human dignity", correct: false },
    { text: "Justice", correct: false },
    { text: "Beneficence", correct: false },
    { text: "Non-maleficence", correct: true }
  ]
},
{
  question: "The foundation for ethical nursing practice, laws and regulations is known as:",
  options: [
    { text: "Legal aspect", correct: false },
    { text: "Ethical consideration", correct: false },
    { text: "Code of ethics", correct: true },
    { text: "Ethical principle", correct: false }
  ]
},
{
  question: "The main goal of ICN is to promote professional nursing practice through:",
  options: [
    { text: "Continuing education", correct: false },
    { text: "Human resource planning", correct: false },
    { text: "Advanced nursing practice and entrepreneurship", correct: true },
    { text: "Human resource planning", correct: false }
  ]
},
{
  question: "The primary purpose for registering nurses in Nepal Nursing Council is to protect:",
  options: [
    { text: "The public", correct: true },
    { text: "The employing agency", correct: false },
    { text: "The practicing nurse", correct: false },
    { text: "The health institution", correct: false }
  ]
},
{
  question: "The ethical responsibility of nurses includes:",
  options: [
    { text: "Promoting health, preventing illness, restoring health and alleviating suffering", correct: false },
    { text: "Preventing illness and restoring health", correct: false },
    { text: "Restoring health and alleviating suffering", correct: false },
    { text: "All of the above", correct: true }
  ]
},
{
  question: "Nepal Nursing Council was founded in:",
  options: [
    { text: "1995", correct: false },
    { text: "1994", correct: false },
    { text: "1996", correct: true },
    { text: "1997", correct: false }
  ]
},
{
  question: "The powers and duties of Nepal Nursing Council include:",
  options: [
    { text: "Formulating policy for nursing services", correct: false },
    { text: "Determining qualifications and registration", correct: false },
    { text: "Recognizing nursing institutions", correct: false },
    { text: "All of the above", correct: true }
  ]
},
{
  question: "Providing care without discrimination of caste or social class is an aspect of:",
  options: [
    { text: "Code of ethics", correct: true },
    { text: "Holistic nursing", correct: false },
    { text: "Creative nursing", correct: false },
    { text: "Nursing process", correct: false }
  ]
},
{
  question: "Who nominates the chairperson of Nepal Nursing Council?",
  options: [
    { text: "Government of Nepal", correct: true },
    { text: "Election committee", correct: false },
    { text: "Nepal Nursing Association", correct: false },
    { text: "Elected nurses", correct: false }
  ]
},
{
  question: "Difficulty deciding whether to remove a ventilator from a patient with absent CNS activity is an example of:",
  options: [
    { text: "Ethical issue", correct: false },
    { text: "Ethical dilemma", correct: true },
    { text: "Legal issue", correct: false },
    { text: "Ethical principle", correct: false }
  ]
},
{
  question: "When a client refuses to take medication, this is considered:",
  options: [
    { text: "Stupidity of client", correct: false },
    { text: "Against hospital policy", correct: false },
    { text: "Legal right", correct: false },
    { text: "Client right", correct: true }
  ]
},
{
  question: "The statement 'to promote health, prevent illness, restore health and alleviate suffering' comes from:",
  options: [
    { text: "ICN Code of Ethics", correct: true },
    { text: "Definition of nursing", correct: false },
    { text: "ICM Code of Nursing", correct: false },
    { text: "Professional right of nurses", correct: false }
  ]
},

{
  question: "Intentional tort includes:",
  options: [
    { text: "Malpractice and assault", correct: false },
    { text: "False imprisonment and battery", correct: true },
    { text: "Malpractice and negligence", correct: false },
    { text: "Negligence and invasion of privacy", correct: false }
  ]
},
{
  question: "What is euthanasia?",
  options: [
    { text: "Suicide by a person with chronic disease", correct: false },
    { text: "Killing someone suffering from cancer", correct: false },
    { text: "Killing someone suffering from incurable disease", correct: false },
    { text: "Painlessly killing someone suffering from an incurable disease", correct: true }
  ]
},
{
  question: "ICN Day is celebrated on:",
  options: [
    { text: "12 March", correct: false },
    { text: "12 May", correct: true },
    { text: "12 July", correct: false },
    { text: "12 December", correct: false }
  ]
},
{
  question: "Who was the first president of NAN?",
  options: [
    { text: "Lamoo Amatya", correct: true },
    { text: "Naribadan Pradhan", correct: false },
    { text: "Bishnu Rai", correct: false },
    { text: "Pramila Dewan", correct: false }
  ]
},
{
  question: "The ethics of care suggests ethical dilemmas are best solved by attention to:",
  options: [
    { text: "Relationship", correct: false },
    { text: "Home care nurses", correct: false },
    { text: "Ethical principles", correct: false },
    { text: "Code of ethics for nurses", correct: true }
  ]
},
{
  question: "A patient in the terminal phase admitted to a hospice center receives:",
  options: [
    { text: "Palliative care", correct: true },
    { text: "Preventive measures", correct: false },
    { text: "Curative strategies", correct: false },
    { text: "Health promotion", correct: false }
  ]
},
{
  question: "Which autonomous body protects the public, ensures quality nursing education and licenses nurses?",
  options: [
    { text: "Nursing Association of Nepal", correct: false },
    { text: "Ministry of Health and Population", correct: false },
    { text: "Nepal Nursing Council", correct: true },
    { text: "Ministry of Education", correct: false }
  ]
},
{
  question: "The primary purpose of regulating nursing practice is to protect:",
  options: [
    { text: "The public", correct: true },
    { text: "The employing agency", correct: false },
    { text: "The practicing nurse", correct: false },
    { text: "Professional standards", correct: false }
  ]
},
{
  question: "A code of ethics provides guidelines for:",
  options: [
    { text: "Philosophical ideas", correct: false },
    { text: "Motives", correct: false },
    { text: "Safe and compassionate care", correct: true },
    { text: "Good character", correct: false }
  ]
},
{
  question: "Obtaining consent before a nursing procedure protects:",
  options: [
    { text: "Professional right", correct: false },
    { text: "Nurse's right", correct: false },
    { text: "Client's right", correct: true },
    { text: "Health right", correct: false }
  ]
},
{
  question: "Legal responsibility of a nurse means:",
  options: [
    { text: "Providing care according to needs", correct: false },
    { text: "Carrying out doctor's orders", correct: false },
    { text: "Performing activities within the law", correct: true },
    { text: "Routine care only", correct: false }
  ]
},
{
  question: "The Nursing Association of Nepal was established in:",
  options: [
    { text: "Poush 2018 BS", correct: false },
    { text: "Magh 2018 BS", correct: true },
    { text: "Poush 2016 BS", correct: false },
    { text: "Magh 2016 BS", correct: false }
  ]
},
{
  question: "Nepal Nursing Council was founded in:",
  options: [
    { text: "2043 BS", correct: false },
    { text: "2053 BS", correct: true },
    { text: "2063 BS", correct: false },
    { text: "2065 BS", correct: false }
  ]
},
{
  question: "Authorized body to register nurses in Nepal is:",
  options: [
    { text: "Nursing Association of Nepal", correct: false },
    { text: "Nepal Health Research Council", correct: false },
    { text: "Nepal Nursing Council", correct: true },
    { text: "Ministry of Health", correct: false }
  ]
},
{
  question: "The tenure of Nepal Nursing Council executive committee members is:",
  options: [
    { text: "2 years", correct: false },
    { text: "3 years", correct: false },
    { text: "4 years", correct: true },
    { text: "5 years", correct: false }
  ]
},
{
  question: "NAN became a member of ICN in:",
  options: [
    { text: "1965 AD", correct: false },
    { text: "1969 AD", correct: true },
    { text: "1962 AD", correct: false },
    { text: "1970 AD", correct: false }
  ]
},
{
  question: "Which is NOT included in the ICN Code of Ethics?",
  options: [
    { text: "Nurses and people", correct: false },
    { text: "Doctors and coworkers", correct: true },
    { text: "Nurses and practice", correct: false },
    { text: "Nurses and profession", correct: false }
  ]
},
{
  question: "The legal responsibilities of a nurse mean:",
  options: [
    { text: "Providing care but not according to needs", correct: false },
    { text: "Carrying out doctor's orders only", correct: false },
    { text: "Providing care according to needs", correct: false },
    { text: "Obeying the law in professional activities", correct: true }
  ]
},
{
  question: "Which ethical principle guides fairness to all people?",
  options: [
    { text: "Autonomy", correct: false },
    { text: "Justice", correct: true },
    { text: "Veracity", correct: false },
    { text: "Beneficence", correct: false }
  ]
},
{
  question: "A nurse administers the wrong drug dose. The nurse is responsible to:",
  options: [
    { text: "Client", correct: false },
    { text: "Physician", correct: false },
    { text: "Society", correct: false },
    { text: "All of these", correct: true }
  ]
},
{
  question: "Which ethical principle refers to the duty not to harm?",
  options: [
    { text: "Beneficence", correct: false },
    { text: "Nonmaleficence", correct: true },
    { text: "Fidelity", correct: false },
    { text: "Veracity", correct: false }
  ]
},
{
  question: "Ethics is the study of good conduct, character and motives, therefore it determines:",
  options: [
    { text: "What is good or valuable for people", correct: true },
    { text: "What is code of ethics", correct: false },
    { text: "Guidelines for safety", correct: false },
    { text: "Moral", correct: false }
  ]
},
{
  question: "Which ethical theory focuses on emotions, feelings and attitudes?",
  options: [
    { text: "Teleology", correct: false },
    { text: "Deontology", correct: false },
    { text: "Situational theory", correct: false },
    { text: "Caring-based theory", correct: true }
  ]
},
{
  question: "According to nursing ethics, your first commitment is to the:",
  options: [
    { text: "Hospital", correct: false },
    { text: "Client", correct: true },
    { text: "Family", correct: false },
    { text: "Physician", correct: false }
  ]
},
{
  question: "Which of the following is NOT an intentional tort?",
  options: [
    { text: "Defamation", correct: false },
    { text: "Assault", correct: false },
    { text: "False imprisonment", correct: false },
    { text: "Taking a patient's pain medication", correct: true }
  ]
},

{
  question: "Creativity is:",
  options: [
    { text: "A major component of critical thinking that enables nurses to find unique solutions for unique problems", correct: true },
    { text: "A minor component of critical thinking", correct: false },
    { text: "A major component of nursing process", correct: false },
    { text: "None of the above", correct: false }
  ]
},
{
  question: "According to Graham Wallas (1926), the stages of creative problem solving are:",
  options: [
    { text: "Preparation, incubation, illumination, verification", correct: true },
    { text: "Incubation, preparation, illumination, verification", correct: false },
    { text: "Incubation, illumination, preparation, verification", correct: false },
    { text: "Verification, preparation, incubation, illumination", correct: false }
  ]
},
{
  question: "Unexpected and out-of-the-box thinking is known as:",
  options: [
    { text: "Vertical thinking", correct: false },
    { text: "Creative thinking", correct: true },
    { text: "Unknown thinking", correct: false },
    { text: "Extra sensory perception", correct: false }
  ]
},
{
  question: "In creative thinking, SCAMPER is used for:",
  options: [
    { text: "Fact finding", correct: false },
    { text: "Idea finding", correct: true },
    { text: "Solution finding", correct: false },
    { text: "Acceptance finding", correct: false }
  ]
},
{
  question: "A person who thinks sequentially according to steps or building blocks uses:",
  options: [
    { text: "Vertical thinking", correct: true },
    { text: "Horizontal thinking", correct: false },
    { text: "Lateral thinking", correct: false },
    { text: "Fourth dimensional thinking", correct: false }
  ]
},
{
  question: "One benefit of creativity in nursing is:",
  options: [
    { text: "Stagnation of patient care", correct: false },
    { text: "Patient cooperation and greater satisfaction", correct: true },
    { text: "Disintegration of health services", correct: false },
    { text: "Disharmony with team", correct: false }
  ]
},
{
  question: "Divergent thinking in nursing management is:",
  options: [
    { text: "Creative thinking", correct: true },
    { text: "Critical thinking", correct: false },
    { text: "Concurrent thinking", correct: false },
    { text: "Provisional thinking", correct: false }
  ]
},
{
  question: "One method of creative thinking is:",
  options: [
    { text: "Backbiting", correct: false },
    { text: "Crying", correct: false },
    { text: "Sharing feelings to others", correct: false },
    { text: "Thinking out of the box", correct: true }
  ]
},
{
  question: "What is the meaning of creativity in nursing?",
  options: [
    { text: "Innovative problem solving process", correct: true },
    { text: "Brainstorming", correct: false },
    { text: "Important for high quality care", correct: false },
    { text: "Idea generating", correct: false }
  ]
},
{
  question: "A person thinks sequentially according to steps or building blocks is known as:",
  options: [
    { text: "Vertical thinking", correct: true },
    { text: "Lateral thinking", correct: false },
    { text: "Creative thinking", correct: false },
    { text: "Fourth dimensional thinking", correct: false }
  ]
},
{
  question: "Vatta, Pitta and Kapha are the basic principles of:",
  options: [
    { text: "Naturopathy", correct: false },
    { text: "Ayurveda", correct: true },
    { text: "Homeopathy", correct: false },
    { text: "Unani", correct: false }
  ]
},
{
  question: "\"Whole is greater than the sum of its parts\" is the concept of:",
  options: [
    { text: "Optimum health", correct: false },
    { text: "Spiritual health", correct: false },
    { text: "Holistic health", correct: true },
    { text: "Broader definition of health", correct: false }
  ]
},
{
  question: "Care emphasizing physical, psychological and spiritual aspects falls under:",
  options: [
    { text: "Critical care", correct: false },
    { text: "Oreological care", correct: false },
    { text: "Holistic care", correct: true },
    { text: "Intermediate care", correct: false }
  ]
},
{
  question: "Unani, Homeopathy and Acupuncture are examples of:",
  options: [
    { text: "Herbals", correct: false },
    { text: "Traditional medicine", correct: false },
    { text: "Alternative medicine", correct: true },
    { text: "Conventional medicine", correct: false }
  ]
},
{
  question: "Complementary and alternative medicine includes:",
  options: [
    { text: "Meditation", correct: false },
    { text: "Natural products such as herbs", correct: false },
    { text: "Chiropractic", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: ".............is slight distortion causing temporary physiological changes leading to transient loss of consciousness with complete recovery.",
  options: [
    { text: "Cerebral contusion", correct: false },
    { text: "Cerebral concussion", correct: true },
    { text: "Cerebral laceration", correct: false },
    { text: "Deceleration and acceleration", correct: false }
  ]
},

{
  question: "Which among the following is not true injury regarding Glasgow coma scale (GCS)?",
  options: [
    { text: "It is used in a patient with head injury", correct: false },
    { text: "Total GCS score is 15", correct: false },
    { text: "GCS < 8 is called severe head injury", correct: false },
    { text: "GCS 10-15 is called moderate head injury", correct: true }
  ]
},

{
  question: "Hydrocephalus is dilatation of ventricles which presents with all except..",
  options: [
    { text: "Bulging of anterior fontanelle", correct: false },
    { text: "Sun setting sign", correct: false },
    { text: "Increasing head circumference", correct: false },
    { text: "Cardiomegaly", correct: true }
  ]
},

{
  question: "Which among the following ion helps in nerve impulse transmission in synapse?",
  options: [
    { text: "Sodium", correct: false },
    { text: "Potassium", correct: false },
    { text: "Calcium", correct: true },
    { text: "Iron", correct: false }
  ]
},

{
  question: "During lumbar puncture, the needle is inserted in between",
  options: [
    { text: "Atlas and axis", correct: false },
    { text: "T12 and L1", correct: false },
    { text: "L3 and L4", correct: true },
    { text: "L3 and sacrum", correct: false }
  ]
},

{
  question: "Blood brain barrier is made of..",
  options: [
    { text: "Oligodendrocytes", correct: false },
    { text: "Astrocytes", correct: true },
    { text: "Schwann cells", correct: false },
    { text: "Meninges", correct: false }
  ]
},

{
  question: "Axon usually carries nerve impulse",
  options: [
    { text: "Towards the cell body", correct: false },
    { text: "Towards the dendrite", correct: false },
    { text: "Away from cell body", correct: true },
    { text: "All", correct: false }
  ]
},

{
  question: "Sympathetic nerves in mammals develop from",
  options: [
    { text: "Sacral region", correct: false },
    { text: "Cervical region", correct: false },
    { text: "Thoraco lumbar region", correct: false },
    { text: "III, VII, IX, X", correct: true }
  ]
},

{
  question: "There is no need of ...... in brain",
  options: [
    { text: "Glucose", correct: false },
    { text: "Insulin", correct: true },
    { text: "Oxygen", correct: false },
    { text: "Amino acid", correct: false }
  ]
},

{
  question: "Nervous band that connects two cerebral hemispheres is",
  options: [
    { text: "Corpus albicans", correct: false },
    { text: "Corpus callosum", correct: true },
    { text: "Corpus striatum", correct: false },
    { text: "Corpus spongiosum", correct: false }
  ]
},

{
  question: "Cranial nerves supplying the eye are",
  options: [
    { text: "III, IV, V", correct: false },
    { text: "IV, V, VI", correct: false },
    { text: "IV, VI, VII", correct: false },
    { text: "III, IV, VI", correct: true }
  ]
},

{
  question: "Ventricles of the brain are lined by",
  options: [
    { text: "Neurons", correct: false },
    { text: "Schwann cells", correct: false },
    { text: "Neuroglia", correct: false },
    { text: "Ependymal cells", correct: true }
  ]
},

{
  question: "A resting nerve of brain has",
  options: [
    { text: "Low K+ outside and high Na+ inside", correct: false },
    { text: "High K+ inside and high Na+ outside", correct: true },
    { text: "High K+ outside and high Na+ inside", correct: false },
    { text: "Low K+ inside and high Na+ outside", correct: false }
  ]
},

{
  question: "Depolarisation of nerve cell involves",
  options: [
    { text: "Influx of K+", correct: false },
    { text: "Influx of Na+", correct: true },
    { text: "Influx of Ca++ and Cl-", correct: false },
    { text: "Efflux of Na+", correct: false }
  ]
},

{
  question: "Alcohol mostly affects",
  options: [
    { text: "Medulla", correct: false },
    { text: "Cerebellum", correct: true },
    { text: "Cerebral cortex", correct: false },
    { text: "Thalamus", correct: false }
  ]
},

{
  question: "Superior vena cava is formed at the level of:",
  options: [
    { text: "First costal cartilage", correct: true },
    { text: "First intercostal space", correct: false },
    { text: "Second costal cartilage", correct: false },
    { text: "Second intercostal space", correct: false }
  ]
},

{
  question: "Blood vessel supplying blood vessel is:",
  options: [
    { text: "Coronary vessel", correct: false },
    { text: "Vasa nervosum", correct: false },
    { text: "Vasa vasorum", correct: true },
    { text: "Capillaries", correct: false }
  ]
},

{
  question: "Pre-load in the heart is determined by:",
  options: [
    { text: "End diastolic volume", correct: false },
    { text: "Venous return", correct: false },
    { text: "Initial length of cardiac muscle", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: "Systolic pressure in young females is less than males due to:",
  options: [
    { text: "Dietary habits", correct: false },
    { text: "Estrogen which prevents atherosclerosis", correct: true },
    { text: "Progesterone effect on blood vessels", correct: false },
    { text: "Oxytocin effects on the blood vessels", correct: false }
  ]
},

{
  question: "Shock always involves:",
  options: [
    { text: "External hemorrhage", correct: false },
    { text: "Internal hemorrhage", correct: false },
    { text: "Central nervous system", correct: false },
    { text: "Decreased tissue perfusion", correct: true }
  ]
},

{
  question: "Which component of the cardiac tissue has the highest propagation velocity?",
  options: [
    { text: "Purkinje's fibers", correct: true },
    { text: "A-V node", correct: false },
    { text: "Atrial muscle", correct: false },
    { text: "Ventricular muscle", correct: false }
  ]
},

{
  question: "Frank Starling's law states that:",
  options: [
    { text: "Force of contraction is directly proportional to initial length of the muscle fiber within physiological limits.", correct: true },
    { text: "Higher the stretch, less is the velocity of contraction", correct: false },
    { text: "Without any limitation, stretch produces better & more vigorous contraction", correct: false },
    { text: "Length of the muscles fiber remains always the same", correct: false }
  ]
},

{
  question: "Trained athletes have:",
  options: [
    { text: "Larger stroke volume and lower HR", correct: true },
    { text: "Smaller stroke volume and higher HR", correct: false },
    { text: "Small heart size", correct: false },
    { text: "Higher heart rate (HR)", correct: false }
  ]
},

{
  question: "A patient with the bicuspid valve disorder will have impaired blood flow between",
  options: [
    { text: "Vena cava and right atrium", correct: false },
    { text: "Right atrium and right ventricle", correct: false },
    { text: "Right ventricle and pulmonary artery", correct: false },
    { text: "Left atrium and left ventricle", correct: true }
  ]
},

{
  question: "An important nursing responsibility for a patient after an invasive cardiovascular diagnostic study is:",
  options: [
    { text: "Discourage fluid intake and place the patient in prone position", correct: false },
    { text: "Apply heat to the puncture site and passively exercise the involved extremity", correct: false },
    { text: "Limit motion of the affected extremity and assess the puncture site", correct: true },
    { text: "Restrict fluid intake and encourage ambulation", correct: false }
  ]
},

{
  question: "Which of the following function by the kidney helps maintain blood pressure at normal level?",
  options: [
    { text: "Kidney's ability to retain sodium and excrete potassium", correct: false },
    { text: "Kidney's ability to retain sodium and excrete excess water", correct: false },
    { text: "Kidney's ability to excrete sodium and water", correct: true },
    { text: "Kidney's ability to excrete sodium and retain water", correct: false }
  ]
},

{
  question: "Which of the following has a single layer of endothelial structure?",
  options: [
    { text: "Arteries", correct: false },
    { text: "Capillaries", correct: true },
    { text: "Veins", correct: false },
    { text: "Lymphatic vessels", correct: false }
  ]
},

{
  question: "Minerals needed for the contraction of heart are:",
  options: [
    { text: "Na+, K+, Ca++", correct: true },
    { text: "Na+, K+, Mg", correct: false },
    { text: "Na+ and K+", correct: false },
    { text: "K+, Ca+, Mg", correct: false }
  ]
},

{
  question: "Stethoscope works on the principle of sound.",
  options: [
    { text: "Reflection", correct: true },
    { text: "Refraction", correct: false },
    { text: "Diffraction", correct: false },
    { text: "Interference", correct: false }
  ]
},

{
  question: "'Lub' sound is produced due to:",
  options: [
    { text: "Closure of bicuspid and tricuspid valves", correct: true },
    { text: "Closure of semilunar valves", correct: false },
    { text: "Closure of ventricular valves", correct: false },
    { text: "None of the above", correct: false }
  ]
},

{
  question: "Heparin, an anticoagulant is produced by:",
  options: [
    { text: "RBCs", correct: false },
    { text: "Liver", correct: true },
    { text: "Kidney", correct: false },
    { text: "Pancreas", correct: false }
  ]
},

{
  question: "Fick's principle measures:",
  options: [
    { text: "Preload", correct: false },
    { text: "Cardiac output", correct: true },
    { text: "Afterload", correct: false },
    { text: "End diastolic volume", correct: false }
  ]
},

{
  question: "A person with antigens 'A' and 'B' but no antibodies belongs to the group:",
  options: [
    { text: "A", correct: false },
    { text: "B", correct: false },
    { text: "AB", correct: true },
    { text: "O", correct: false }
  ]
},

{
  question: "Blood pressure is measured from:",
  options: [
    { text: "Radial artery", correct: false },
    { text: "Brachial artery", correct: true },
    { text: "Femoral artery", correct: false },
    { text: "All of the above", correct: false }
  ]
},

{
  question: "Tunica adventitia is a part of:",
  options: [
    { text: "Testes", correct: false },
    { text: "Scrotum", correct: false },
    { text: "Blood vessels", correct: true },
    { text: "Kidney", correct: false }
  ]
},

{
  question: "1st ossified bone is:",
  options: [
    { text: "Scapula", correct: false },
    { text: "Cervical vertebra", correct: false },
    { text: "Clavicle", correct: true },
    { text: "Humerus", correct: false }
  ]
},

{
  question: "Muscular fatigue is due to:",
  options: [
    { text: "Malic acid", correct: false },
    { text: "Acetic acid", correct: false },
    { text: "Lactic acid", correct: true },
    { text: "Maleic acid", correct: false }
  ]
},

{
  question: "Smallest bone in man is found in:",
  options: [
    { text: "Stapes", correct: true },
    { text: "Malleus", correct: false },
    { text: "Incus", correct: false },
    { text: "None of the above", correct: false }
  ]
},

{
  question: "Lunate bone forms part of:",
  options: [
    { text: "Shoulder joint", correct: false },
    { text: "Ankle joint", correct: false },
    { text: "Wrist joint", correct: true },
    { text: "Knee joint", correct: false }
  ]
},

{
  question: "Process of formation of bone is called:",
  options: [
    { text: "Calcification", correct: false },
    { text: "Ossification", correct: true },
    { text: "Chondrification", correct: false },
    { text: "Bonnification", correct: false }
  ]
},

{
  question: "Fracture is defined as:",
  options: [
    { text: "Loss of continuity of bone tissue", correct: true },
    { text: "Destruction of bony tissue", correct: false },
    { text: "Inflammation of bone", correct: false },
    { text: "Restriction of bony movement", correct: false }
  ]
},

{
  question: "For longitudinal growth in children, the part of the long bone that is responsible is:",
  options: [
    { text: "Diaphysis", correct: false },
    { text: "Apophysis", correct: false },
    { text: "Metaphysis", correct: true },
    { text: "Epiphysis", correct: false }
  ]
},

{
  question: "Which of the following are the properties of skeletal muscles?",
  options: [
    { text: "Excitability", correct: false },
    { text: "Contractibility", correct: false },
    { text: "Rhythmicity", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: "Striated muscles are found in:",
  options: [
    { text: "Kidney", correct: false },
    { text: "Lungs", correct: false },
    { text: "Legs", correct: true },
    { text: "Uterus", correct: false }
  ]
},

{
  question: "Which of the following hormone is secreted by posterior pituitary?",
  options: [
    { text: "Oestrogen", correct: false },
    { text: "Prolactin", correct: false },
    { text: "Oxytocin", correct: true },
    { text: "Growth hormone", correct: false }
  ]
},

{
  question: "Simple enlargement of which gland is goiter?",
  options: [
    { text: "Pituitary", correct: false },
    { text: "Thyroid", correct: true },
    { text: "Parathyroid", correct: false },
    { text: "Adrenal", correct: false }
  ]
},

{
  question: "Height of a person depends upon secretion of growth hormone. This is secreted by:",
  options: [
    { text: "Adrenal gland", correct: false },
    { text: "Thyroid gland", correct: false },
    { text: "Pituitary", correct: true },
    { text: "Thymus", correct: false }
  ]
},

{
  question: "Largest gland in body is:",
  options: [
    { text: "Pancreas", correct: false },
    { text: "Liver", correct: true },
    { text: "Adrenal", correct: false },
    { text: "Salivary", correct: false }
  ]
},

{
  question: "Angiotensin converting enzyme is produced by:",
  options: [
    { text: "Liver", correct: false },
    { text: "Lung", correct: true },
    { text: "Kidney", correct: false },
    { text: "None", correct: false }
  ]
},

{
  question: "The 'Relay centre' of the brain is:",
  options: [
    { text: "Corpus callosum", correct: false },
    { text: "Thalamus", correct: true },
    { text: "Hypothalamus", correct: false },
    { text: "Basal nuclei", correct: false }
  ]
},

{
  question: "Which one of the following refers to the salivary gland?",
  options: [
    { text: "Thyroid", correct: false },
    { text: "Parotid gland", correct: true },
    { text: "Pineal gland", correct: false },
    { text: "Bowman's capsule", correct: false }
  ]
},

{
  question: "Which of the following part of the small intestine connects the jejunum to the stomach?",
  options: [
    { text: "Duodenum", correct: true },
    { text: "Jejunum", correct: false },
    { text: "Ascending colon", correct: false },
    { text: "Ileum", correct: false }
  ]
},

{
  question: "The total number of temporary teeth are:",
  options: [
    { text: "18", correct: false },
    { text: "20", correct: true },
    { text: "12", correct: false },
    { text: "24", correct: false }
  ]
},

{
  question: "Intrinsic factor is related to:",
  options: [
    { text: "Vitamin B12", correct: true },
    { text: "Peritoneum", correct: false },
    { text: "Vitamin B6", correct: false },
    { text: "None", correct: false }
  ]
},

{
  question: "Which organ became affected in typhoid fever?",
  options: [
    { text: "Cervical cavity", correct: false },
    { text: "Colon", correct: false },
    { text: "Small intestine", correct: true },
    { text: "Stomach", correct: false }
  ]
},

{
  question: "Which juice is important for complete digestion of fat?",
  options: [
    { text: "Pepsinogen", correct: false },
    { text: "Intestinal juice", correct: false },
    { text: "Bile juice", correct: true },
    { text: "Amylase", correct: false }
  ]
},

{
  question: "\"Peyer's patch\" lies in:",
  options: [
    { text: "Caecum", correct: false },
    { text: "Ileum", correct: true },
    { text: "Duodenum", correct: false },
    { text: "Jejunum", correct: false }
  ]
},

{
  question: "Which doesn't belong to function of digestive system?",
  options: [
    { text: "Ingestion", correct: false },
    { text: "Maintenance of pH", correct: true },
    { text: "Digestion", correct: false },
    { text: "Excretion", correct: false }
  ]
},

{
  question: "Which enzyme is present in saliva?",
  options: [
    { text: "Lipase", correct: false },
    { text: "Amylase", correct: true },
    { text: "Pepsin", correct: false },
    { text: "Peptidase", correct: false }
  ]
},

{
  question: "Brunner's glands are the peculiarity of:",
  options: [
    { text: "Stomach", correct: false },
    { text: "Duodenum", correct: true },
    { text: "Ileum", correct: false },
    { text: "Jejunum", correct: false }
  ]
},

{
  question: "The Islets of Langerhans are located in:",
  options: [
    { text: "Liver", correct: false },
    { text: "Pancreas", correct: true },
    { text: "Spleen", correct: false },
    { text: "Kidney", correct: false }
  ]
},

{
  question: "The reservoir of stool occurs in:",
  options: [
    { text: "Descending colon", correct: false },
    { text: "Sigmoid colon", correct: false },
    { text: "Rectum", correct: true },
    { text: "Anal canal", correct: false }
  ]
},

{
  question: "Digestion of carbohydrate starts from the:",
  options: [
    { text: "Mouth", correct: true },
    { text: "Stomach", correct: false },
    { text: "Duodenum", correct: false },
    { text: "Ileum", correct: false }
  ]
},

{
  question: "Which vitamin is synthesized in bowel?",
  options: [
    { text: "Vitamin A", correct: false },
    { text: "Vitamin C", correct: false },
    { text: "Vitamin E", correct: false },
    { text: "Vitamin K", correct: true }
  ]
},

{
  question: "The wave that transmits in the intestine is called:",
  options: [
    { text: "Peristalsis", correct: true },
    { text: "Locomotion", correct: false },
    { text: "Pericontraction", correct: false },
    { text: "Pro-movement", correct: false }
  ]
},

{
  question: "Chief cells in stomach secrete:",
  options: [
    { text: "HCl", correct: false },
    { text: "Pepsinogen", correct: true },
    { text: "Mucus", correct: false },
    { text: "Trypsin", correct: false }
  ]
},

{
  question: "Production of glucose from pyruvate in liver is called:",
  options: [
    { text: "Glycolysis", correct: false },
    { text: "Glycogenolysis", correct: false },
    { text: "Gluconeogenesis", correct: true },
    { text: "Glycogenesis", correct: false }
  ]
},

{
  question: "Na absorption of intestine is mainly by the process of:",
  options: [
    { text: "Active transport", correct: true },
    { text: "Diffusion", correct: false },
    { text: "Passive transport", correct: false },
    { text: "Facilitated diffusion", correct: false }
  ]
},

{
  question: "Water is mainly absorbed from:",
  options: [
    { text: "Stomach", correct: false },
    { text: "Small intestine", correct: false },
    { text: "Large intestine", correct: true },
    { text: "None", correct: false }
  ]
},

{
  question: "The inner most layer of kidney is:",
  options: [
    { text: "Medulla", correct: true },
    { text: "Cortex", correct: false },
    { text: "Fibrous capsule", correct: false },
    { text: "Pyramid", correct: false }
  ]
},

{
  question: "The length of ureter is about:",
  options: [
    { text: "25 cm", correct: true },
    { text: "50 cm", correct: false },
    { text: "10-15 cm", correct: false },
    { text: "75 cm", correct: false }
  ]
},

{
  question: "Islet of Langerhans is found in:",
  options: [
    { text: "Stomach", correct: false },
    { text: "Pancreas", correct: true },
    { text: "Liver", correct: false },
    { text: "Kidney", correct: false }
  ]
},

{
  question: "Pancreas is:",
  options: [
    { text: "Endocrine gland", correct: false },
    { text: "Exocrine gland", correct: false },
    { text: "Mixed gland", correct: true },
    { text: "Secretes bile", correct: false }
  ]
},

{
  question: "Which takes place in hyperthyroidism?",
  options: [
    { text: "Lowering of body temperature", correct: false },
    { text: "Increased BMR", correct: true },
    { text: "Excessive fat deposition", correct: false },
    { text: "Decreased respiratory rate", correct: false }
  ]
},

{
  question: "In defense mechanism acid-base balance is regulated by except:",
  options: [
    { text: "Urinary system", correct: false },
    { text: "Buffer system", correct: false },
    { text: "Sensory system", correct: true },
    { text: "Respiratory system", correct: false }
  ]
},

{
  question: "Transitional epithelium is found in:",
  options: [
    { text: "Gall bladder", correct: false },
    { text: "Liver", correct: false },
    { text: "Urinary bladder", correct: true },
    { text: "Kidney", correct: false }
  ]
},

{
  question: "Glucose is reabsorbed from glomerular filtrate by:",
  options: [
    { text: "Active transport", correct: true },
    { text: "Passive transport", correct: false },
    { text: "Osmosis", correct: false },
    { text: "Diffusion", correct: false }
  ]
},

{
  question: "Renin is derived from:",
  options: [
    { text: "Aldosterone", correct: false },
    { text: "Angiotensin I", correct: false },
    { text: "Angiotensin II", correct: false },
    { text: "Juxtaglomerular cells", correct: true }
  ]
},

{
  question: "The proximal convoluted tubules (PCT):",
  options: [
    { text: "Reabsorb most of the water and salts of the glomerular filtration", correct: true },
    { text: "Reabsorb half the glucose in glomerular filtrate", correct: false },
    { text: "Contain juxtaglomerular cells which secrete renin", correct: false },
    { text: "Are the main target cells for the anti-diuretic hormone", correct: false }
  ]
},

{
  question: "Increased intraocular pressure results into:",
  options: [
    { text: "Glaucoma", correct: true },
    { text: "Cataract", correct: false },
    { text: "Conjunctivitis", correct: false },
    { text: "Keratitis", correct: false }
  ]
},

{
  question: "The avascular part of eye is:",
  options: [
    { text: "Choroid", correct: false },
    { text: "Retina", correct: false },
    { text: "Cornea", correct: true },
    { text: "Iris", correct: false }
  ]
},

{
  question: "Ventilation perfusion ratio is maximum at:",
  options: [
    { text: "Apical region of the lung", correct: true },
    { text: "Middle region of the lung", correct: false },
    { text: "Basal portion of the lung", correct: false },
    { text: "Equal in all parts of the lung", correct: false }
  ]
},

{
  question: "Surfactant is secreted by:",
  options: [
    { text: "Alveolar cells", correct: false },
    { text: "Type II Pneumocytes", correct: true },
    { text: "Mucous cells", correct: false },
    { text: "Goblet cells", correct: false }
  ]
},

{
  question: "Expiration is longer than inspiration mainly because:",
  options: [
    { text: "Expiration is passive process", correct: false },
    { text: "Airway resistance is high during expiration", correct: false },
    { text: "Diameter of the airways decreases during expiration", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: "Air taken in and out in quiet breathing is called:",
  options: [
    { text: "Tidal volume", correct: true },
    { text: "Vital capacity", correct: false },
    { text: "Timed vital capacity", correct: false },
    { text: "Residual volume", correct: false }
  ]
},

{
  question: "Vital capacity is:",
  options: [
    { text: "Air taken in during quiet respiration", correct: false },
    { text: "Maximum amount of air you can breathe out", correct: false },
    { text: "Maximum amount of air you can breathe in", correct: false },
    { text: "Maximum amount of air you can breathe out after maximal inspiration", correct: true }
  ]
},

{
  question: "Which hormone is activated in the lung?",
  options: [
    { text: "Renin", correct: false },
    { text: "ADH", correct: false },
    { text: "Angiotensin I", correct: true },
    { text: "Aldosterone", correct: false }
  ]
},

{
  question: "The principal inspiratory muscles of the thoracic cage is:",
  options: [
    { text: "External intercostals and diaphragm", correct: true },
    { text: "Internal intercostals", correct: false },
    { text: "Sternocleidomastoid and scalene muscle", correct: false },
    { text: "Pectoralis major", correct: false }
  ]
},

{
  question: "Damage to which nerve causes temporary huskiness of voice?",
  options: [
    { text: "External laryngeal nerve", correct: false },
    { text: "Internal laryngeal nerve", correct: false },
    { text: "Recurrent laryngeal nerve", correct: true },
    { text: "Posterior laryngeal nerve", correct: false }
  ]
},

{
  question: "Receptors that sense water deficiency in the body are:",
  options: [
    { text: "Baroreceptor", correct: false },
    { text: "Chemoreceptor", correct: false },
    { text: "Osmoreceptor", correct: true },
    { text: "Stretch receptor", correct: false }
  ]
},

{
  question: "All are causes of hyperkalemia except:",
  options: [
    { text: "Insulin therapy", correct: true },
    { text: "Beta-blocker intoxication", correct: false },
    { text: "Digitalis intoxication", correct: false },
    { text: "Massive blood transfusion", correct: false }
  ]
},

{
  question: "Clinical features of hypocalcaemia are:",
  options: [
    { text: "Tetany", correct: false },
    { text: "Convulsions, Laryngospasm", correct: false },
    { text: "Trousseau's sign", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: "What is the role of progesterone during pregnancy?",
  options: [
    { text: "Relaxation of uterus", correct: false },
    { text: "Development of decidua", correct: false },
    { text: "Preparation of breast for lactation", correct: false },
    { text: "All of the above", correct: true }
  ]
},

{
  question: "Implantation occurs following fertilization on:",
  options: [
    { text: "5th day", correct: false },
    { text: "6th day", correct: true },
    { text: "9th day", correct: false },
    { text: "8th day", correct: false }
  ]
},

{
  question: "Penis is supplied by:",
  options: [
    { text: "Pudendal artery", correct: true },
    { text: "Femoral artery", correct: false },
    { text: "Renal artery", correct: false },
    { text: "Popliteal artery", correct: false }
  ]
},

{
  question: "Which among the following is not needed for the formation of blood cells?",
  options: [
    { text: "Folic acid and Vitamin B12", correct: false },
    { text: "Iron", correct: false },
    { text: "Erythropoietin", correct: false },
    { text: "Calcium", correct: true }
  ]
},

{
  question: "Blood is a fluid of:",
  options: [
    { text: "Epithelial tissue", correct: false },
    { text: "Connective tissue", correct: true },
    { text: "Muscular tissue", correct: false },
    { text: "Nervous tissue", correct: false }
  ]
},

{
  question: "pH value of blood ranges from:",
  options: [
    { text: "6.35 to 7.45", correct: false },
    { text: "7.35 to 7.45", correct: true },
    { text: "7.35 to 8.45", correct: false },
    { text: "6.35 to 8.45", correct: false }
  ]
},

{
  question: "Thermal insulation is provided by ... tissue:",
  options: [
    { text: "Fibrous", correct: false },
    { text: "Alveolar", correct: false },
    { text: "Adipose", correct: true },
    { text: "Elastic", correct: false }
  ]
},

{
  question: "A P wave on an ECG represents an impulse:",
  options: [
    { text: "Originating at the SA node and depolarizing the atria", correct: true },
    { text: "Originating at the SA node and repolarizing the atria", correct: false },
    { text: "Originating at the AV node and depolarizing the atria", correct: false },
    { text: "Originating at the AV node and spreading to the bundle of His", correct: false }
  ]
},
{
  question: "Holistic approach of care is:",
  options: [
    { text: "Total care", correct: true },
    { text: "Functional care", correct: false },
    { text: "Need based care", correct: false },
    { text: "Both b and c", correct: false }
  ]
},
{
  question: "Holistic health care is:",
  options: [
    { text: "Nursing care process", correct: false },
    { text: "Planning nursing", correct: false },
    { text: "Art of nursing care", correct: false },
    { text: "Comprehensive nursing care to patient", correct: true }
  ]
},
{
  question: "The correct sequence of physical examination is:",
  options: [
    { text: "Inspection, Palpation, Percussion, Auscultation", correct: true },
    { text: "Palpation, Percussion, Auscultation, Inspection", correct: false },
    { text: "Percussion, Auscultation, Inspection, Palpation", correct: false },
    { text: "Percussion, Auscultation, Inspection, Palpation", correct: false }
  ]
},
{
  question: "Interpretation of collected patient data represents:",
  options: [
    { text: "Assessment of the patient", correct: false },
    { text: "Health problem of the patient", correct: true },
    { text: "Proposed plan of care", correct: false },
    { text: "Nursing care done", correct: false }
  ]
},
{
  question: "Assessment includes:",
  options: [
    { text: "Data collection", correct: false },
    { text: "Data organization", correct: false },
    { text: "Data validation", correct: false },
    { text: "All of the above", correct: true }
  ]
},
{
  question: "The determining factor in revising a nursing care plan is:",
  options: [
    { text: "Validity of diagnosis", correct: false },
    { text: "Time available for care", correct: false },
    { text: "Method for providing care", correct: false },
    { text: "Effectiveness of intervention", correct: true }
  ]
},
{
  question: "A nurse taking vital signs from a patient with abdominal pain is in which phase of the nursing process?",
  options: [
    { text: "Assessment", correct: true },
    { text: "Diagnosis", correct: false },
    { text: "Planning", correct: false },
    { text: "Implementation", correct: false }
  ]
},
{
  question: "A systematic and rational method of planning and providing nursing care is:",
  options: [
    { text: "Assessment", correct: false },
    { text: "Nursing Process", correct: true },
    { text: "Diagnosis", correct: false },
    { text: "Implementation", correct: false }
  ]
},
{
  question: "Identifying a patient's response to actual or potential health problems occurs during:",
  options: [
    { text: "Assessing", correct: false },
    { text: "Planning", correct: false },
    { text: "Diagnosing", correct: true },
    { text: "Evaluating", correct: false }
  ]
},
{
  question: "The first step in planning is:",
  options: [
    { text: "Set goals", correct: false },
    { text: "Prioritize needs/problems", correct: true },
    { text: "Prepare implementation plan", correct: false },
    { text: "Distribute activities", correct: false }
  ]
}

];




let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionsSpan.textContent = questionsBank.length;
maxScoreSpan.textContent = questionsBank.length;

//EventLIisteners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [
      array[randomIndex],
      array[i]
    ];
  }
}

function createQuestionSets() {
  const sets = [];

  for (
    let i = 0;
    i < questionsBank.length;
    i += QUESTIONS_PER_SET
  ) {
    sets.push(
      questionsBank.slice(
        i,
        i + QUESTIONS_PER_SET
      )
    );
  }

  return sets;
}

function getRandomSet() {
  const sets = createQuestionSets();

  // Reset after all sets played
  if (playedSets.length === sets.length) {
    playedSets = [];
  }

  let randomIndex;

  do {
    randomIndex =
      Math.floor(
        Math.random() * sets.length
      );
  } while (
    playedSets.includes(randomIndex)
  );

  playedSets.push(randomIndex);

  currentSetIndex = randomIndex;

  currentSetQuestions = [
    ...sets[randomIndex]
  ];

  shuffleArray(currentSetQuestions);
}


  function startQuiz() {

  getRandomSet();

  currentQuestionIndex = 0;
  score = 0;
  answersDisabled = false;

  scoreSpan.textContent = score;

  totalQuestionsSpan.textContent =
    currentSetQuestions.length;

  maxScoreSpan.textContent =
    currentSetQuestions.length;

  progressBar.style.width = "0%";

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}

//  Declare showQuestions function called in startQuiz function

  function showQuestions() {
    //reset state
    answersDisabled = false;
    const currentQuestion =
    currentSetQuestions[currentQuestionIndex];
    shuffleArray(currentQuestion.options);

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex + 1) / currentSetQuestions.length) * 100;

    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.options.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });

  }
  function selectAnswer(event) {

  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect =
    selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children)
    .forEach((button) => {

      if (
        button.dataset.correct === "true"
      ) {
        button.classList.add("correct");
      }

    });

  if (!isCorrect) {
    selectedButton.classList.add("incorrect");
  }

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {

    currentQuestionIndex++;

    if (
      currentQuestionIndex <
      currentSetQuestions.length
    ) {
      showQuestions();
    } else {
      showResults();
    }

  }, 1000);
}



function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / currentSetQuestions.length) * 100;

    if (percentage === 100) {

    resultMessage.textContent =
      "🏆 Perfect Score! Amazing work!";
  } else if (percentage >= 80) {
    resultMessage.textContent =
      "🌟 Excellent! You really know your stuff.";
  } else if (percentage >= 60) {
    resultMessage.textContent =
      "👍 Good job! Keep practicing.";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "📚 Nice effort. Review and try again.";
  } else {
    resultMessage.textContent =
      "💪 Keep learning. You'll improve with practice.";
  }
}

const nextSetButton = document.getElementById("next-set-btn");


function nextSet() {
  resultScreen.classList.remove("active");
  startQuiz();
}



nextSetButton.addEventListener("click", nextSet);

function restartQuiz() {
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");
  startQuiz();
}