
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const SuccessStoriesSection = () => {
  const testimonials = [
    {
      quote: "We hired top talent directly from this platform!",
      author: "Sarah Johnson",
      role: "HR Director",
      type: "Employer"
    },
    {
      quote: "Students gained career-ready skills through hands-on projects.",
      author: "Prof. Michael Chen",
      role: "Education Lead",
      type: "Educator"
    },
    {
      quote: "I landed my first job after completing a project here!",
      author: "Alex Rivera",
      role: "Software Developer",
      type: "Participant"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">Real People, Real Impact</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <Quote className="w-12 h-12 text-primary/20 mb-6" />
                    <blockquote className="text-2xl font-medium mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <p className="text-primary">{testimonial.type}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="group">
            Read More Success Stories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
