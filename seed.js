// const mongoose = require("mongoose");
// const faker = require("faker");
// const User = require("./models/users");


//   const generateRandomLocation = () => {
//     return {
//       type: "Point",
//       coordinates: [
//         faker.address.longitude(),
//         faker.address.latitude(),
//       ],
//     };
//   };

//   const seedUsers = async () => {
//     try {
//       for (let i = 0; i < 90; i++) {
//         const newUser = new User({
//           email: faker.internet.email(),
//           phoneNo: faker.phone.phoneNumber(),
//           otp: faker.random.alphaNumeric(6),
//           location: generateRandomLocation(),
//           firstname: faker.name.firstName(),
//           lastname: faker.name.lastName(),
//           birthdate: faker.date.past(30, new Date()).toISOString().split("T")[0],
//           document: {
//             documentType: "ID",
//             frontSide: faker.image.imageUrl(),
//             backSide: faker.image.imageUrl(),
//           },
//           address: {
//             country: faker.address.country(),
//             state: faker.address.state(),
//             city: faker.address.city(),
//           },
//           gender: faker.random.arrayElement(["Man", "Woman", "Non-Binary"]),
//           showGender: faker.random.boolean(),
//           perfectMatch: faker.random.arrayElement(["Man", "Woman", "Non-Binary"]),
//           showPerfectMatch: faker.random.boolean(),
//           ageRange: `${faker.random.number({ min: 18, max: 50 })}-${faker.random.number({ min: 18, max: 50 })}`,
//           photos: [faker.image.avatar(), faker.image.avatar()],
//           bio: faker.lorem.sentence(),
//           education: faker.company.companyName(),
//           university: faker.company.companyName(),
//           pushNotifications: faker.random.boolean(),
//           interests: faker.random.arrayElements(["Traveling", "Hiking", "Cooking", "Reading", "Music", "Fitness", "Art", "Gaming", "Volunteering", "Photogtraphy", "Pets", "Film", "Tech", "Sports", "Crafting", "Yoga", "Fashion", "Dancing"], faker.random.number({ min: 1, max: 5 })),
//           fbUrl: faker.internet.url(),
//           instaUrl: faker.internet.url(),
//           snapchatUrl: faker.internet.url(),
//           spotifyUrl: faker.internet.url(),
//           appleMusicUrl: faker.internet.url(),
//           tiktokUrl: faker.internet.url(),
//           AccountStatus: faker.random.arrayElement(["Active", "Inactive"]),
//           deleteAccountFeedback: faker.lorem.sentence(),
//           screenNo: faker.random.alphaNumeric(5),
//         });

//         await newUser.save();
//       }
//       console.log("90 Users Created!");
//       mongoose.connection.close();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   seedUsers();

const faker = require("faker");
const mongoose = require("mongoose");
const { Likes } = require("./models/likes");
const { UserAnswer } = require("./models/userAnswer");
const ObjectId = mongoose.Types.ObjectId;



mongoose.connect("mongodb://localhost:27017/splashApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Given user IDs
const user_ids = [
  "66ab3321ded8ebcee6a4fc23",
  "66d7f707de07af5ee52f7e87",
  "66d7f707de07af5ee52f7e8b",
  "66d7f707de07af5ee52f7e8d",
  "66d7f707de07af5ee52f7e8f",
  "66d7f707de07af5ee52f7e91",
  "66d7f707de07af5ee52f7e93",
  "66d7f707de07af5ee52f7e95",
  "66d7f707de07af5ee52f7e97",
  "66d7f707de07af5ee52f7e99",
];

// Sample questions that match your data structure
const questions = [
  {
    _id: new ObjectId("66a73a2a164a4c3b9cdf1af9"),
    question: "What Best Describes your Day-to-Day?",
    options: [
      "Spontaneous / Go with the flow",
      "Strict Planner / Routine Follower",
    ],
  },
  {
    _id: new ObjectId("66d7f9257f9a29d5fb3f4293"),
    question: "Paycheck Mentality",
    options: [
      "Big Spender,Find me at the mall",
      "Going to need a bigger piggy bank",
    ],
  },
  {
    _id: new ObjectId("66d7f94f7f9a29d5fb3f4294"),
    question: "What are your Daily Rhythms",
    options: ["Early Bird", "Night Owl"],
  },
  {
    _id: new ObjectId("66d7f99a7f9a29d5fb3f4295"),
    question: "What's Your go-to on a Saturday Night?",
    options: [
      "Going out to a bar or club",
      "Staying in/ Reading a book / Watching TV",
    ],
  },
  {
    _id: new ObjectId("66d7fa2c7f9a29d5fb3f4296"),
    question: "Where do you see Yourself in Five Years?",
    options: [
      "Corporate Job, Growing Myself Professionally",
      "Creating the next big thing",
      "Figuring it out",
      "Super Senior!",
    ],
  },
  {
    _id: new ObjectId("66d7fa7c7f9a29d5fb3f4297"),
    question: "Do you Want to get Married & Have Children?",
    options: [
      "Yes to both",
      "No to both",
      "Married; without kids",
      "Single; with kids",
    ],
  },
  {
    _id: new ObjectId("66d7faae7f9a29d5fb3f4298"),
    question: "Do you Like to Travel?",
    options: ["Yes!", "Not for me", "I want to!"],
  },
  {
    _id: new ObjectId("66d7fb317f9a29d5fb3f4299"),
    question: "What Best Describes Your Sense of Humor?",
    options: [
      "Light-Hearted",
      "Pushing the PC limits",
      "Let's see how dark we can get",
      "Haven't laughed in a while",
    ],
  },
  {
    _id: new ObjectId("66d7fbf87f9a29d5fb3f429a"),
    question: "How Would Your Friends Describe You?",
    options: [
      "Chill/ Laid Back/ Activewear",
      "Vintage/ Retro",
      "Urban / Streetwear",
      "Goth",
      "Indie / Bohemian",
      "Old Money  / Country Club",
      "Minimalist",
      "Grunge / Punk / Emo",
    ],
  },
];

// Generate sample user answers based on the questions
const user_answers = [];
user_ids.forEach((user_id) => {
  questions.forEach((question) => {
    const user_answer = {
      userId: new ObjectId(user_id),
      questionId: question._id,
      options: faker.random.arrayElement(question.options), // Selecting a random option as user's answer
    };
    user_answers.push(user_answer);
  });
});

// Generate sample likes with random statuses
const likes = [];
user_ids.forEach((user_id) => {
  user_ids.forEach((liked_user_id) => {
    if (user_id !== liked_user_id) {
      const like = {
        userId: new ObjectId(user_id),
        likedUserId: new ObjectId(liked_user_id),
        likeStatus: faker.random.boolean(),
        dislikeStatus: faker.random.boolean(),
        superLikeStatus: faker.random.boolean(),
        boostProfileStatus: faker.random.boolean(),
      };
      likes.push(like);
    }
  });
});

// Output the generated data (for testing purposes)
console.log("Questions:", questions);
console.log("User Answers:", user_answers);
console.log("Likes:", likes);

async function addingData() {
  await UserAnswer.insertMany(user_answers);
  await Likes.insertMany(likes);
}

addingData();

