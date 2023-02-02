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
  // console.log('afterAll')
  // console.log(mongoose.connection.readyState);
});

// http requests tests

describe('API Calls test', () => {
  test('Makes a successful GET request on /recruiters', async () => {
    const response = await axios.get(`${process.env.API_URL}/recruiters`);
    // console.log(response.data, "response.data get recruiters" )
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Makes a successful POST request on /recruiters', async () => {
    const user = await new User({
      email :     'eudora-tuff@ironhack.com',
      password:   '1234xyz',
      user_type:  'recruiter'
    }).save();

    const recruit = await new Recruiter({
      user_account: user._id,
      first_name: "Eudora",
      last_name: "Tuff",
      company_name: "Jaxnation",
      company_description: "Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
      recruiter_type: "head-hunter"
    });

    const response = await axios.post(
      `${process.env.API_URL}/recruiters`,
      recruit
    );
    // console.log(response.data, "response.data post ")
    expect(response.status).toEqual(201);
  });

  test('Makes a successful GET request on /recruiters/:id', async () => {
    const recruiters = await axios.get(`${process.env.API_URL}/recruiters/`);
    const findByName = recruiters.data.filter( e => e.last_name === 'Tuff' )
    expect(recruiters.status).toEqual(200);

    // console.log(recruiters.data, "recruiters.data")
    // console.log(findByName, "findByName")

    const recruit = await axios.get(`${process.env.API_URL}/recruiters/${findByName[0]._id}`);

    // console.log(recruit.data, "recruit.data")

    expect(recruit.status).toEqual(200);
    expect(recruit.data.last_name).toEqual('Tuff');
  });

  test('Makes a successful PUT request on /recruiters/:id', async () => {

    const response1 = await axios.get(`${process.env.API_URL}/recruiters/`);
    const findByEmail = response1.data.filter( e => e.last_name === 'Tuff' )
    expect(response1.status).toEqual(200);
    expect(findByEmail.length).toEqual(1);
    // console.log(findByEmail[0], "findByEmail[0]")

    findByEmail[0].recruiter_type = 'in-house'
    // console.log(findByEmail[0], "findByEmail[0] updated")

    const response2 = await axios.put(`${process.env.API_URL}/recruiters/${findByEmail[0]._id}`, findByEmail[0]);
    expect(response2.status).toEqual(200);
  });

  test('Makes a successful DELETE request on /recruiters/:id', async () => {  
    const response1 = await axios.get(`${process.env.API_URL}/recruiters/`);
    expect(response1.status).toEqual(200);
    // const findByEmail = response1.data.filter( e => e.user_account.email === 'test-post20@ironhack.com' )
    const findByName = response1.data.filter( e => e.last_name === 'Tuff' )

    // console.log(response1.data, "response1.data")
    // console.log(findByName, "findByName")

    const response2 = await axios.delete(`${process.env.API_URL}/recruiters/${findByName[0]._id}`);
    expect(response2.status).toEqual(200);
    expect(response2.data).toEqual('Recruiter deleted sucessfully');

    // cleanup user
    const user = await axios.get(`${process.env.API_URL}/users/`);
    const findUserByEmail = user.data.filter( e => e.email === 'eudora-tuff@ironhack.com' )
    expect(user.status).toEqual(200);

    // console.log(user.data, "user.data")
    // console.log(findUserByEmail, "findUserByEmail")

    const deleteduser = await axios.delete(`${process.env.API_URL}/users/${findUserByEmail[0]._id}`);
    expect(deleteduser.status).toEqual(200);
    expect(deleteduser.data).toEqual('User deleted sucessfully');
  });

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
      user_account: foundUser._id,
      first_name: "Doroteya",
      last_name: "Harkness",
      company_name: "Dabfeed",
      company_description: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      recruiter_type:  'head-hunter'
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
    const deletedUser = await User.deleteOne({ email: 'test-user@ironhack.com' });
    expect(deletedObj._id).toEqual(undefined);
    expect(deletedUser._id).toEqual(undefined);
  });
});
