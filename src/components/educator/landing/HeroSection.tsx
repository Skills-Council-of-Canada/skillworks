
interface HeroSectionProps {
  imagePath: string;
}

export const HeroSection = ({ imagePath }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-[#1A1F2C]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Transform Learning with Real-World Projects & Employer Partnership
            </h1>
            <p className="text-lg text-white/90">
              Empower your students with hands-on, career-aligned experiences—directly integrated into your curriculum.
            </p>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
            <img
              src={imagePath}
              alt="Professional pointing to success concept with light bulbs and planning diagram"
              className="rounded-lg shadow-xl w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
