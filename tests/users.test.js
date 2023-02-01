const axios = require('axios')
const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/userModel')

const addTodo = (todos, newTodo) => [...todos, newTodo];

// setup

beforeAll(async () => {
  const dbUrl = process.env.MONGO_URI
  await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('afterAll')
  console.log(mongoose.connection.readyState);
});

// basics examples

test('adds a new todo to the list', () => {
  const todos = ['Buy milk', 'Do laundry'];
  const newTodo = 'Take a walk';
  const result = addTodo(todos, newTodo);
  expect(result).toEqual(['Buy milk', 'Do laundry', 'Take a walk']);
});

// routes tests

describe('API Calls test', () => {
  it('Makes a successful GET request on /users', async () => {
    const response = await axios.get(`${process.env.API_URL}/users`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('Makes a successful POST request on /users', async () => {
    const user = new User({
      email :     'test-post-users@ironhack.com',
      password:   '1234xyz',
      user_type:  'seeker'
    });
    const response = await axios.post(
      `${process.env.API_URL}/users`,
      user
    );
    expect(response.status).toEqual(201);
    expect(response.data.email).toEqual('test-post-users@ironhack.com');
  });

  it('Makes a successful GET request on /users/:id', async () => {
    const response1 = await axios.get(`${process.env.API_URL}/users/`);
    const findUserByEmail = response1.data.filter( e => e.email === 'test-post-users@ironhack.com' )
    expect(response1.status).toEqual(200);

    const response2 = await axios.get(`${process.env.API_URL}/users/${findUserByEmail[0]._id}`);
    const findUserById = response2.data
    expect(response2.status).toEqual(200);
    expect(response2.data.email).toEqual('test-post-users@ironhack.com');
  });

  it('Makes a successful PUT request on /users/:id', async () => {

    const response1 = await axios.get(`${process.env.API_URL}/users/`);
    const findUserByEmail = response1.data.filter( e => e.email === 'test-post-users@ironhack.com' )
    expect(response1.status).toEqual(200);
    expect(findUserByEmail.length).toEqual(1);
    // console.log(findUserByEmail[0], "findUserByEmail[0]")

    findUserByEmail[0].user_type = 'recruiter'
    // console.log(findUserByEmail[0], "findUserByEmail[0] updated")

    const response2 = await axios.put(`${process.env.API_URL}/users/${findUserByEmail[0]._id}`, findUserByEmail[0]);
    expect(response2.status).toEqual(200);
  });

  it('Makes a successful DELETE request on /users/:id', async () => {  
    const response1 = await axios.get(`${process.env.API_URL}/users/`);
    const findUserByEmail = response1.data.filter( e => e.email === 'test-post-users@ironhack.com' )
    expect(response1.status).toEqual(200);

    const response2 = await axios.delete(`${process.env.API_URL}/users/${findUserByEmail[0]._id}`);
    expect(response2.status).toEqual(200);
    expect(response2.data).toEqual('User deleted sucessfully');
  });

});

// db tests

describe('User Model Test', () => {

  it('Add a user to the database', async () => {
    const user = new User({
      email :     'test-user@ironhack.com',
      password:   '1234xyz',
      user_type:  'seeker'
    });

    const savedUser = await user.save();
    const foundUser = await User.findOne({ email: 'test-user@ironhack.com' });
    expect(savedUser._id).toEqual(foundUser._id);
  });

  it('Update user in the database', async () => {
    const foundUser = await User.findOne({ email: 'test-user@ironhack.com' });
    foundUser.user_type = 'recruiter'
    const savedUser = await foundUser.save();

    expect(savedUser.user_type).toEqual('recruiter');
  });

  test('Delete a user from the database', async () => {
    const deletedUser = await User.deleteOne({ email: 'test-user@ironhack.com' });

    expect(deletedUser._id).toEqual(undefined);
  });
});
