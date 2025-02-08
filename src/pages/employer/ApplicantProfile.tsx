
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ApplicantProfile as ApplicantProfileType } from "@/types/application";

const ApplicantProfile = () => {
  const { applicantId } = useParams();

  // Mock data - replace with actual data fetching
  const profile: ApplicantProfileType = {
    id: applicantId || "",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    tradeSkills: ["Electrical", "HVAC"],
    skillLevel: "Intermediate",
    certifications: ["Certified Electrician", "HVAC Technician"],
    experience: 5,
    portfolio: [
      {
        title: "Commercial Wiring Project",
        description: "Complete rewiring of a 3-story office building",
        imageUrl: "/placeholder.svg",
      },
    ],
    ratings: [
      {
        rating: 4.5,
        comment: "Excellent work ethic and attention to detail",
        reviewerName: "Jane Smith",
        date: new Date("2024-01-15"),
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
          <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Skills & Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Trade Skills</h3>
              <div className="flex gap-2 mt-2">
                {profile.tradeSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Experience</h3>
              <p className="text-muted-foreground">{profile.experience} years</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2">
                  <Badge variant="outline">{cert}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {profile.portfolio.map((item) => (
                <div key={item.title} className="space-y-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {profile.ratings && profile.ratings.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Ratings & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.ratings.map((rating, index) => (
                  <div key={index} className="border-b last:border-0 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {rating.reviewerName}
                      </span>
                    </div>
                    <p className="mt-2">{rating.comment}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rating.date.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicantProfile;
