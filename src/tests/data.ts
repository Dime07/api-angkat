import jwt from "jsonwebtoken";

export const mockUser = {
  id: 1,
  email: "mockUser@email.com",
  password: "mockPassword",
  name: "mockName",
  createdAt: new Date("11-12-2024"),
  updatedAt: new Date("11-12-2024"),
};

export const mockToken = jwt.sign(
  {
    email: mockUser.email,
  },
  `${process.env.JWT_SECRET}`
);

export const mockWorkout = [
  {
    id: 1,
    createdAt: new Date("11-12-2024"),
    updatedAt: new Date("11-12-2024"),
    name: "mockData",
    duration: 123,
    userId: 1,
    exercises: [
      {
        id: 1,
        name: "mockExercise",
        reps: 10,
        volume: 100,
        createdAt: new Date("11-12-2024"),
        updatedAt: new Date("11-12-2024"),
        workoutId: 1,
      },
    ],
  },
];

export const oneMockWorkout = {
  id: 1,
  createdAt: new Date("11-12-2024"),
  updatedAt: new Date("11-12-2024"),
  name: "mockData",
  duration: 123,
  userId: 1,
  exercises: [
    {
      id: 1,
      name: "mockExercise",
      reps: 10,
      volume: 100,
      createdAt: new Date("11-12-2024"),
      updatedAt: new Date("11-12-2024"),
      workoutId: 1,
    },
  ],
};
