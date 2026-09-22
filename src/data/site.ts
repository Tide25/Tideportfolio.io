// Edit this file to change contact details and links across the whole site.
export const site = {
  name: "Tide Adesanya",
  fullName: "Adesanya Ayomitide Emmanuel",
  title: "Platform support engineer and full-stack developer",
  location: "Lagos, Nigeria",
  // City-level coordinates, shown in the footer.
  coordinates: "6.5244° N, 3.3792° E",
  email: "tideadesanya@yahoo.com",
  github: "https://github.com/Tide25",
  twitter: "https://twitter.com/Sure_thing25",
  // Add your LinkedIn URL here and it will appear in the contact section.
  linkedin: "",
  // Drop your updated CV into /public with this exact name.
  cv: "/Tide-Adesanya-CV.pdf",
};

/** Prefix a file in /public with the base path (needed on GitHub Pages). */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
