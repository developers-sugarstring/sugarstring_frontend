// data.ts

import { DiseasePayload } from "@/app/(dashboard)/customers/customer-disease/[id]/edit/page";

// export const dummyDiseaseData: DiseasePayload = {
//   header: [
//     {
//       diseaseName: "Brugada Syndrome",
//       speciality: "Cardiology",
//       geneName: "SC123",
//       category: "Hereditary Cancers",
//       diseaseDesc: {
//         intro: "Brugada Syndrome is a genetic disorder that affects the heart’s electrical system, leading to irregular heart rhythms (arrhythmias) and an increased risk of sudden cardiac death.",
//         symptoms: {
//           desc: "Brugada syndrome often does not cause noticeable symptoms, and many people may be unaware they have it. When symptoms occur, they may include:",
//           points: [
//             "Fainting or blackouts (syncope)",
//             "Dizziness or lightheadedness",
//             "Heart palpitations (feeling of rapid, fluttering, or pounding heartbeat)",
//             "Extremely fast and chaotic heartbeat (ventricular arrhythmias)",
//             "Seizures",
//             "Gasping or labored breathing, especially at night",
//             "Unexplained nighttime urination",
//             "Sudden cardiac arrest or sudden death, often occurring during sleep or rest",
//           ],
//         },
//         recommendations: {
//           desc: "Precautions are recommended for carriers of a Brugada-associated gene mutation:",
//           points: [
//             "Consult a cardiologist experienced in inherited arrhythmias.",
//             "Avoid medications that may trigger arrhythmias.",
//             "Manage fever aggressively.",
//             "Avoid recreational drugs and excessive alcohol.",
//             "Avoid strenuous exercise as advised by your cardiologist.",
//             "Stay well-hydrated.",
//             "Genetic testing is recommended for first-degree relatives.",
//           ],
//         },
//       },
//     },
//     {
//       diseaseName: "Brugada Syndrome",
//       speciality: "Cardiology",
//       geneName: "",
//       category: "Heart Diseases",
//       diseaseDesc: {
//         intro: "Brugada Syndrome is a genetic disorder that affects the heart’s electrical system, leading to irregular heart rhythms (arrhythmias) and an increased risk of sudden cardiac death.",
//         symptoms: {
//           desc: "Brugada syndrome often does not cause noticeable symptoms, and many people may be unaware they have it. When symptoms occur, they may include:",
//           points: [
//             "Fainting or blackouts (syncope)",
//             "Dizziness or lightheadedness",
//             "Heart palpitations (feeling of rapid, fluttering, or pounding heartbeat)",
//             "Extremely fast and chaotic heartbeat (ventricular arrhythmias)",
//             "Seizures",
//             "Gasping or labored breathing, especially at night",
//             "Unexplained nighttime urination",
//             "Sudden cardiac arrest or sudden death, often occurring during sleep or rest",
//           ],
//         },
//         recommendations: {
//           desc: "Precautions are recommended for carriers of a Brugada-associated gene mutation:",
//           points: [
//             "Consult a cardiologist experienced in inherited arrhythmias.",
//             "Avoid medications that may trigger arrhythmias.",
//             "Manage fever aggressively.",
//             "Avoid recreational drugs and excessive alcohol.",
//             "Avoid strenuous exercise as advised by your cardiologist.",
//             "Stay well-hydrated.",
//             "Genetic testing is recommended for first-degree relatives.",
//           ],
//         },
//       },
//     },
//     {
//       diseaseName: "Familial Isolated Dilated Cardiomyopathy",
//       speciality: "Cardiology",
//       geneName: "TTN",
//       category: "Heart Diseases",
//       diseaseDesc: {
//         intro: "A genetic condition where the heart’s main pumping chamber becomes enlarged and weakened, making it harder to pump blood efficiently. This can lead to progressive heart failure, arrhythmias, and increased risk of sudden cardiac arrest.",
//         symptoms: {
//           desc: "Symptoms may vary widely and may be absent, including among family members with the same mutation.",
//           points: [
//             "Shortness of breath, especially during exertion or when lying down",
//             "Fatigue and extreme tiredness",
//             "Swelling in the legs, ankles, feet, or abdomen due to fluid retention",
//             "Irregular heartbeat (arrhythmias)",
//             "Chest pain or discomfort",
//             "Fainting episodes or dizziness",
//             "Reduced ability to exercise",
//             "Unintentional weight gain (due to fluid buildup)",
//           ],
//         },
//         recommendations: {
//           desc: "Management and lifestyle changes for cardiomyopathy:",
//           points: ["Regular follow-up with a cardiologist.", "Avoid high-salt diet to reduce fluid retention.", "Take prescribed medications for arrhythmias or heart failure.", "Consider lifestyle modifications such as limiting alcohol and avoiding smoking."],
//         },
//       },
//     },
//     {
//       diseaseName: "Neurodegeneration with Brain Iron Accumulation",
//       speciality: "Neurology",
//       geneName: "PANK2",
//       category: "Unaffected Carrier",
//       diseaseDesc: {
//         intro: "Neurodegeneration with Brain Iron Accumulation (NBIA) is a rare inherited disorder caused by mutations in the PANK2 gene, leading to abnormal accumulation of iron in certain areas of the brain.",
//         symptoms: {
//           desc: "Symptoms vary but may include movement disorders and cognitive decline. Carriers are typically unaffected but should be aware of potential genetic risks.",
//           points: ["Difficulty with movement coordination", "Involuntary muscle contractions (dystonia)", "Progressive difficulty walking", "Tremors", "Speech and swallowing difficulties", "Cognitive or behavioral changes"],
//         },
//         recommendations: {
//           desc: "For carriers of PANK2 variants, genetic counselling and family testing are recommended:",
//           points: ["Consult a neurologist familiar with NBIA.", "Consider genetic counselling for family planning.", "Screen family members who may also be carriers.", "Maintain awareness of early neurological symptoms.", "No specific medical treatment required for unaffected carriers."],
//         },
//       },
//     },
//   ],

