export interface HumanGraphAnalysis {
  centers: {
    head: boolean;
    ajna: boolean;
    throat: boolean;
    g: boolean;
    heart: boolean;
    solar: boolean;
    sacral: boolean;
    root: boolean;
    spleen: boolean;
  };
  channels: [
    {
      from: string;
      to: string;
      defined: boolean;
    },
    {
      from: string;
      to: string;
      defined: boolean;
    }
  ][];
  gates: {
    number: number;
    defined: boolean;
    position: string;
  }[];
}

export interface AnalysisResponse {
  success: boolean;
  data?: HumanGraphAnalysis;
  error?: string;
}
