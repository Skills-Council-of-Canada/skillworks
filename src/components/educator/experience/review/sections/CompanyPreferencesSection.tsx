
import { ExperienceFormValues } from "@/types/educator";
import ReviewSection from "./ReviewSection";

interface CompanyPreferencesSectionProps {
  values: ExperienceFormValues;
  onEdit: (step: string) => void;
}

const CompanyPreferencesSection = ({ values, onEdit }: CompanyPreferencesSectionProps) => {
  return (
    <ReviewSection
      title="Company Preferences"
      onEdit={() => onEdit("employer")}
    >
      <div className="space-y-2">
        {values.preferred_industries?.length > 0 && (
          <div>
            <strong>Preferred Industries:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {values.preferred_industries.map((industry, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
        {values.company_types?.length > 0 && (
          <div className="mt-2">
            <strong>Company Types:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {values.company_types.map((type, index) => (
                <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        {values.compensation_type && (
          <p><strong>Compensation Type:</strong> {values.compensation_type}</p>
        )}
        {values.screening_questions?.length > 0 && (
          <div className="mt-2">
            <strong>Screening Questions:</strong>
            <ul className="list-disc list-inside mt-1">
              {values.screening_questions.map((q, index) => (
                <li key={index}>
                  {q.question} {q.required && "(Required)"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ReviewSection>
  );
};

export default CompanyPreferencesSection;