//   drugResponse: {
//     drugsToAvoid: [
//       {
//         drugName: "Antidepressants",
//         medicalSpeciality: "Psychiatry",
//         geneName: "CYP2C19",
//         diplotype: "*2/*38",
//         phenotype: "Intermediate Metabolizer",
//         function: "Antidepressants are used to treat depression, a mood disorder that causes sadness, hopelessness, and loss of interest in activities.",
//         medicalCondition: "Sadness, hopelessness, loss of interest in activities that were once enjoyable.",
//         similarDrug: "SSRIs (Fluoxetine, Sertraline, Citalopram)",
//         alternativeDrug: "Depends on individual needs; consult physician.",
//         speciality: [{ name: "Psychiatry" }],
//       },
//       {
//         drugName: "Clopidogrel",
//         medicalSpeciality: "Cardiology",
//         geneName: "CYP2C19",
//         diplotype: "*2/*38",
//         phenotype: "Intermediate Metabolizer",
//         function: "Antiplatelet used to prevent blood clots.",
//         medicalCondition: "Acute coronary syndrome, Stroke, Peripheral artery disease.",
//         similarDrug: "Aspirin, Ticlopidine, Cilostazol",
//         alternativeDrug: "Prasugrel, Ticagrelor",
//         speciality: [{ name: "Cardiology" }],
//       },
//     ],
//     drugsWithCaution: [],
//   },

//   geneticMutation: [
//     {
//       gene: {
//         geneName: "SCN10A",
//         desc: {
//           intro: "The SCN10A gene provides instructions for sodium channels that transport sodium ions into cells, playing a role in transmitting electrical signals.",
//           mid: "",
//           end: "The variant reported is linked to higher risk of Brugada Syndrome and arrhythmias.",
//         },
//       },
//       mutation: "3–38793634–G>T, ENST00000449082.3, c.2161C>A, p.Pro721Thr, rs74714420",
//       type: "Missense",
//       zygosity: "Heterozygote",
//       diseaseName: "Brugada Syndrome",
//       inheritance: "Autosomal Dominant",
//       classification: "Likely Pathogenic",
//     },
//     {
//       gene: {
//         geneName: "TTN",
//         desc: {
//           intro: "The TTN gene provides instructions for producing titin, a protein critical for heart muscle elasticity and function.",
//           mid: "Mutations can lead to structural weakness in the heart muscle, resulting in dilated cardiomyopathy.",
//           end: "This increases the risk of heart failure and arrhythmias.",
//         },
//       },
//       mutation: "2–178776544–T>C, ENST00000589042.5, c.5320A>G, p.Ile1774Val, rs78207512",
//       type: "Missense",
//       zygosity: "Heterozygous",
//       diseaseName: "Familial Isolated Dilated Cardiomyopathy",
//       inheritance: "Autosomal Dominant",
//       classification: "Likely Pathogenic",
//     },
//     {
//       gene: {
//         geneName: "PANK2",
//         desc: {
//           intro: "The PANK2 gene provides instructions for an enzyme involved in coenzyme A biosynthesis, which is essential for energy metabolism in cells.",
//           mid: "Mutations in PANK2 disrupt this pathway, leading to toxic buildup of iron in the brain.",
//           end: "This results in a rare neurodegenerative disorder known as NBIA (Neurodegeneration with Brain Iron Accumulation).",
//         },
//       },
//       mutation: "20–3889432–T>G, ENST00000610179.7, c.8dup, p.Leu5Alafs*66, rs529267374",
//       type: "Frameshift Truncation",
//       zygosity: "Heterozygous",
//       diseaseName: "Neurodegeneration with Brain Iron Accumulation",
//       inheritance: "Autosomal Recessive",
//       classification: "Pathogenic",
//     },
//   ],
// };

