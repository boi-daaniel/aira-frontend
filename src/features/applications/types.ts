export type SubmitPublicApplicationInput = {
  jobPositionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  coverLetter?: string;
};

export type PublicApplicationResult = {
  publicApplicationId: string;
  applicantId: string;
  processingStatus: "submitted" | "processed" | "duplicate" | "rejected";
};
