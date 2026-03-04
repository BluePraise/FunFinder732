import { Heart, Users, Calendar, MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About FunFinder732</h1>

      <div className="prose prose-lg">
        <p className="text-lg text-muted-foreground mb-6">
          FunFinder732 helps families in Monmouth County, New Jersey discover local activities,
          events, and recreation opportunities. We believe every family deserves easy access
          to fun, affordable experiences in their community.
        </p>

        <div className="grid gap-6 md:grid-cols-2 my-8">
          <div className="flex gap-4 p-4 rounded-lg bg-muted">
            <Calendar className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Local Events</h3>
              <p className="text-sm text-muted-foreground">
                Browse upcoming activities at Monmouth County parks and recreation centers.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg bg-muted">
            <Users className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Family Focused</h3>
              <p className="text-sm text-muted-foreground">
                Activities for all ages, from toddler programs to fun for parents.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg bg-muted">
            <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">732 Area Code</h3>
              <p className="text-sm text-muted-foreground">
                Serving communities throughout Monmouth County and surrounding areas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg bg-muted">
            <Heart className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Built by locals, for locals. Know of an event? Submit it!
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="text-muted-foreground">
          We created FunFinder732 because finding local family activities shouldn't be hard.
          Our goal is to be the go-to resource for Monmouth County families looking to
          explore their community, stay active, and make memories together.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact</h2>
        <p className="text-muted-foreground">
          Have questions or suggestions? We'd love to hear from you!
          Reach out to us at <a href="mailto:hello@funfinder732.com" className="text-primary hover:underline">hello@funfinder732.com</a>
        </p>
      </div>
    </div>
  );
}
