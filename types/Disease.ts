export interface HereditaryCancer {
  name: string;
  gene: string;
  specialty: string;
  description: string;
  symptoms: {
    intro: string;
    list: string[];
    outro?: string;
  };
  recommendations: {
    intro: string;
    list: string[];
    outro?: string;
  };
}

export interface HeartDisease {
  name: string;
  gene: string;
  specialty: string;
  description: string;
  symptoms: {
    intro: string;
    list: string[];
    outro?: string;
  };
  recommendations: {
    intro: string;
    list: string[];
    outro?: string;
  };
}

export interface OtherDisease {
  name: string;
  gene: string;
  specialty: string;
  description: string;
  symptoms: {
    intro: string;
    list: string[];
    outro?: string;
  };
  recommendations: {
    intro: string;
    list: string[];
    outro?: string;
  };
}

export interface UnaffectedCarrier {
  name: string;
  gene: string;
  specialty: string;
  description: string;
  symptoms: {
    intro: string;
    list: string[];
    outro?: string;
  };
  recommendations: {
    intro: string;
    list: string[];
    outro?: string;
  };
}

export type DrugItem = {
  name: string;
  medical_speciality: string;
};

export type MutationItem = {
  gene: string;
  mutation: string;
  type: string;
  zygosity: string;
  diseases: string;
  inheritance: string;
  classification: string;
  details: {
    paragraphs: string[];
    variantNote?: string;
  };
};

export type DrugTypeItem = {
  name: string;
  medical_speciality: string;
  gene: string;
  diplotype: string;
  phenotype: string;
  function: string;
  medical_conditions: string;
  similar_drugs: string;
  alternative_drugs: string;
};
