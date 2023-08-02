import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "t7cZfWIp-q",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Be yourself!",
    bookmarks: [],
    following: [
      {
      _id: "79Gksh9otl",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
    },
    {
      _id: "1T6Be1QpLm",
      firstName: "Jane",
      lastName: "Doe",
      username: "janedoe",
      password: "janedoe123",
    },
  ],
    avatarUrl:
      "/images/avatar4.webp",
    website: "https://husaini-bohra.netlify.app/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "79Gksh9otl",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    followers:[
      {
        _id: "t7cZfWIp-q",
        firstName: "Adarsh",
        lastName: "Balika",
      }
    ],
    avatarUrl:
      "/images/avatar6.webp",
    website: "https://google.com/",
    createdAt: "2022-01-02T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "1T6Be1QpLm",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    password: "janedoe123",
    bio: "Whats in bio?",
    bookmarks: [],
    followers:[
      {
        _id: "t7cZfWIp-q",
        firstName: "Adarsh",
        lastName: "Balika",
      }
    ],
    avatarUrl:
      "/images/avatar3.webp",
    website: "https://husaini-bohra.netlify.app/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "LCrc9f0Zl0",
    firstName: "Carl",
    lastName: "Smith",
    username: "carlsmith",
    password: "carlsmith123",
    bio: "Whats in bio?",
    avatarUrl:"/images/avatar1.webp",
    website: "https://abbbc.netlify.app/",
    createdAt: "2022-01-03T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "o5gzWjEeX_",
    firstName: "Kate",
    lastName: "Campher",
    username: "katecampher",
    password: "katecampher123",
    bio: "Aspiring Frontend Engineer",
    bookmarks: [],
    avatarUrl:"/images/avatar2.webp",
      website: "https://google.com",
    createdAt: "2022-01-04T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "M1NR81Bzlz",
    firstName: "Alex",
    lastName: "Maxwell",
    username: "alexmaxwell",
    password: "alexmaxwell123",
    bio: "What's up?",
    bookmarks: [],
    avatarUrl:
      "/images/avatar8.webp",
    website: "",
    createdAt: "2022-01-05T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: "qq8zWjEeXd",
    firstName: "Sophia",
    lastName: "Jones",
    username: "sophiajones",
    password: "sophiajones123",
    bio: "Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "/images/avatar5.webp",
    website: "",
    createdAt: "2022-01-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];
