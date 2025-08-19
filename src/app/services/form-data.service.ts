import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  // Default modules list to use for all options
  private defaultModules: string[] = Array.from({ length: 10 }, (_, i) => `Module ${i + 1}`);

  // Available secteurs
  private secteurs = ['Tronc-Commun', 'Informatique', 'Télécommunications', 'EM', 'GC'];

  // Mapping of secteurs to their options
  private secteurOptionsMap: { [secteur: string]: string[] } = {
    'Tronc-Commun': ['1A', '2A', '2P', '3A', '3B'],
    'Informatique': ['Parcours IA', 'Option DS', 'Option ERP-BI', 'Option IFINI', 'Option SAE', 'Option SE', 'Option Twin'],
    'Télécommunications': ['Option ARCTIC', 'Option IOSYS', 'Option DATA', 'Option GAMIX', 'Option SIM', 'Option SLEAM', 'Option NIDS'],
    // From image: EM and GC sectors and their options
    'EM': ['1EM', '2EM','3EM', '4 OGI / 4 MécaT', '5 OGI / 5 MécaT'],
    'GC': ['1GC', '2GC', '3GC', '4GC', '5GC']
  };

  // Mapping of options to their modules (defaulting to Module 1..10 as requested)
  private optionModulesMap: { [option: string]: string[] } = {
    '1A': this.defaultModules,
    '2A': this.defaultModules,
    '2P': this.defaultModules,
    '3A': this.defaultModules,
    '3B': this.defaultModules,

    'Parcours IA': this.defaultModules,
    'Option DS': this.defaultModules,
    'Option ERP-BI': this.defaultModules,
    'Option IFINI': this.defaultModules,
    'Option SAE': this.defaultModules,
    'Option SE': this.defaultModules,
    'Option Twin': this.defaultModules,

    'Option ARCTIC': this.defaultModules,
    'Option IOSYS': this.defaultModules,
    'Option DATA': this.defaultModules,
    'Option GAMIX': this.defaultModules,
    'Option SIM': this.defaultModules,
    'Option SLEAM': this.defaultModules,
    'Option NIDS': this.defaultModules,

    // EM / GC
    '1EM': this.defaultModules,
    '2EM': this.defaultModules,
    '3EM': this.defaultModules,
    '4 OGI / 4 MécaT': this.defaultModules,
    '5 OGI / 5 MécaT': this.defaultModules,

    '1GC': this.defaultModules,
    '2GC': this.defaultModules,
    '3GC': this.defaultModules,
    '4GC': this.defaultModules,
    '5GC': this.defaultModules
  };


  // Mapping of options to their classes
  private optionClasseMap: { [option: string]: string[] } = {
    // Tronc-Commun classes
    '1A': ['1A1', '1A2', '1A3', '1A4', '1A5'],
    '2A': ['2A1', '2A2', '2A3', '2A4'],
    '2P': ['2P1', '2P2'],
    '3A': ['3A1', '3A2', '3A3'],
    '3B': ['3B1', '3B2'],

    // Informatique classes
    'Parcours IA': ['IA1', 'IA2'],
    'Option DS': ['DS1', 'DS2'],
    'Option ERP-BI': ['ERP-BI1', 'ERP-BI2'],
    'Option IFINI': ['IFINI1'],
    'Option SAE': ['SAE1'],
    'Option SE': ['SE1'],
    'Option Twin': ['Twin1', 'Twin2'],

    // Télécommunications classes
    'Option ARCTIC': ['ARCTIC1'],
    'Option IOSYS': ['IOSYS1'],
    'Option DATA': ['DATA1'],
    'Option GAMIX': ['GAMIX1'],
    'Option SIM': ['SIM1'],
    'Option SLEAM': ['SLEAM1'],
    'Option NIDS': ['NIDS1'],

    // EM classes (basic placeholders)
    '1EM': ['1EM1', '1EM2'],
    '2EM': ['2EM1', '2EM2'],
    '3EM': ['3EM1', '3EM2'],
    '4 OGI / 4 MécaT': ['4OGI1', '4MécaT1'],
    '5 OGI / 5 MécaT': ['5OGI1', '5MécaT1'],

    // GC classes (basic placeholders)
    '1GC': ['1GC1', '1GC2'],
    '2GC': ['2GC1', '2GC2'],
    '3GC': ['3GC1'],
    '4GC': ['4GC1'],
    '5GC': ['5GC1']
  };

  // Available semestres
  private semestres = [
    'Semestre 1',
    'Semestre 2'
  ];

  // Available justifications for rectification
  private justifications = [
    'Erreur de saisie',
    'Note incorrecte',
    'Erreur de calcul',
    'Problème technique lors de l\'examen',
    'Erreur d\'évaluation',
    'Note manquante',
    'Erreur de transcription',
    'Problème de correction',
    'Autre'
  ];

  constructor() { }

  /**
   * Get all available secteurs
   */
  getSecteurs(): string[] {
    return [...this.secteurs];
  }

  /**
   * Get options for a specific secteur
   */
  getOptionsBySecteur(secteur: string): string[] {
    return this.secteurOptionsMap[secteur] || [];
  }

  /**
   * Get classes for a specific option
   */
  getClassesByOption(option: string): string[] {
    return this.optionClasseMap[option] || [];
  }

  /**
   * Get all available semestres
   */
  getSemestres(): string[] {
    return [...this.semestres];
  }

  /**
   * Get all available justifications
   */
  getJustifications(): string[] {
    return [...this.justifications];
  }

  /**
   * Get all options (flattened from all secteurs)
   */
  getAllOptions(): string[] {
    const allOptions: string[] = [];
    Object.values(this.secteurOptionsMap).forEach(options => {
      allOptions.push(...options);
    });
    return allOptions;
  }

  /**
   * Get all classes (flattened from all options)
   */
  getAllClasses(): string[] {
    const allClasses: string[] = [];
    Object.values(this.optionClasseMap).forEach(classes => {
      allClasses.push(...classes);
    });
    return allClasses;
  }

  /**
   * Get secteur by option (reverse lookup)
   */
  getSecteurByOption(option: string): string | null {
    for (const [secteur, options] of Object.entries(this.secteurOptionsMap)) {
      if (options.includes(option)) {
        return secteur;
      }
    }
    return null;
  }

  /**
   * Get modules by option
   */
  getModulesByOption(option: string): string[] {
    return this.optionModulesMap[option] || [];
  }

  /**
   * Get option by classe (reverse lookup)
   */
  getOptionByClasse(classe: string): string | null {
    for (const [option, classes] of Object.entries(this.optionClasseMap)) {
      if (classes.includes(classe)) {
        return option;
      }
    }
    return null;
  }

  /**
   * Validate if a combination of secteur, option, and classe is valid
   */
  isValidCombination(secteur: string, option: string, classe: string): boolean {
    const validOptions = this.getOptionsBySecteur(secteur);
    if (!validOptions.includes(option)) {
      return false;
    }

    const validClasses = this.getClassesByOption(option);
    return validClasses.includes(classe);
  }

  /**
   * Get form data structure for initialization
   */
  getFormDataStructure() {
    return {
      secteurs: this.getSecteurs(),
      options: [],
      classes: [],
      semestres: this.getSemestres()
    };
  }
}
