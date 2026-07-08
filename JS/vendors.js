export const vendors = [
  {
    id: "alice-store",

    // basic identity
    name: "Alice's Store",
    logo: "../Assets/alice-logo.png",
    banner: "../Assets/alice-banner.jpg",

    // profile info
    description: "Skincare & beverages for students",
    longDescription:
      "Alice's Store focuses on affordable skincare and student-friendly drinks. We aim to provide quick, reliable products for campus life.",

    // metadata
    rating: 4.8,
    reviewCount: 120,

    campuses: ["Kampus 1", "Kampus 2"],

    // optional future-proofing
    socials: {
      instagram: "@alicestore",
      tiktok: "@alice.store"
    }
  },
  {
    id: "bob-shop",

    name: "Bob's Shop",
    logo: "../Assets/bob-logo.png",
    banner: "../Assets/bob-banner.jpg",

    description: "Authentic Indian cuisine and desserts",
    longDescription:
    "Bob's Shop specializes in authentic Indian meals and desserts. We bring the rich flavors of India to your table, ensuring a delightful culinary experience.",

    rating: 4.5,
    reviewCount: 85,

    campuses: ["Kampus 1"],

    socials: {
        instagram: "@bobshop",
        tiktok: "@bob.shop"
    }
  }
];

console.log(vendors);