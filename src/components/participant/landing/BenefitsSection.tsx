
interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Supporting Benefits
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 space-y-4 text-center bg-[#F1F1F1] rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {benefit.icon}
              <h3 className="text-xl font-semibold text-secondary">
                {benefit.title}
              </h3>
              <p className="text-secondary/60">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
