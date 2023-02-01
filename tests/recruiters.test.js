const axios = require('axios')
const mongoose = require('mongoose')
require('dotenv').config()

const Recruiter = require('../models/recruiterModel')
const User = require('../models/userModel')


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

// db tests

describe('Recruiter Model Test', () => {

  test('Add a recruiter to the database', async () => {

    const user = new User({
      email :     'test-user@ironhack.com',
      password:   '1234xyz',
      user_type:  'recruiter'
    });

    const savedUser = await user.save();
    const foundUser = await User.findOne({ email: 'test-user@ironhack.com' });
    expect(savedUser._id).toEqual(foundUser._id);

    const obj = new Recruiter({
      user_id: foundUser._id,
      first_name: "Raff",
      last_name: "Harkness",
      company_name: "Jaxnation",
      company_description: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
      recruiter_type: "head-hunter"
    });

    const savedObj = await obj.save();
    const foundObj = await Recruiter.findOne({ last_name: "Harkness" })
    expect(savedObj._id).toEqual(foundObj._id);

  });

  test('Get a recruiter in the database', async () => {
    const foundObj = await Recruiter.findOne({ last_name: "Harkness" })
    expect(foundObj.last_name).toEqual('Harkness');
  });

  test('Update a recruiter in the database', async () => {
    const foundObj = await Recruiter.findOne({ last_name: "Harkness" })
    foundObj.recruiter_type = 'in-house'
    const savedObj = await foundObj.save();
    expect(savedObj.recruiter_type).toEqual('in-house');
  });

  test('Delete a recruiters from the database', async () => {
    const deletedObj = await Recruiter.deleteOne({ last_name: "Harkness" });
    const deleteUser = await User.deleteOne({ email: 'test-user@ironhack.com' });
    expect(deletedObj._id).toEqual(undefined);
  });
});