export const dummyDiseaseData = {
  category: ["Heriditary Cancers", "Heart Diseases", "Other Disease", "Unaffected Carrier"],
  diseases: [
    {
      diseaseName: "Brugada Syndrome",
      speciality: "Cardiology",
      intro: "Brugada Syndrome is a genetic disorder that affects the heart’s electrical system, leading to irregular heart rhythms (arrhythmias) and an increased risk of sudden cardiac death.",
      symptoms: {
        desc: "Brugada syndrome often does not cause noticeable symptoms, and many people may be unaware they have it. When symptoms occur, they may include:",
        points: ["Fainting or blackouts (syncope)", "Dizziness or lightheadedness", "Heart palpitations", "Extremely fast and chaotic heartbeat", "Seizures", "Gasping or labored breathing, especially at night", "Unexplained nighttime urination", "Sudden cardiac arrest or sudden death"],
      },
      recommendations: {
        desc: "Precautions are recommended for carriers of a Brugada-associated gene mutation:",
        points: [
          "Consult a cardiologist experienced in inherited arrhythmias.",
          "Avoid medications that may trigger arrhythmias.",
          "Manage fever aggressively.",
          "Avoid recreational drugs and excessive alcohol.",
          "Avoid strenuous exercise as advised by your cardiologist.",
          "Stay well-hydrated.",
          "Genetic testing is recommended for first-degree relatives.",
        ],
      },
    },
    {
      diseaseName: "Familial Isolated Dilated Cardiomyopathy",
      speciality: "Cardiology",
      intro: "A genetic condition where the heart’s main pumping chamber becomes enlarged and weakened, making it harder to pump blood efficiently.",
      symptoms: {
        desc: "Symptoms may vary widely and may be absent, including among family members with the same mutation.",
        points: ["Shortness of breath", "Fatigue", "Swelling in the legs, ankles, feet, or abdomen", "Irregular heartbeat (arrhythmias)", "Chest pain or discomfort", "Fainting episodes or dizziness", "Reduced ability to exercise", "Unintentional weight gain"],
      },
      recommendations: { desc: "Management and lifestyle changes for cardiomyopathy:", points: ["Regular follow-up with a cardiologist.", "Avoid high-salt diet.", "Take prescribed medications.", "Limit alcohol and avoid smoking."] },
    },
    {
      diseaseName: "Neurodegeneration with Brain Iron Accumulation",
      speciality: "Neurology",
      intro: "NBIA is a rare inherited disorder caused by mutations in the PANK2 gene, leading to abnormal accumulation of iron in certain areas of the brain.",
      symptoms: { desc: "Symptoms vary but may include movement disorders and cognitive decline. Carriers are typically unaffected.", points: ["Difficulty with movement coordination", "Involuntary muscle contractions (dystonia)", "Progressive difficulty walking", "Tremors", "Speech and swallowing difficulties", "Cognitive or behavioral changes"] },
      recommendations: {
        desc: "For carriers of PANK2 variants, genetic counselling and family testing are recommended:",
        points: ["Consult a neurologist familiar with NBIA.", "Consider genetic counselling for family planning.", "Screen family members who may also be carriers.", "Maintain awareness of early neurological symptoms.", "No specific medical treatment required for carriers."],
      },
    },
  ],
  genes: [
    { geneName: "SCN10A", intro: "The SCN10A gene provides instructions for sodium channels that transport sodium ions into cells.", mid: "Mutations can lead to structural" },
    { geneName: "TTN", intro: "The TTN gene provides instructions for producing titin, a protein critical for heart muscle elasticity and function.", mid: "Mutations can lead to structural weakness in the heart muscle, resulting in dilated cardiomyopathy." },
    { geneName: "PANK2", intro: "The PANK2 gene provides instructions for an enzyme involved in coenzyme A biosynthesis, essential for energy metabolism.", mid: "Mutations in PANK2 disrupt this pathway, leading to toxic buildup of iron in the brain." },
  ],
  drugs: [
    {
      drugName: "Antidepressants",
      medicalSpeciality: "Psychiatry",
      function: "Used to treat depression, a mood disorder that causes sadness, hopelessness, and loss of interest.",
      medicalCondition: "Sadness, hopelessness, loss of interest in activities.",
      similarDrug: "SSRIs (Fluoxetine, Sertraline, Citalopram)",
      alternativeDrug: "Depends on individual needs; consult physician.",
    },
    { drugName: "Clopidogrel", medicalSpeciality: "Cardiology", function: "Antiplatelet used to prevent blood clots.", medicalCondition: "Acute coronary syndrome, Stroke, Peripheral artery disease.", similarDrug: "Aspirin, Ticlopidine, Cilostazol", alternativeDrug: "Prasugrel, Ticagrelor" },
  ],
  mutations: {
    type: ["Missense", "Frameshift Truncation", "Nonsense", "Insertion", "Deletion", "Splice-site"],
    zygosity: ["Heterozygous", "Homozygous", "Hemizygous"],
    inheritance: ["Autosomal Dominant", "Autosomal Recessive", "X-Linked Dominant", "X-Linked Recessive", "Y-Linked Inheritance", "Mitochondrial Inheritance"],
    classification: ["Pathogenic", "Likely Pathogenic"],
  },
};
