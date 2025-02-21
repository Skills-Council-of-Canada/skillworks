
interface HeroSectionProps {
  imagePath: string;
}

export const HeroSection = ({ imagePath }: HeroSectionProps) => {
  return (
    <section className="pt-24 pb-16 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Kickstart Your Career with Hands-On Experience
            </h1>
            <p className="text-lg text-white">
              Work on real projects with top companies. Build your resume. Land your dream job.
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={imagePath}
              alt="Professional looking towards success with planning ideas"
              className="rounded-lg shadow-xl object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
